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
    }).filter('dateFormat', function ($log) {
      return function (date, pattern) {
        if (!date) {
          return '';
        }

        if (!pattern) {
          pattern = 'hm';
        }

        var res = [], patternChars = pattern.split('');
        for (var i = 0; i < patternChars.length; i++) {
          res.push(date[dateFormatStragety[patternChars[i]]]());
        }

       return res.join(':');
      };
    });

    var dateFormatStragety = {
      h: 'getHours',
      m: 'getMinutes'
    };
})();
