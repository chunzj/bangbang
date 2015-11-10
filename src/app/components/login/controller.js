/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LoginController', LoginController);

  var GETTING_PASSWORD_TIME = 60, gettingPasswordTimer = null; //unit second

  /** @ngInject */
  function LoginController($scope, $timeout, $state, $window, $log, ajaxRequest, bbUtil, bbConstant) {

    var vm = $scope;

    vm.user = {};
    vm.gettingPasswordText = '获取密码';
    vm.getPassword = function () {

      if (!validateForm(vm.user.phone, bbUtil)) {
        return;
      }

      if (gettingPasswordTimer) {
        return;
      }

      ajaxRequest.get({
        phone: vm.user.phone
      }, 'verifyCode').then(function (data) {

        vm.user.code = data.code;
        $log.info('获取登录验证码成功！');

      }).catch(function (err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });

      var times = GETTING_PASSWORD_TIME;
      vm.gettingPasswordText = times + '秒后重新获取';
      gettingPasswordTimer = $timeout(function () {
        if (times <= 1) {
          vm.gettingPasswordText = '获取密码';
          $timeout.cancel(gettingPasswordTimer);
          gettingPasswordTimer = null;
          return;
        }

        vm.gettingPasswordText = (--times) + '秒后重新获取';
        gettingPasswordTimer = $timeout(arguments.callee, 1000);
      }, 1000);
    }

    vm.confirmLogin = function () {

      if (!validateForm(vm.user.phone, bbUtil, function () {
          if (!vm.user.code) {
            bbUtil.errorAlert('请输入随机密码');
            return false;
          }
          return true;
        })) {
        return;
      }

      ajaxRequest.post(vm.user, 'login').then(function (data) {
        $log.info('user login success');

        $window.authCode = data.authCode;
        localStorage.setItem('userInfo', JSON.stringify({
          userId: data.userId,
          identity: data.identity
        }));

        if (data.identity === bbConstant.userSource.look) {
          $state.go('lookMain');
        } else if (data.identity === bbConstant.userSource.as) {
          $state.go('personalCenter');
        }

      }).catch(function(err) {
        bbUtil.errorAlert(err && err.msg ? err.msg : '网络异常，请稍候重试!');
      });
    };
  }

  function validateForm (phone, bbUtil, selfValidateFn) {

    if (!phone) {
      bbUtil.errorAlert('请输入手机号码');
      return false;
    } else if (!bbUtil.validatePhone(phone)) {
      bbUtil.errorAlert('请输入有效的手机号码');
      return false;
    }

    if (typeof selfValidateFn === 'function') {
      return selfValidateFn();
    }

    return true;
  }
})();
