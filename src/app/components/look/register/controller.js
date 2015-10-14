/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookRegisterController', LookRegisterController);

  /** @ngInject */
  function LookRegisterController($scope, $state, $log, toastr) {
    var vm = $scope;

    vm.confirmRegister = function () {
      toastr.success('操作成功');
      sessionStorage.setItem('userSource', 'look');
      $state.go('registerSuccess');
    };
  }
})();
