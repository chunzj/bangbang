/**
 * Created by ChunZuJun on 2015/9/30.
 *
 */
(function () {
  angular
    .module('bb.cp.common')
    .directive('bbAlert', bbAlert);

  /** @ngInject */
  function bbAlert ($state, $window, $log) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/common/alert/index.html',
      replace: true,
      scope: {
        success: '@',
        error: '@'
      },
      link: function (scope, element, attrs) {
        element[0].querySelector('.close').onclick = function () {
          element.addClass('hide');
          if (attrs.fn) {
            eval("(" + attrs.fn + ")")($state, $window);
          }
        }
      }
    };
  }
})();
