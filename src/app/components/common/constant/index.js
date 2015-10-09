/**
 * Created by chunzj on 2015/10/9.
 */
(function () {

  angular
    .module('bb.common.constant', [])
    .constant('bbConstant', {
      userSource: {
        look: 'look', //找棒棒,
        as: 'as' //当棒棒
      },
      evaluationType: {
        GB: 'goodBad', //好评、差评,
        STAR: 'star' //星级评价
      }
    });
})();