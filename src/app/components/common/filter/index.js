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
    }).filter('dateFormat', function () {
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
    }).filter('truncateStr', function () {
      return function (str, len) {
        if (!str || str.trim().length === 0) {
          return '';
        }

        len = Number(len);
        if (isNaN(len)) {
          return '';
        }

        return str.length <= len ? str : str.substring(0, len) + '...';
      }
  });

    var dateFormatStragety = {
      h: 'getHours',
      m: 'getMinutes'
    };
})();
