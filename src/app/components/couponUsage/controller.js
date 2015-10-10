/**
 * Created by chunzj on 2015/10/1.
 */
(function () {
  angular
    .module('bb')
    .controller('CouponUsageController', CouponUsageController);

  /** @ngInject */
  function CouponUsageController($scope, $log) {
    $scope.back = function () {
      history.back();
    }
  }
})();
