/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersController', AsMyOrdersController);

  /** @ngInject */
  function AsMyOrdersController($scope, $state, $window, $log, isLogin) {

    if (!isLogin || $window.isGuest) {
      $state.go('main');
      return;
    }

    var vm = $scope;

    vm.selectTab = function (tab) {
      vm.setTabSelected(tab);
      sessionStorage.setItem('asMyOrder.selectTab', tab);
      $state.reload('asMyOrders');
    };

    vm.setTabSelected = function (tab) {
      vm.unresolved = (tab === 'unresolved');
      vm.resolved = (tab === 'resolved');
      vm.latest = (tab === 'latest');
    };

    var lastSelectTab = sessionStorage.getItem('asMyOrder.selectTab');
    if (lastSelectTab) {
      vm.setTabSelected(lastSelectTab);
    } else {
      vm.setTabSelected('latest');
      sessionStorage.setItem('asMyOrder.selectTab', 'latest');
    }
  }
})();
