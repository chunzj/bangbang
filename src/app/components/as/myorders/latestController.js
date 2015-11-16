/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsMyOrdersLatestController', AsMyOrdersLatestController);

  var currentTab = 'latest', latestOrders = null;
  /** @ngInject */
  function AsMyOrdersLatestController($scope, $state, $window, $log, ajaxRequest, bbUtil) {
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
    ajaxRequest.get({
      userId: userInfo.userId,
      auth: true
    }, 'asLatestOrders').then(function (data) {

      var codeOrders = {};
      if (data && Array.isArray(data)) {
        data.forEach(function (item) {
          codeOrders[item.orderId] = item;
        });
      }

      vm.latestOrders = latestOrders = data;
      $window.latestCodeOrders = codeOrders;

    }).catch(function (err) {
      bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
        $state.go('personalCenter');
      });
    });
  }
})();
