/**
 * Created by ChunZuJun on 2015/9/30.
 *
 */
(function () {
  angular
    .module('bb.cp.common', [])
    .directive('bbHeader', bbHeader);

  /** @ngInject */
  function bbHeader () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/common/header/index.html',
      scope: {
        title: '@'
      }
    };
  }
})();
