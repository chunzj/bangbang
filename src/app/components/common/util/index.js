/**
 * Created by chunzj on 2015/10/7.
 */
(function () {
  angular
    .module('bb.common.util', ['bb.common.constant'])
    .service('bbUtil', function ($document, $rootScope, bbConstant) {
      var loadingDom = null, PHONE_PATTERN = '^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\\d{4,8}$',
      CERTIFICATE_PATTERN = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      return {
        showLoading: function () {
          if (!loadingDom) {
            loadingDom = $document[0].querySelector('.loading');
          }
          loadingDom.style.display = 'block';
        },
        hideLoading: function () {
          loadingDom.style.display = 'none';
        },
        getPageTitle: function (source) {
          if (!source) {
            source = sessionStorage.getItem('userSource');
          }
          return bbConstant.userSource.as === source ? '当棒棒' : '找棒棒';
        },
        successAlert: function (msg, callback) {
          alertDialog(msg, callback, true);
        },
        errorAlert: function (msg, callback) {
          alertDialog(msg, callback, false);
        },
        validatePhone: function (phone) {

          if (!phone || phone.length === 0) {
            return false;
          }

          phone = phone.replace("+86", "");

          if (phone.indexOf('-') !== -1) {
            phone = phone.replace("-", "");
          }

          return new RegExp(PHONE_PATTERN, 'g').test(phone.trim());
        },
        validateIdCard: function (idCard) {
          if (CERTIFICATE_PATTERN.test(idCard)) {
            if (idCard.length === 18) {
              var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
              var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
              var idCardWiSum = 0; //用来保存前17位各自乘以加权因子后的总和
              for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                return true;
              }
            } else {
              return false;
            }

            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod === 2) {
              if (idCardLast === "X" || idCardLast === "x") {
                return true;
              } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast === idCardY[idCardMod]) {
                  return true;
                } else {
                  return false;
                }
              }
            }
          } else {
            return false;
          }
        },
        base64: function (string) {
          var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          var i = 0,
            length = string.length,
            ascii, index, output = '';

          for (; i < length; i += 3) {
            ascii = [
              string.charCodeAt(i),
              string.charCodeAt(i + 1),
              string.charCodeAt(i + 2)
            ];

            index = [
              ascii[0] >> 2, ((ascii[0] & 3) << 4) | ascii[1] >> 4, ((ascii[1] & 15) << 2) | ascii[2] >> 6,
              ascii[2] & 63
            ];

            if (isNaN(ascii[1])) {
              index[2] = 64;
            }
            if (isNaN(ascii[2])) {
              index[3] = 64;
            }

            output += b64[index[0]] + b64[index[1]] + b64[index[2]] + b64[index[3]];
          }

          return output;
        }
      };


      function alertDialog(msg, callback, isSuccess) {
        var fn = function () {
          $rootScope.alertError = msg;
          if (typeof callback === 'function') {
            $rootScope.alertCallback = callback.toString();
          }
        };

        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
          fn();
        } else {
          $rootScope.$apply(fn);
        }

        openDialog(isSuccess);
      }

      function openDialog(isSuccess) {

        var dialogContainer = $document[0].querySelector('.bb-dialog'),
          dialogClassList = dialogContainer.classList,
          successDom = dialogContainer.querySelector('.success'),
          successClassList = successDom.classList,
          errorDom = dialogContainer.querySelector('.error'),
          errorClassList = errorDom.classList;

        if (isSuccess) {
          successClassList.remove('hide');
          errorClassList.add('hide');
        } else {
          successClassList.add('hide');
          errorClassList.remove('hide');
        }

        dialogClassList.remove('hide');
      }
    });
})();
