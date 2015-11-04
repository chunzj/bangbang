/**
 * Created by chunzj on 2015/10/7.
 */
(function () {
  angular
    .module('bb')
    .controller('LookMainController', LookMainController);

  /** @ngInject */
  function LookMainController($state, isLogin) {
    if (!isLogin || $window.isGuest) {
      $state.go('main');
      return;
    }
  }
})();
