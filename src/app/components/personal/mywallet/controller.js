/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MyWalletController', MyWalletController);

  /** @ngInject */
  function MyWalletController($scope, $window, $log, ajaxRequest, bbUtil, bbConstant) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || (!userInfo.identity || !userInfo.userId)) {
      $state.go('main');
      return;
    }

    vm.cash = userInfo.cash || 0;
    vm.pageTitle = bbUtil.getPageTitle(userInfo.identity);

    if (userInfo.identity == bbConstant.userSource.look) {
      ajaxRequest.get({
        userId: userInfo.userId,
        auth: true
      }, 'lookCoupon').then(function (data) {
        $log.info('Success to get user wallet records for ' + userInfo.identity);
        vm.records = data.map(function (item) {
          if ($window.baseData.couponStatus[item.status.code] == '未使用') {
            item.fontStyle = 'not-used';
          } else if ($window.baseData.couponStatus[item.status.code] == '已过期') {
            item.fontStyle = 'expired';
          } else {
            item.fontStyle = 'default';
          }
          return item;
        });
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
          history.back();
        });
      });
    }
  }
})();
