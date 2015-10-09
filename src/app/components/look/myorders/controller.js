/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookMyOrdersController', LookMyOrdersController);

  var userOrders = null;
  /** @ngInject */
  function LookMyOrdersController($scope, $timeout, $state, $log, bbUtil, bbConstant) {
    var vm = $scope;
    bbUtil.showLoading();

    vm.commentOrder = function (orderId) {
      $log.info('Current commenting order ' + orderId);
      $state.go('evaluation', {
        type: bbConstant.evaluationType.STAR,
        orderId: orderId
      });
    };

    if (userOrders) {
      $log.info('Get user orders from cache');
      vm.userOrders = userOrders;
      bbUtil.hideLoading();
    } else {
      $timeout(function () {
        vm.userOrders = userOrders = [
          {
            id: '1',
            theme: '帮你送',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '10斤的行李箱',
            dateTime: '2015/08/20 15:00',
            status: {
              text: '已完成',
              style: 'has-salary'
            },
            salary: 10
          },
          {
            id: '2',
            theme: '帮你办',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '去市政帮我交费',
            dateTime: '2015/08/20 15:00',
            status: {
              text: '待评价',
              fn: vm.commentOrder,
              style: 'wait-comment'
            }
          },
          {
            id: '3',
            theme: '帮你订',
            departure: '金港国际',
            arrival: '四号桥',
            goods: '帮我去四号桥订一个蛋糕',
            dateTime: '2015/08/20 15:00',
            status: {
              text: '已接单',
              style: 'default'
            }
          }
        ];

        bbUtil.hideLoading();
      }, 100);
    }
  }
})();
