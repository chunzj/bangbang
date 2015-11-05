/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('PersonalCenterController', PersonalCenterController);

  /** @ngInject */
  function PersonalCenterController($scope, $state, $window, $log, isLogin) {

    if (!isLogin || $window.isGuest) {
      $state.go('main');
      return;
    }

    var vm = $scope;
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    vm.source = userInfo.identity;
  }
})();
