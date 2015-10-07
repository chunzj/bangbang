/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersLatestController', AsMyOrdersLatestController);

  var currentTab = 'latest', latestOrders = null;
  /** @ngInject */
  function AsMyOrdersLatestController($scope, $timeout, $log, bbUtil) {
    var lastSelectTab = localStorage.getItem('asMyOrder.selectTab');
    if (lastSelectTab && lastSelectTab !== currentTab) {
      return;
    }

    $log.info('Latest');
    bbUtil.showLoading();

    var vm = $scope;
    if (latestOrders) {
      $log.info('Get latest orders from cache');
      vm.latestOrders = latestOrders;
      bbUtil.hideLoading();
    } else {
      $timeout(function () {
        vm.latestOrders = latestOrders = [
          {
            id: '1',
            theme: '帮你送',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '10斤的行李箱'
          },
          {
            id: '2',
            theme: '帮你办',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '去市政帮我交费'
          },
          {
            id: '3',
            theme: '帮你订',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '帮我去四号桥顶一个蛋糕'
          }
        ];

        bbUtil.hideLoading();
      }, 100);
    }
  }
})();
