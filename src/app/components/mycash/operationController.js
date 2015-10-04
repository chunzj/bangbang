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
    });

    vm.cancelDialog = function () {
      this.$emit('closeCashDialog');
    };

    vm.saveDialog = function (addMoney) {
      this.$emit('closeCashDialog', Number(addMoney ? this.amount : -this.amount));
    };

    vm.amount = 0;
    vm.payItems = [{
      name: '微信',
      checked: false
    }];

    vm.checkPayItem = function (idx) {
      var targetItem = vm.payItems[idx];
      targetItem.checked = !targetItem.checked;
    }
  }
})();

