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

    var vm = $scope;
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
        loadData($state, vm, $window, ajaxRequest, bbUtil, userInfo);
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };

    loadData($state, vm, $window, ajaxRequest, bbUtil, userInfo);
  }


  function loadData($state, $scope, $window, ajaxRequest, bbUtil, userInfo) {
    var orderStatus = $window.baseData.orderStatus;
    ajaxRequest.get({
      userId: userInfo.userId,
      auth: true
    }, 'asUnresolvedOrders').then(function (data) {

      var codeOrders = {};
      if (data && Array.isArray(data)) {
        data = data.map(function (item) {
          var status = item.status;
          if (orderStatus[status.code] === '待处理') {
            item.oper = {
              text: '开始处理',
              bgColorClass: 'start-process',
              fn: $scope.startProcessOrder
            };
          } else if (orderStatus[status.code] === '处理中') {
            item.oper = {
              text: '完成订单',
              bgColorClass: 'finish-order',
              fn: $scope.finishOrder
            };
          } else {
            item.oper = {};
          }
          codeOrders[item.orderId] = item;
          return item;
        });
      }

      $scope.unresolvedOrders = unresolvedOrders = data;
      $window.unresolvedCodeOrders = codeOrders;

    }).catch(function (err) {
      bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
        $state.go('personalCenter');
      });
    });
  }


})();
