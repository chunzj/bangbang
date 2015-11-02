/**
 * Created by chunzj on 2015/10/7.
 */
(function (){
  angular
      .module('bb.common.util', ['bb.common.constant'])
      .service('bbUtil', function ($document, $rootScope, bbConstant){
        var loadingDom = null;
        return {
          showLoading: function (){
            if (!loadingDom) {
              loadingDom = $document[0].querySelector('.loading');
            }
            loadingDom.style.display = 'block';
          },
          hideLoading: function (){
            loadingDom.style.display = 'none';
          },
          getPageTitle: function (source){
            if (!source) {
              source = sessionStorage.getItem('userSource');
            }
            return bbConstant.userSource.as === source ? '当棒棒' : '找棒棒';
          },
          successAlert: function (msg, callback){
            $rootScope.$apply(function () {
              $rootScope.alertSuccess = msg;
              if (typeof callback === 'function') {
                $rootScope.alertCallback = callback.toString();
              }
            });
            openDialog(true);
          },
          errorAlert: function (msg, callback){
            $rootScope.$apply(function () {
              $rootScope.alertError = msg;
              if (typeof callback === 'function') {
                $rootScope.alertCallback = callback;
              }
            });
            openDialog(false);
          },
          base64: function(string) {
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

        function openDialog (isSuccess) {

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
