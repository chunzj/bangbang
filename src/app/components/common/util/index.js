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
          successAlert: function (msg){
            $rootScope.alertSuccess = msg;
            openDialog(true);
          },
          errorAlert: function (msg){
            $rootScope.alertError = msg;
            openDialog(false);
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
