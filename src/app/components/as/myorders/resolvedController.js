/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersResolvedController', AsMyOrdersResolvedController);

  var currentTab = 'resolved', resolvedOrders = null;
  /** @ngInject */
  function AsMyOrdersResolvedController($scope, $state, $window, $log, bbUtil) {
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
    if (resolvedOrders) {

      $log.info('Get user resolved orders from cache');
      vm.resolvedOrders = resolvedOrders;

    } else {

      ajaxRequest.get({
        userId: userInfo.userId,
        auth: true
      }, 'asResolvedOrders').then(function (data) {

        var codeOrders = {};
        data.forEach(function (item) {
          codeOrders[item.orderId] = item;
        });

        vm.resolvedOrders = resolvedOrders = data;
        $window.resolvedCodeOrders = codeOrders;

      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
          $state.go('personalCenter');
        });
      });
    }
  }
})();
