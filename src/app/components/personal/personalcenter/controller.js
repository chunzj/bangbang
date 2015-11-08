/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('PersonalCenterController', PersonalCenterController);

  /** @ngInject */
  function PersonalCenterController($scope, $state, $window, $log, isLogin, ajaxRequest, bbUtil, bbConstant) {

    if (!isLogin || $window.isGuest) {
      $state.go('main');
      return;
    }


    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || (!userInfo.identity || !userInfo.userId)) {
      $state.go('main');
      return;
    }

    var vm = $scope;
    vm.source = userInfo.identity;
    vm.isBangBang = vm.source === bbConstant.userSource.as;
    vm.pageTitle = bbUtil.getPageTitle(vm.source);

    ajaxRequest.get({
      userId: userInfo.userId,
      auth: true
    }, vm.source + 'Personal').then(function(data) {

      $log.info('Success to get ' + vm.source + ' info ' + JSON.stringify(data));
      vm.user = data;

      angular.extend(userInfo, data);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

    }).catch(function(err) {
      bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!', function () {
        history.back();
      });
    });
  }
})();

