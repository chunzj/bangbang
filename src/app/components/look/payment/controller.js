/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookPaymentController', LookPaymentController);

  function countMoney (accruedMoney, discount) {
    var money = Number(accruedMoney) + Number(discount ? discount.value : 0);
    return money < 0 ? 0 : money;
  }

  /** @ngInject */
  function LookPaymentController($scope, $state, $stateParams, $window, $log) {

    var vm = $scope;
    var orderId = $stateParams.orderId;

    vm.discountOptions = $window.discountInfo || [];
    vm.paymentMode = [{
      id: 'bbWallet',
      icon: './assets/images/wallet/card.png',
      name: '棒棒钱包支付',
      comment: '通过棒棒钱包的余额支付',
      checked: false
    },{
      id: 'wxWallet',
      icon: './assets/images/wallet/card.png',
      name: '微信钱包支付',
      comment: '通过微信钱包快捷支付',
      checked: false
    }];

    vm.checkPaymentItem = function (targetIdx) {
      vm.paymentMode[targetIdx].checked = !vm.paymentMode[targetIdx].checked;
      if (vm.paymentMode[targetIdx].checked) {
        vm.paymentMode.forEach(function (item, idx) {
          if (idx !== targetIdx) {
            item.checked = false;
          }
        });
      }
    };

    vm.accruedMoney = 0, vm.discount = 0, vm.realMoney = 0;
    vm.$watch('accruedMoney', function (newValue) {
      vm.accruedMoney = newValue;
      vm.realMoney = countMoney(vm.accruedMoney, vm.discount);
    });

    vm.$watch('discount', function (newValue) {
      vm.discount = newValue;
      vm.realMoney = countMoney(vm.accruedMoney, vm.discount);
    });

    vm.confirmPayment = function () {
      $state.go('finishPayment', {orderId: orderId});
    };

    vm.cancelPayment = function () {
      history.back();
    };
  }
})();
