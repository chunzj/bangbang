/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('PersonalCenterController', PersonalCenterController);

  /** @ngInject */
  function PersonalCenterController($scope, $log) {
    var vm = $scope;

    $scope.source = sessionStorage.getItem('userSource');
  }
})();
