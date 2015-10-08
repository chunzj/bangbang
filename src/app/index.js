/* global moment:false */
(function () {
  'use strict';

  /** @ngInject */
  function baseConfig($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-center-center';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login/:source',
        views: {
          '': {
            templateUrl: 'app/components/login/index.html',
            controller: 'LoginController',
            controllerAs: 'login'
          }
        }
      })
      .state('personalCenter', {
        url: '/personal/index/:source',
        templateUrl: 'app/components/personal/personalcenter/index.html',
        controller: 'PersonalCenterController',
        controllerAs: 'personal'
      })
      .state('personalEdit', {
        url: '/personal/edit',
        templateUrl: 'app/components/personal/personaledit/index.html',
        controller: 'PersonalEditController',
        controllerAs: 'personalEdit'
      })
      .state('myWallet', {
        url: '/personal/wallet',
        templateUrl: 'app/components/personal/mywallet/index.html',
        controller: 'MyWalletController',
        controllerAs: 'myWallet'
      })
      .state('myCash', {
        url: '/personal/cash',
        views: {
          '': {
            templateUrl: 'app/components/personal/mycash/index.html',
            controller: 'MyCashController',
            controllerAs: 'myCash'
          },
          'operation@myCash': {
            templateUrl: 'app/components/personal/mycash/operation.html',
            controller: 'OperationController',
            controllerAs: 'operation'
          }
        }
      }).
      state('as', {
        url: '/as/index',
        views: {
          '': {
            templateUrl: 'app/components/as/main/index.html',
            controller: 'AsMainController',
            controllerAs: 'asMain'
          }
        }
      }).
      state('asRegister', {
        url: '/as/register',
        views: {
          '': {
            templateUrl: 'app/components/as/register/index.html',
            controller: 'AsRegisterController',
            controllerAs: 'asRegister'
          }
        }
      }).
      state('asMyOrders', {
        url: '/as/myOrders',
        views: {
          '': {
            templateUrl: 'app/components/as/myorders/index.html',
            controller: 'AsMyOrdersController',
            controllerAs: 'asMyOrders'
          },
          'unresolved@asMyOrders': {
            templateUrl: 'app/components/as/myorders/unresolved.html',
            controller: 'AsMyOrdersUnresolvedController',
            controllerAs: 'asMyOrdersUnresolved'
          },
          'latest@asMyOrders': {
            templateUrl: 'app/components/as/myorders/latest.html',
            controller: 'AsMyOrdersLatestController',
            controllerAs: 'asMyOrdersLatest'
          },
          'resolved@asMyOrders': {
            templateUrl: 'app/components/as/myorders/resolved.html',
            controller: 'AsMyOrdersResolvedController',
            controllerAs: 'asMyOrdersResolved'
          }
        }
      }).
      state('asUnresolvedOrderDetail', {
        url: '/as/unresolvedOrderDetail/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/as/unresolvedOrderDetail/index.html',
            controller: 'AsUnresolvedOrderDetailController',
            controllerAs: 'asUnresolvedOrderDetail'
          }
        }
      }).
      state('asLatestOrderDetail', {
        url: '/as/latestOrderDetail/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/as/latestOrderDetail/index.html',
            controller: 'AsLatestOrderDetailController',
            controllerAs: 'asLatestOrderDetail'
          }
        }
      }).
      state('look', {
        url: '/look/index',
        views: {
          '': {
            templateUrl: 'app/components/look/home/index.html',
            controller: 'LookHomeController',
            controllerAs: 'LookHome'
          }
        }
      }).
      state('lookMain', {
        url: '/look/main',
        views: {
          '': {
            templateUrl: 'app/components/look/main/index.html',
            controller: 'LookMainController',
            controllerAs: 'LookMain'
          }
        }
      }).
      state('lookRegister', {
        url: '/look/register',
        views: {
          '': {
            templateUrl: 'app/components/look/register/index.html',
            controller: 'LookRegisterController',
            controllerAs: 'lookRegister'
          }
        }
      }).
      state('lookMyOrders', {
        url: '/look/myOrders',
        views: {
          '': {
            templateUrl: 'app/components/look/myorders/index.html',
            controller: 'LookMyOrdersController',
            controllerAs: 'lookMyOrders'
          }
        }
      }).
      state('registerSuccess', {
        url: '/registerSuccess/:source',
        views: {
          '': {
            templateUrl: 'app/components/registerSuccess/index.html',
            controller: 'RegisterSuccessController',
            controllerAs: 'registerSuccess'
          }
        }
      });

    $urlRouterProvider.otherwise('/look/index');
  }

  /** @ngInject */
  function runBlock($rootScope, $state, $stateParams, $log) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $log.debug('runBlock end');
  }

  angular
    .module('bb', [
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'toastr',
      'bb.common.util',
      'bb.common.filter',
      'bb.cp.common'
    ]).constant('moment', moment)
    .config(baseConfig)
    .config(routerConfig)
    .run(runBlock);
})();
