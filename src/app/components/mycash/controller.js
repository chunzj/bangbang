/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MyCashController', MyCashController);

  /** @ngInject */
  function MyCashController($scope, $log) {
    var vm = $scope;

    vm.cash = 10;
    vm.records = [
      {cause: '帮你办', dateTitle: '获得时间', quota: '+10', date: '2015/01/02'},
      {cause: '帮你订', dateTitle: '支出时间', quota: '-10', date: '2015/01/02'},
      {cause: '帮你订', dateTitle: '获得时间', quota: '+5', date: '2015/01/02'},
      {cause: '帮你订', dateTitle: '获得时间', quota: '+5', date: '2015/01/02'}
    ];

    //控制充值和提现的页面
    vm.showDialog = false;
    vm.openDialog = function (flag) {
      $scope.$broadcast('openCashDialog', flag);
      vm.showDialog = true;
    };

    $scope.$on('closeCashDialog', function (event, money) {
      vm.showDialog = false;
      if (angular.isNumber(money)) {
        vm.cash += money;
      }
    });
  }
})();

