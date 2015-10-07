/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsLatestOrderDetailController', AsLatestOrderDetailController);

  /** @ngInject */
  function AsLatestOrderDetailController($scope, $stateParams, $log) {
    var vm = $scope;

    vm.grabOrder = function (orderId) {
      $log.info('finishOrder current orderid = ' + orderId);
    };

    vm.back = function () {
      history.back();
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
        back: {
          text: '返回',
          fn: vm.back
        },
        servicePlace: '金港国际1号服务点',
        destination: '四号桥金山小区',
        bbLevel: {
          level: '',
          name: '银棒棒'
        },
        request: '把行李送到XX小区x栋X楼X室A某某手中',
        serviceTime: {
          start: '12:00',
          end: '13:00'
        },
        salary: '20元',
        oper: [
          {
            text:'抢单',
            bgClass: 'grab-order',
            fn: vm.grabOrder
          }
        ]
      },
      2: {
        id: 2,
        theme: '帮你办',
        user: {
          name: 'B先生',
          phone: '18627792284'
        },
        back: {
          text: '返回',
          fn: vm.back
        },
        servicePlace: '金港国际2号服务点',
        destination: '四号桥银山小区',
        bbLevel: {
          level: '',
          name: '金棒棒'
        },
        request: '去市政帮我交费',
        serviceTime: {
          start: '12:00',
          end: '13:00'
        },
        salary: '40元',
        oper: [
          {
            text:'抢单',
            bgClass: 'grab-order',
            fn: vm.grabOrder
          }
        ]
      },
      3: {
        id: 3,
        theme: '帮你订',
        user: {
          name: 'C先生',
          phone: '18627792285'
        },
        back: {
          text: '返回',
          fn: vm.back
        },
        servicePlace: '金港国际2号服务点',
        destination: '四号桥银山小区',
        bbLevel: {
          level: '',
          name: '金棒棒'
        },
        request: '帮我去四号桥订一个蛋糕',
        serviceTime: {
          start: '12:00',
          end: '13:00'
        },
        salary: '40元',
        oper: [
          {
            text:'抢单',
            bgClass: 'grab-order',
            fn: vm.grabOrder
          }
        ]
      }
    };

    vm.orderDetail = ordersDetail[orderId];
    if (!vm.orderDetail) {
      $log.error('未找到该订单的详情');
    }
  }
})();
