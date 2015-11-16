/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookFinishOrderController', LookFinishOrderController);

  /** @ngInject */
  function LookFinishOrderController($scope, $state, $stateParams, $window) {
    var vm = $scope;

    var orderId = $stateParams.orderId, orderDetail = $window.codeOrders[orderId];
    vm.onlinePayment = function () {
      $state.go('payment', {orderId: orderId});
    }

    //to do by api
    vm.offlinePayment = function () {
      $state.go('finishPayment', {orderId: orderId});
    }

    if (orderDetail) {
      vm.bangbang = {
        avatar: orderDetail.user.avatar || ''
      };
    }
  }
})();
