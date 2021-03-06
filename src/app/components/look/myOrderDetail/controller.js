/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookOrderDetailController', LookOrderDetailController);

  function LookOrderDetailController($scope, $state, $stateParams, $window, $log, ajaxRequest, bbUtil, bbConstant) {

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      $state.go('main');
      return;
    }

    var orderId = $stateParams.orderId;

    var codeOrders = $window.codeOrders, orderDetail = codeOrders[orderId];
    if (!codeOrders || !orderDetail) {
      bbUtil.errorAlert('未找到相应的订单信息!', function () {
        history.back();
      });
      return;
    }

    var vm = $scope;
    vm.cancelOrder = function (orderId) {
      $log.info('cancel current order of ' + orderId);
      ajaxRequest.post({
        userId: userInfo.userId,
        orderId: orderId,
        identity: userInfo.identity,
        auth: true
      }, 'cancelOrder').then(function (data) {
        $log.info('Success to cancel current orderId = ' + orderId);
        $state.go('evaluation', {
          type: bbConstant.evaluationType.GB,
          orderId: orderId
        });
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    vm.finishOrder = function (orderId) {
      $log.info('finishOrder current orderId = ' + orderId);

      ajaxRequest.post({
        userId: userInfo.userId,
        orderId: orderId,
        identity: userInfo.identity,
        auth: true
      }, 'finishOrder').then(function (data) {
        $log.info('Success to finishOrder current orderId = ' + orderId);
        $state.go('lookFinishOrder', {orderId: orderId});
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    if(orderDetail.status.code < 3) { //表示订单还未开始处理
      orderDetail.cancel = {
        text: '取消订单',
        fn: vm.cancelOrder
      };
    } else if (orderDetail.status.code == 4) { //表示完成待支付
      orderDetail.oper = [];
      orderDetail.oper.push({
        text:'订单完成',
        bgClass: 'finish-order',
        fn: vm.finishOrder
      })
    }

    orderDetail.subscribeTime.start =
      bbUtil.removeCurrentYear(orderDetail.subscribeTime.start);
    orderDetail.subscribeTime.end =
      bbUtil.removeCurrentYear(orderDetail.subscribeTime.end);

    $scope.orderDetail = orderDetail;
  }
})();
