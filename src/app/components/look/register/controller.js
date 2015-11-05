/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookRegisterController', LookRegisterController);

  /** @ngInject */
  function LookRegisterController($scope, $state, $log, $window, bbUtil, ajaxRequest) {
    var vm = $scope;

    vm.user = {readedProtocol: false};

    vm.agreeRegisterProtocol = function (){
      vm.user.readedProtocol = !vm.user.readedProtocol;
    };

    vm.confirmRegister = function () {
      if (!vm.user.lastName) {
        bbUtil.errorAlert('请输入您的姓！');
        return;
      }

      if (!vm.user.firstName) {
        bbUtil.errorAlert('请输入您的名！');
        return;
      }

      if (!vm.user.phone) {
        bbUtil.errorAlert('请输入您的手机号码！');
        return;
      } else if (!bbUtil.validatePhone(vm.user.phone)) {
        bbUtil.errorAlert('请输入有效的手机号码！');
        return;
      }

      if (!vm.user.idNumber) {
        bbUtil.errorAlert('请输入您的身份证号码！');
        return;
      } else if (!bbUtil.validateIdCard(vm.user.idNumber)) {
        bbUtil.errorAlert('请输入有效的身份证号码！');
        return;
      }

      if (!vm.user.readedProtocol) {
        bbUtil.errorAlert('请选择用户注册协议！');
        return;
      }

      ajaxRequest.post(vm.user, 'lookRegister').then(function (data) {
        $log.info('look register success');

        $window.authCode = data.authCode;
        localStorage.setItem('userInfo', JSON.stringify({
          userId: data.userId,
          identity: data.identity
        }));

        $state.go('registerSuccess');
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });

      $log.info(vm.user);
    };
  }
})();
