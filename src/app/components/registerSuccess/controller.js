/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('RegisterSuccessController', RegisterSuccessController);

  /** @ngInject */
  function RegisterSuccessController($scope, $stateParams, $log) {
    var vm = $scope;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    vm.source = userInfo.identity;
  }
})();
