/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersResolvedController', AsMyOrdersResolvedController);

  var currentTab = 'resolved', resolvedOrders = null;
  /** @ngInject */
  function AsMyOrdersResolvedController($scope, $timeout, $log, bbUtil) {
    var lastSelectTab = localStorage.getItem('asMyOrder.selectTab');
    if (lastSelectTab && lastSelectTab !== currentTab) {
      return;
    }

    $log.info('Resolved');
    bbUtil.showLoading();

    var vm = $scope;
    if (resolvedOrders) {
      $log.info('Get resolved orders from cache');
      vm.resolvedOrders = resolvedOrders;
      bbUtil.hideLoading();
    } else {
      $timeout(function () {
        vm.resolvedOrders = resolvedOrders = [
          {
            id: '1',
            theme: '帮你送',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '10斤的行李箱',
            dateTime: '2015/08/20 15:00',
            status: '已完成',
            salary: 10
          },
          {
            id: '2',
            theme: '帮你办',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '去市政帮我交费',
            dateTime: '2015/08/20 15:00',
            status: '已完成',
            salary: 10
          },
          {
            id: '3',
            theme: '帮你订',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '帮我去四号桥订一个蛋糕',
            dateTime: '2015/08/20 15:00',
            status: '已完成',
            salary: 10
          }
        ];

        bbUtil.hideLoading();
      }, 100);
    }
  }
})();
