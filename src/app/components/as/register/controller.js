/**
 * Created by chunzj on 2015/10/1.
 */
(function (){

  angular
      .module('bb')
      .controller('AsRegisterController', AsRegisterController);

  /** @ngInject */
  function AsRegisterController($scope, $state, $log, $window, ajaxRequest, bbUtil){
    var vm = $scope;

    vm.user = {
      photoUrl: './assets/images/as/demo.png',
      photoData: './assets/images/as/demo.png',
      readedProtocol: false
    };

    var areasObj = bbUtil.formatAreas(), subAreas = areasObj.subAreas;
    vm.areas = areasObj.areas;
    vm.subAreas = [];

    vm.$watch('user.area', function (){
      if (arguments[0]) {
        vm.subAreas = subAreas[arguments[0].id];
      }
    });

    vm.agreeRegisterProtocol = function (){
      vm.user.readedProtocol = !vm.user.readedProtocol;
    };

    vm.confirmRegister = function (){
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

      if (!(vm.user.photoUrl instanceof File)) {
        bbUtil.errorAlert('请选择您的手持身份证照片！');
        return;
      }

      if (!vm.user.subArea) {
        bbUtil.errorAlert('请选择您的服务区域！');
        return;
      }

      if (!vm.user.readedProtocol) {
        bbUtil.errorAlert('请选择用户注册协议！');
        return;
      }

      ajaxRequest.fileUpload({
        firstName: vm.user.firstName,
        lastName: vm.user.lastName,
        phone: vm.user.phone,
        idNumber: vm.user.idNumber,
        serviceArea: vm.user.subArea.id,
        readedProtocol: vm.user.readedProtocol
      }, 'userPhoto', vm.user.photoUrl, 'asRegister').then(function (data) {
        $log.info('as register success');

        $window.authCode = data.authCode;
        localStorage.setItem('userInfo', JSON.stringify({
          userId: data.userId,
          identity: data.identity
        }));

        $state.go('registerSuccess');
      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };
  }
})();
