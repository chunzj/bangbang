/**
 * Created by chunzj on 2015/10/7.
 */
(function () {
  angular
    .module('bb')
    .controller('LookMainController', LookMainController);

  /** @ngInject */
  function LookMainController($state, checker) {
    checker.isLogin().then(function (isLogin) {
      if (!isLogin) {
        $state.go('main');
        return;
      }
    });
  }
})();
