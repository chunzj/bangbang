/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersUnresolvedController', AsMyOrdersUnresolvedController);

  var currentTab = 'unresolved', unresolvedOrders = null;

  /** @ngInject */
  function AsMyOrdersUnresolvedController($scope, $timeout, $log, bbUtil) {
    var lastSelectTab = sessionStorage.getItem('asMyOrder.selectTab');
    if (lastSelectTab && lastSelectTab !== currentTab) {
      return;
    }

    $log.info('Unresolved');
    bbUtil.showLoading();

    var vm = $scope;
    vm.startProcessOrder = function (orderId) {
      $log.info('startProcessOrder current orderid = ' + orderId);
    };

    vm.finishOrder = function (orderId) {
      $log.info('finishOrder current orderid = ' + orderId);
    };

    if (unresolvedOrders) {
      $log.info('Get unresolved orders from cache');
      vm.unresolvedOrders = unresolvedOrders;
      bbUtil.hideLoading();
    } else {
      $timeout(function () {
        vm.unresolvedOrders = unresolvedOrders = [
          {
            id: '1',
            theme: '帮你送',
            departure: '金港国际',
            arrival: '四号桥',
            date: {
              title: '预约开始时间',
              time: '2015/08/20 15:00'
            },
            status: '待处理',
            oper: {
              text: '开始处理',
              bgColorClass: 'start-process',
              fn: vm.startProcessOrder
            },
            user: {
              name: 'A先生',
              phone: '18123235864'
            }
          },
          {
            id: '2',
            theme: '帮你办',
            departure: '金港国际',
            arrival: '四号桥',
            date: {
              title: '预约开始时间',
              time: '2015/08/20 15:00'
            },
            status: '处理中',
            oper: {
              text: '完成订单',
              bgColorClass: 'finish-order',
              fn: vm.finishOrder
            },
            user: {
              name: 'A先生',
              phone: '18123235865'
            }
          },
          {
            id: '3',
            theme: '帮你订',
            departure: '金港国际',
            arrival: '四号桥',
            date: {
              title: '订单完成时间',
              time: '2015/08/20 15:00'
            },
            status: '已完成,待支付'
          }
        ];

        bbUtil.hideLoading();
      }, 200);
    }
  }
})();
