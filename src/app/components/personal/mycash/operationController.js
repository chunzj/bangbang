/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('OperationController', OperationController);

  /** @ngInject */
  function OperationController($scope, $log) {
    var vm = $scope;

    vm.viewFlag = 0;
    vm.$on('openCashDialog', function (event, flag) {
      $log.info('Open cash ' + (flag > 0 ? 'charge' : 'withdraw') + ' dialog');
      vm.viewFlag = flag;

      if (flag == -1) {
        vm.paymentMode = [{
          id: 'wxWallet',
          icon: './assets/images/wallet/card.png',
          name: '微信钱包支付',
          comment: '提现至微信钱包',
          checked: false
        }];
      } else if (flag == 1) {
        vm.paymentMode = [{
          id: 'wxWallet',
          icon: './assets/images/wallet/card.png',
          name: '微信钱包支付',
          comment: '使用微信钱包快捷支付',
          checked: false
        }];
      }
    });

    vm.cancelDialog = function () {
      this.$emit('closeCashDialog');
    };

    vm.amount = 0;
    vm.saveDialog = function (addMoney) {
      this.$emit('closeCashDialog', Number(addMoney ? this.amount : -this.amount));
    };

    vm.checkPaymentItem = function (idx) {
      var targetItem = vm.paymentMode[idx];
      targetItem.checked = !targetItem.checked;
    }
  }
})();

