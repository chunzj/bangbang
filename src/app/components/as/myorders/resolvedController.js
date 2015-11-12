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

    bbUtil.showLoading();

    var vm = $scope;
    if (resolvedOrders) {

      $log.info('Get user resolved orders from cache');
      vm.resolvedOrders = resolvedOrders;
      bbUtil.hideLoading();

    } else {

      ajaxRequest.get({
        userId: userInfo.userId
      }, 'asResolvedOrders').then(function (data) {

        var codeOrders = {};
        data.forEach(function (item) {
          codeOrders[item.orderId] = item;
        });

        vm.resolvedOrders = resolvedOrders = data;
        $window.resolvedCodeOrders = codeOrders;

        bbUtil.hideLoading();

      }).catch(function (err) {

        bbUtil.hideLoading();
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
          $state.go('personalCenter');
        });
      });
    }
  }
})();
