/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MyCashController', MyCashController);

  /** @ngInject */
  function MyCashController($scope, $log, ajaxRequest, bbUtil) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || (!userInfo.identity || !userInfo.userId)) {
      $state.go('main');
      return;
    }

    vm.cash = userInfo.cash || 0;
    vm.pageTitle = bbUtil.getPageTitle(userInfo.identity);

    ajaxRequest.get({
      userId: userInfo.userId,
      identity: userInfo.identity,
      auth: true
    }, 'cashRecords').then(function (data) {
      $log.info('Success to get user cash records for ' + userInfo.identity);
      vm.records = data;
    }).catch(function (err) {
      bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
        history.back();
      });
    });

    //控制充值和提现的页面
    vm.showDialog = false;
    vm.openDialog = function (flag) {
      $scope.$broadcast('openCashDialog', flag);
      vm.showDialog = true;
    };

    $scope.$on('closeCashDialog', function (event, money) {
      vm.showDialog = false;
      if (angular.isNumber(money)) {
        vm.cash += money;
      }
    });
  }
})();

