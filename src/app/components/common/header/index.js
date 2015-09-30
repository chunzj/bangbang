/**
 * Created by ChunZuJun on 2015/9/30.
 *
 */
angular
  .module('bb.cp.common')
  .directive('header', function () {
    return {
      restrict: 'A',
      templateUrl: 'app/common/header/index.html',
      scope: {
        title: '@'
      }
    };
  });
