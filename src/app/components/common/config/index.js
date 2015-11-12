/**
 * Created by ChunZuJun on 2015/10/16.
 *
 */
(function () {

  angular
      .module('bb.common.config', [])
      .constant('bbConfig', {
        apiBase: '/e-work',
        apiConfig: {
          dev: {
            hostname: '211.149.247.18',
            port: 8080
          },
          prod: {
            hostname: 'www.bb.com',
            port: 4001
          }
        },
        apiPath: {
          baseData: '/baseData',
          verifyUser: '/verifyUser',
          asRegister: '/register/as',
          lookRegister: '/register/look',
          verifyCode: '/verifyCode',
          login: '/login',
          asPersonal: '/personal/as',
          lookPersonal: '/personal/look',
          demandHelpSend: '/demand/help_send',
          lookMyOrders: '/personal/look/myOrders',
          evaluation: '/evaluation',
          asUnresolvedOrders: '/personal/as/unresolvedOrders',
          asResolvedOrders: '/personal/as/resolvedOrders',
          asLatestOrders: '/personal/as/latestOrders',
          lookCoupon: '/personal/look/bbCoupon',
          cashRecords: '/personal/cashRecord',
          comment: '/personal/comment',
          receiveOrder: '/order/receive',
          processOrder: '/order/process',
          finishOrder: '/order/finish',
          cancelOrder: '/order/cancel'
        }
      });
})();

