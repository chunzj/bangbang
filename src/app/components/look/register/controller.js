/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookRegisterController', LookRegisterController);

  /** @ngInject */
  function LookRegisterController($scope, $state, $log, bbUtil) {
    var vm = $scope;

    vm.user = {agreed: false};

    vm.agreeRegisterProtocol = function (){
      vm.user.agreed = !vm.user.agreed;
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
      }

      if (!vm.user.certificate) {
        bbUtil.errorAlert('请输入您的身份证号码！');
        return;
      }

      if (!vm.user.agreed) {
        bbUtil.errorAlert('请选择用户注册协议！');
        return;
      }

      if (!bbUtil.validatePhone(vm.user.phone)) {
        bbUtil.errorAlert('请输入有效的手机号码！');
        return;
      }


      //sessionStorage.setItem('userSource', 'look');
      //$state.go('registerSuccess');
      $log.info(vm.user);
    };
  }
})();
