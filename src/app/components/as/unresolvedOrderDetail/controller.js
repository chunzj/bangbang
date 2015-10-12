/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsUnresolvedOrderDetailController', AsUnresolvedOrderDetailController);

  /** @ngInject */
  function AsUnresolvedOrderDetailController($scope, $state, $stateParams, $log, bbConstant) {
    var vm = $scope;

    vm.cancelOrder = function (orderId) {
      $log.info('cancel order for ' + orderId);
      $state.go('evaluation', {
        type: bbConstant.evaluationType.GB,
        orderId: orderId
      });
    };

    vm.startProcessOrder = function (orderId) {
      $log.info('startProcessOrder current orderid = ' + orderId);
    };
    vm.finishOrder = function (orderId) {
      $log.info('finishOrder current orderid = ' + orderId);
    };

    var orderId = $stateParams.orderId;
    var ordersDetail = {
      1: {
        id: 1,
        theme: '帮你送',
        user: {
          name: 'A先生',
          phone: '18627792280'
        },
        cancel: {
          text: '取消订单',
          fn: vm.cancelOrder
        },
        servicePlace: '金港国际1号服务点',
        destination: '四号桥金山小区',
        bbLevel: {
          level: '',
          name: '银棒棒'
        },
        request: '把行李送到XX小区x栋X楼X室A某某手中。',
        serviceTime: {
          start: '12:00',
          end: '13:00'
        },
        salary: '20元',
        oper: [
          {
            text:'开始处理',
            bgClass: 'start-process',
            fn: vm.startProcessOrder
          },
          {
            text:'订单完成',
            bgClass: 'finish-order',
            fn: vm.finishOrder
          }
        ]
      },
      2: {
        id: 2,
        theme: '帮你送',
        user: {
          name: 'B先生',
          phone: '18627792284'
        },
        cancel: {
          text: '取消订单',
          fn: vm.cancelOrder
        },
        servicePlace: '金港国际2号服务点',
        destination: '四号桥银山小区',
        bbLevel: {
          level: '',
          name: '金棒棒'
        },
        request: '把行李送到XX小区x栋X楼X室A某某手中。',
        serviceTime: {
          start: '12:00',
          end: '13:00'
        },
        salary: '40元',
        oper: [
          {
            text:'开始处理',
            bgClass: 'start-process',
            fn: vm.startProcessOrder
          },
          {
            text:'订单完成',
            bgClass: 'finish-order',
            fn: vm.finishOrder
          }
        ]
      },
      3: {
        id: 3,
        theme: '帮你送',
        user: {
          name: 'C先生',
          phone: '18627792285'
        },
        servicePlace: '金港国际2号服务点',
        destination: '四号桥银山小区',
        bbLevel: {
          level: '',
          name: '金棒棒'
        },
        request: '把行李送到XX小区x栋X楼X室A某某手中。',
        serviceTime: {
          start: '12:00',
          end: '13:00'
        },
        salary: '40元'
      }
    };

    vm.orderDetail = ordersDetail[orderId];
    if (!vm.orderDetail) {
      $log.error('未找到该订单的详情');
    }
  }
})();
