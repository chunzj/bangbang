/**
 * Created by chunzj on 2015/10/7.
 */
(function () {

  angular
    .module('bb.common.util', ['bb.common.constant'])
    .service('bbUtil', function($document, bbConstant) {
      var loadingDom = null;
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
          return bbConstant.userSource.as === source ? '当棒棒':'找棒棒';
        }
      };
    });

})();
