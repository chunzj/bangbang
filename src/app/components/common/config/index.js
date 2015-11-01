/**
 * Created by ChunZuJun on 2015/10/16.
 *
 */
(function () {

  angular
      .module('bb.common.config', [])
      .constant('bbConfig', {
        apiConfig: {
          dev: {
            hostname: 'http://211.149.247.18',
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
          uploadFile: '/test/update-file'
        }
      });
})();

