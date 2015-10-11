/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('LookDemandController', LookDemandController);

  /** @ngInject */
  function LookDemandController($scope, $state, $log) {
    var vm = $scope;

    vm.subscribe = function () {
      $log.info('Subscribe current order');
      $state.go('lookMyOrders');
    };

    vm.bbLevelOptions = [{
      id: '1',
      name: '金棒棒'
    },{
      id: '2',
      name: '银棒棒'
    },{
      id: '3',
      name: '铜棒棒'
    }];

    vm.$watch('orderDetail.serviceTime', function () {
      $log.info(arguments);
    });
  }
})();
