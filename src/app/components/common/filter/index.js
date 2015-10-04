/**
 * Created by chunzj on 2015/10/2.
 */
(function () {

  angular
    .module('bb.common.filter', [])
    .filter('currencyCn', function() {
      return function (input, unit) {
        if ((!input && input !== 0) || isNaN(Number(input))) {
          input = 0;
        }

        if (!unit) {
          unit = '元';
        }

        return [Number(input), unit].join('');
      };
    });

})();
