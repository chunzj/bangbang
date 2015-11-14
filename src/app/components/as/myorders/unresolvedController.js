/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersUnresolvedController', AsMyOrdersUnresolvedController);

  var currentTab = 'unresolved', unresolvedOrders = null;

  /** @ngInject */
  function AsMyOrdersUnresolvedController($scope, $state, $window, $log, ajaxRequest, bbUtil) {
    var lastSelectTab = sessionStorage.getItem('asMyOrder.selectTab');
    if (lastSelectTab && lastSelectTab !== currentTab) {
      return;
    }

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      $state.go('main');
      return;
    }

    var vm = $scope, orderStatus = $window.baseData.orderStatus;
    vm.startProcessOrder = function (orderId) {
      $log.info('startProcessOrder current orderId = ' + orderId);

      ajaxRequest.post({
        userId: userInfo.userId,
        orderId: orderId,
        identity: userInfo.identity,
        auth: true
      }, 'processOrder').then(function (data) {
        $log.info('Success to start process current orderId = ' + orderId);
        vm.unresolvedOrders = unresolvedOrders = unresolvedOrders.map(function (item) { //转换成处理中
          if (item.orderId == orderId) {
            item.status = {
              code: 3,
              text: '处理中'
            };
            item.oper = {
              text: '完成订单',
              bgColorClass: 'finish-order',
              fn: vm.finishOrder
            };
            $window.unresolvedCodeOrders[orderId] = item;
          }

          return item;
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
        vm.unresolvedOrders = unresolvedOrders = unresolvedOrders.map(function (item) { //从未完成中删除
          if (item.orderId == orderId) {
            delete $window.unresolvedCodeOrders[orderId];
            return null;
          }
          return item;
        });
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    if (unresolvedOrders) {
      $log.info('Get user unresolved orders from cache');
      vm.unresolvedOrders = unresolvedOrders;
    } else {
      ajaxRequest.get({
        userId: userInfo.userId,
        auth: true
      }, 'asUnresolvedOrders').then(function (data) {

        var codeOrders = {};
        data = data.map(function (item) {

          var status = item.status;
          if (orderStatus[status.code] === '待处理') {
            item.oper = {
              text: '开始处理',
              bgColorClass: 'start-process',
              fn: vm.startProcessOrder
            };
          } else if (orderStatus[status.code] === '处理中') {
            item.oper = {
              text: '完成订单',
              bgColorClass: 'finish-order',
              fn: vm.finishOrder
            };
          } else {
            item.oper = {};
          }

          codeOrders[item.orderId] = item;
          return item;
        });

        vm.unresolvedOrders = unresolvedOrders = data;
        $window.unresolvedCodeOrders = codeOrders;

      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
          $state.go('personalCenter');
        });
      });
    }
  }
})();
