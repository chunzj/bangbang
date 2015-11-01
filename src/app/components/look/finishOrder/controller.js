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
    var orderId = $stateParams.orderId;

    vm.user = {
      photo: './assets/images/personal/photo.jpg'
    };

    vm.serviceEvaluation = function () {
      $state.go('evaluation', {orderId: orderId, type: bbConstant.evaluationType.STAR});
    };

    vm.onlinePayment = function () {
      $state.go('payment', {orderId: orderId});
    }
  }
})();
