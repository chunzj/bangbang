/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('AsLoginController', AsLoginController);

  var GETTING_PASSWORD_TIME = 60, gettingPasswordTimer = null; //unit second

  /** @ngInject */
  function AsLoginController($scope, $timeout) {
    var vm = $scope;

    vm.user = {
      name: 'asd123',
      password: '12345678'
    };

    vm.gettingPasswordText = '获取密码';

    vm.getPassword = function () {
      if (gettingPasswordTimer) {
        return;
      }

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
  }
})();
