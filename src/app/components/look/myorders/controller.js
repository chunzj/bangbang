/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookMyOrdersController', LookMyOrdersController);

  var userOrders = null;
  /** @ngInject */
  function LookMyOrdersController($scope, $state, $window, $log, ajaxRequest, bbUtil, bbConstant) {

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      $state.go('main');
      return;
    }

    var vm = $scope, orderStatus = $window.baseData.orderStatus;
    vm.commentOrder = function (orderId) {
      $log.info('Current commenting order ' + orderId);
      $state.go('evaluation', {
        type: bbConstant.evaluationType.STAR,
        orderId: orderId
      });
    };

    ajaxRequest.get({
      userId: userInfo.userId,
      auth: true
    }, 'lookMyOrders').then(function (data) {

      var codeOrders = {};
      if (data && Array.isArray(data)) {
        data = data.map(function (item) {

          var status = item.status;
          if (orderStatus[status.code] === '已完成') {
            status.style = 'has-salary';
          } else if (orderStatus[status.code] === '待评价') {
            status.style = 'wait-comment';
            status.fn = vm.commentOrder;
          } else {
            status.style = 'default';
          }

          codeOrders[item.orderId] = item;
          return item;
        });
      }

      vm.userOrders = userOrders = data;
      $window.codeOrders = codeOrders;
    }).catch(function (err) {
      bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
        $state.go('personalCenter');
      });
    });
  }
})();
