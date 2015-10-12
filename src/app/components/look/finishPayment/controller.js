/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookFinishPaymentController', LookFinishPaymentController);

  /** @ngInject */
  function LookFinishPaymentController($scope, $state, $stateParams, $log, bbConstant) {
    var vm = $scope;
    var orderId = $stateParams.orderId;

    vm.user = {
      photo: '../../../../assets/images/personal/photo.jpg'
    };

    vm.serviceEvaluation = function () {
      $state.go('evaluation', {orderId: orderId, type: bbConstant.evaluationType.STAR});
    };
  }
})();
