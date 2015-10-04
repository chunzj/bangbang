/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MyWalletController', MyWalletController);

  /** @ngInject */
  function MyWalletController($scope) {
    var vm = $scope;

    vm.cash = 10;
    vm.records = [
      {quota: 10, date: '2015/01/02', expiredDate: '2015/08/02', status: '已使用', fontStyle: 'default'},
      {quota: 10, date: '2015/01/02', expiredDate: '2015/08/02', status: '未使用', fontStyle: 'not-used'},
      {quota: 5, date: '2015/01/02', expiredDate: '2015/08/02', status: '已过期', fontStyle: 'expired'}
    ];
  }
})();
