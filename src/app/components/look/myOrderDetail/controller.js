/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookOrderDetailController', LookOrderDetailController);

  function LookOrderDetailController($scope, $state, $stateParams, $window, $log, bbConstant) {

    var orderId = $stateParams.orderId;

    var codeOrders = $window.codeOrders, orderDetail = codeOrders[orderId];
    if (!codeOrders || !orderDetail) {
      util.errorAlert('未找到相应的订单信息!', function () {
        history.back();
      });
      return;
    }

    var vm = $scope;
    vm.cancelOrder = function (orderId) {
      $log.info('cancel order for ' + orderId);
      $state.go('evaluation', {
        type: bbConstant.evaluationType.GB,
        orderId: orderId
      });
    };

    vm.finishOrder = function (orderId) {
      $log.info('finishOrder current orderId = ' + orderId);
      $state.go('lookFinishOrder', {orderId: orderId});
    };

    if(orderDetail.status.code < 3) { //表示订单还未开始处理
      orderDetail.cancel = {
        text: '取消订单',
        fn: vm.cancelOrder
      };
    } else if (order.status.code == 4) { //表示完成待支付
      orderDetail.oper = [];
      orderDetail.oper.push({
        text:'订单完成',
        bgClass: 'finish-order',
        fn: vm.finishOrder
      })
    };
  }
})();
