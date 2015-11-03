/**
 * Created by chunzj on 2015/10/2.
 */
(function () {

  angular
    .module('bb.common.service', ['bb.common.config', 'bb.common.constant'])
    .service('ajaxRequest', function($rootScope, $http, $log, bbConfig) {

        var apiConfig = bbConfig.apiConfig[$rootScope.env || 'dev'];

        function _ajaxRequest (options, apiPath) {

          if (!bbConfig.apiPath[apiPath]) {
            throw new Error('找不到您要访问的api,请检查模块bb.common.config中的apiPath是否配置。');
          }

          var defaultOptions = {
            url: getApiUrl(bbConfig.apiPath[apiPath]),
            responseType: 'json',
            timeout: 2000,
            transformResponse: function (data, headersGetter) {
              $log.info(data);
              $log.info(headersGetter);
            }
          };

          angular.extend(options, defaultOptions);

          return $http(options);
        }

        function ajaxPost (formData, apiPath) {
          return _ajaxRequest({
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
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
        function ajaxFileUpload (formData, fileKey, fileObject, apiPath) {

          if (!fileObject || !(fileObject instanceof File)) {
            throw new TypeError('无效的文件对象');
          }

          var _formData = new FormData();
          if (formData) {
            for (var key in formData) {
              _formData.append(key, formData[key]);
            }
          }
          _formData.append(fileKey, fileObject);

          return _ajaxRequest({
            method: 'POST',
            data: _formData,
            headers: {
              'Content-Type': undefined
            }
          }, apiPath);
        }

        function ajaxGet (queryData, apiPath) {
          return _ajaxRequest({
            method: 'GET',
            params: queryData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }, apiPath);
        }

        return {
          get: ajaxGet,
          post: ajaxPost,
          fileUpload: ajaxFileUpload
        };

        function getApiUrl (apiPath) {
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

                $log.info('Fail to verify user' + err);
                resolve(false);
              });
            }
          });
        }
      };
    }).service('apiService', function ($q, $log, ajaxRequest, bbConfig) {
        return {
          getBaseData: function () {
            return $q(function (resolve, reject) {
              ajaxRequest.get({}, 'baseData').then(function (result) {
                $log.info('@@@@@@@@@@@@@@');
                $log.info(result);
              }).catch(function (error) {
                $log.info('##############');
                $log.info(error);
              });
            });
          }
        };
      });
})();
