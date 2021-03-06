/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsUnresolvedOrderDetailController', AsUnresolvedOrderDetailController);

  /** @ngInject */
  function AsUnresolvedOrderDetailController($scope, $state, $stateParams, $window, $log, ajaxRequest, bbUtil) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      $state.go('main');
      return;
    }

    vm.startProcessOrder = function (orderId) {
      $log.info('startProcessOrder current orderId = ' + orderId);

      ajaxRequest.post({
        userId: userInfo.userId,
        orderId: orderId,
        identity: userInfo.identity,
        auth: true
      }, 'processOrder').then(function (data) {
        $log.info('Success to start process current orderId = ' + orderId);
        $state.go('asMyOrders');
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

        delete $window.unresolvedCodeOrders[orderId];
        if (!$window.resolvedCodeOrders) {
          $window.resolvedCodeOrders = {};
        }
        $window.resolvedCodeOrders[orderId] = vm.orderDetail;

        sessionStorage.setItem('asMyOrder.selectTab', 'resolved');
        $state.go('asMyOrders');
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    var orderId = $stateParams.orderId;
    if (!$window.unresolvedCodeOrders || !$window.unresolvedCodeOrders[orderId]) {
      bbUtil.errorAlert('未找到该订单的详情!', function () {
        history.back();
      });
      return;
    }

    vm.orderDetail = $window.unresolvedCodeOrders[orderId];
    vm.orderDetail.subscribeTime.start =
      bbUtil.removeCurrentYear(vm.orderDetail.subscribeTime.start);
    vm.orderDetail.subscribeTime.end =
      bbUtil.removeCurrentYear(vm.orderDetail.subscribeTime.end);
  }
})();
