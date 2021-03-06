/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsLatestOrderDetailController', AsLatestOrderDetailController);

  /** @ngInject */
  function AsLatestOrderDetailController($scope, $state, $stateParams, $window, $log, ajaxRequest, bbUtil) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      $state.go('main');
      return;
    }

    vm.grabOrder = function (orderId) {
      $log.info('grade current orderId = ' + orderId);

      ajaxRequest.post({
        userId: userInfo.userId,
        orderId: orderId,
        identity: userInfo.identity,
        auth: true
      }, 'receiveOrder').then(function (data) {
        $log.info('Success to grab current orderId = ' + orderId);

        if ($window.latestCodeOrders[orderId]) {
          delete $window.latestCodeOrders[orderId];
        }

        if (!$window.unresolvedCodeOrders) {
          $window.unresolvedCodeOrders = {};
        }
        $window.unresolvedCodeOrders[orderId] = vm.orderDetail;

        sessionStorage.setItem('asMyOrder.selectTab', 'unresolved');
        $state.go('asMyOrders');
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    vm.back = function () {
      history.back();
    };

    var orderId = $stateParams.orderId;
    if (!$window.latestCodeOrders || !$window.latestCodeOrders[orderId]) {
      bbUtil.errorAlert('未找到该订单的详情!', function () {
        history.back();
      });
      return;
    }

    vm.orderDetail = $window.latestCodeOrders[orderId];
    vm.orderDetail.back = {
      text: '返回',
      fn: vm.back
    };

    vm.orderDetail.oper = [
      {
        text:'抢单',
        bgClass: 'grab-order',
        fn: vm.grabOrder
      }
    ];

    vm.orderDetail.subscribeTime.start =
      bbUtil.removeCurrentYear(vm.orderDetail.subscribeTime.start);
    vm.orderDetail.subscribeTime.end =
      bbUtil.removeCurrentYear(vm.orderDetail.subscribeTime.end);
  }
})();
