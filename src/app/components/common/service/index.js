/**
 * Created by chunzj on 2015/10/2.
 */
(function () {

  angular
    .module('bb.common.service', ['bb.common.config', 'bb.common.constant'])
    .service('ajaxRequest', function ($rootScope, $http, $window, $q, $log, bbConfig, bbUtil) {

      var apiConfig = bbConfig.apiConfig[$rootScope.env || 'dev'];
      var noShowLoadingWhiteList = [bbConfig.apiPath.baseData, bbConfig.apiPath.verifyCode,
        bbConfig.apiPath.verifyUser];

      function _ajaxRequest(options, apiPath) {

        var _apiPath = bbConfig.apiPath[apiPath];
        if (!_apiPath) {
          throw new Error('找不到您要访问的api,请检查模块bb.common.config中的apiPath是否配置。');
        }

        if(noShowLoadingWhiteList.indexOf(_apiPath) === -1) {
          bbUtil.showLoading();
        }

        var defaultOptions = {
          url: getApiUrl(_apiPath),
          responseType: 'json',
          timeout: 2000
        };

        angular.extend(options, defaultOptions);

        var params = options.data || options.params;
        if (typeof params.auth !== 'undefined' && params.auth) {

          if (!$window.authCode) {
            $log.info('Not found auth code');
            return $q(function (resolve, reject) {
              reject({msg: '无效的请求'});
            });
          }
          options.headers['Authorization'] = $window.authCode;

          delete params.auth;
        }

        $log.info('http request options', JSON.stringify(options));

        return $http(options);
      }

      function ajaxPost(formData, apiPath) {
        return _ajaxRequest({
          method: 'POST',
          params: formData,
          data: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }, apiPath);
      }

      /**
       *
       * @param formData {Object} 除文件对象以外的其他表单数据，格式为json
       * @param fileKey {String}
       * @param fileObject 文件对象, @seeTo https://developer.mozilla.org/en-US/docs/Web/API/File
       * @param apiPath {String}
       * @returns {*}
       */
      function ajaxFileUpload(formData, fileKey, fileObject, apiPath) {

        if (!fileObject || !(fileObject instanceof File)) {
          throw new TypeError('无效的文件对象');
        }

        var options = {
          method: 'POST',
          headers: {
            'Content-Type': undefined
          }
        };

        if (typeof formData.auth !== 'undefined' && formData.auth) {

          if (!$window.authCode) {
            $log.info('Not found auth code');
            return $q(function (resolve, reject) {
              reject({msg: '无效的请求'});
            });
          }
          options.headers['Authorization'] = $window.authCode;

          delete formData.auth;
        }

        var _formData = new FormData();
        if (formData) {
          for (var key in formData) {
            _formData.append(key, formData[key]);
          }
        }
        _formData.append(fileKey, fileObject);

        options.data = _formData;

        return _ajaxRequest(options, apiPath);
      }

      function ajaxGet(queryData, apiPath) {
        return _ajaxRequest({
          method: 'GET',
          params: queryData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }, apiPath);
      }

      function responseInteceptor(processFn) {
        return function () {
          var args = arguments;
          return $q(function (resolve, reject) {
            processFn.apply(null, Array.prototype.slice.call(args)).then(function (result) {
              bbUtil.hideLoading();
              var realData = result.data;
              if (realData.code == 1) {
                resolve(realData.data);
              } else if (realData.code == 0) {
                reject({
                  code: realData.msgCode,
                  msg: realData.msg
                });
              } else {
                $log.info(realData);
                reject({
                  msg: '网络异常，请稍候重试！'
                });
              }
            }).catch(function (error) {
              $log.info(error);
              bbUtil.hideLoading();
              reject({
                msg: error && error.msg ? error.msg : '网络异常，请稍候重试！'
              });
            });
          });
        }
      }

      return {
        get: responseInteceptor(ajaxGet),
        post: responseInteceptor(ajaxPost),
        fileUpload: responseInteceptor(ajaxFileUpload)
      };

      function getApiUrl(apiPath) {
        return ['http://', apiConfig.hostname, ':', apiConfig.port, bbConfig.apiBase, apiPath].join('');
      }
    })
    .service('checker', function ($q, $window, $log, ajaxRequest, bbConstant) {
      return {
        isLogin: function () {
          return $q(function (resolve, reject) {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
              resolve(false);
            } else {
              if (userInfo.identity === bbConstant.userSource.guest) {
                $window.isGuest = true;
                resolve(true);
                return;
              }

              $window.isGuest = false;
              if (!$window.authCode) {
                localStorage.removeItem('userInfo');
                resolve(false);
                return;
              }

              ajaxRequest.get({
                userId: userInfo.userId,
                identity: userInfo.identity
              }, 'verifyUser').then(function (data) {

                $window.authCode = data.authCode;
                resolve(true);

              }).catch(function (err) {

                delete $window.authCode;
                localStorage.removeItem('userInfo');

                $log.info('Fail to verify user ' + JSON.stringify(err));
                resolve(false);
              });
            }
          });
        }
      };
    }).service('apiService', function ($window, $q, $log, ajaxRequest) {
      return {
        getBaseData: function () {
          return $q(function (resolve, reject) {

            if ($window.baseData) {
              resolve();
              return;
            }

            ajaxRequest.get({}, 'baseData').then(function (result) {
              $window.baseData = result;
              resolve();
            }).catch(function (error) {
              $log.info('Fail to get base data ' + JSON.stringify(error));
              reject();
            });
          });
        }
      };
    });
})();
