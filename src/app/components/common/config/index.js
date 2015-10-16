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
            hostname: 'localhost',
            port: 4001
          },
          prod: {
            hostname: 'www.bb.com',
            port: 4001
          }
        },
        apiPath: {
          baseData: '/baseData',
          uploadFile: '/test/update-file'
        }
      });
})();

