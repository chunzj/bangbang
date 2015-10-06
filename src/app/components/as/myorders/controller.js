/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersController', AsMyOrdersController);

  /** @ngInject */
  function AsMyOrdersController($scope, $log) {
    var vm = $scope;



    vm.selectTab = function (tab) {
      vm.setTabSelected(tab);
      localStorage.setItem('asMyOrder.selectTab', tab);
    };

    vm.setTabSelected = function (tab) {
      vm.unfinished = (tab === 'unfinished');
      vm.finished = (tab === 'finished');
      vm.myOrder = (tab === 'myorder');
    };

    var lastSelectTab = localStorage.getItem('asMyOrder.selectTab');
    if (lastSelectTab) {
      vm.setTabSelected(lastSelectTab);
    } else {
      vm.setTabSelected('myorder');
    }

    vm.startProcessOrder = function (orderId) {
      $log.info('startProcessOrder current orderid = ' + orderId);
    };
    vm.finishOrder = function (orderId) {
      $log.info('finishOrder current orderid = ' + orderId);
    };
    vm.myOrders = [
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
  }
})();
