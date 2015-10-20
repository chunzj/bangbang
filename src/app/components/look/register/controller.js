/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookRegisterController', LookRegisterController);

  /** @ngInject */
  function LookRegisterController($scope, $state, $log) {
    var vm = $scope;

    vm.user = {
      lastName: '',
      firstName: '',
      phone: '',
      certificate: '',
      agreed: false
    };

    vm.confirmRegister = function () {
      sessionStorage.setItem('userSource', 'look');
      $state.go('registerSuccess');
    };
  }
})();
