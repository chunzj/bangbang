/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, bbUtil) {
    var vm = $scope;

    vm.lookMain = function () {
      bbUtil.successAlert('登陆成功陆成功陆成功陆成功陆成功');
    }

    vm.lookMainError = function () {
      bbUtil.errorAlert('登陆失败');
    }
  }
})();
