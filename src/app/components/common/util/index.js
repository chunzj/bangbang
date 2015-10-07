/**
 * Created by chunzj on 2015/10/7.
 */
(function () {

  angular
    .module('bb.common.util', [])
    .service('bbUtil', function($document) {
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
        }
      };
    });

})();
