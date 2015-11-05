/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('EvaluationSuccessController', EvaluationSuccessController);

  /** @ngInject */
  function EvaluationSuccessController($scope, $stateParams, $log, bbUtil, bbConstant) {
    var vm = $scope;

    var evaluationType = $stateParams.type;

    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    vm.source = userInfo.identity;

    vm.pageTitle = bbUtil.getPageTitle(vm.source);

    vm.isReturnCash = bbConstant.userSource.look === vm.source &&
      evaluationType === bbConstant.evaluationType.STAR;
  }
})();
