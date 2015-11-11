/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookFinishOrderController', LookFinishOrderController);

  /** @ngInject */
  function LookFinishOrderController($scope, $state, $stateParams, bbConstant) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.avatar) {
      vm.user = {
        photo: userInfo.avatar
      };
    }

    //vm.serviceEvaluation = function () {
    //  $state.go('evaluation', {orderId: orderId, type: bbConstant.evaluationType.STAR});
    //};


    var orderId = $stateParams.orderId;
    vm.onlinePayment = function () {
      $state.go('payment', {orderId: orderId});
    }

    vm.offlinePayment = function () {
      $state.go('finishPayment', {orderId: orderId});
    }
  }
})();
