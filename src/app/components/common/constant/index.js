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
      },
      orderStatus: {
        1: '未抢单', //下了单，还未抢单
        2: '待处理', //已有师傅抢单，还未处理
        3: '处理中', //师傅正在处理，还未完成
        4: '完成待支付', //师傅已处理完，待支持
        5: '待评价', //支付完成,等待评价
        6: '已完成', //支付完成,评价完成
        7: '已取消' //订单被取消
      }
    });
})();
