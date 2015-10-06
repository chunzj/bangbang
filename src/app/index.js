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
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('personalCenter', {
        url: '/personal/index',
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
      state('asLogin', {
        url: '/as/login',
        views: {
          '': {
            templateUrl: 'app/components/as/login/index.html',
            controller: 'AsLoginController',
            controllerAs: 'asLogin'
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
      state('asRegisterSuccess', {
        url: '/as/registerSuccess',
        views: {
          '': {
            templateUrl: 'app/components/as/registerSuccess/index.html',
            controller: 'AsRegisterSuccessController',
            controllerAs: 'asRegisterSuccess'
          }
        }
      }).
      state('asMyOrders', {
        url: '/as/orders',
        views: {
          '': {
            templateUrl: 'app/components/as/myorders/index.html',
            controller: 'AsMyOrdersController',
            controllerAs: 'asMyOrders'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
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
      'bb.common.filter',
      'bb.cp.common'
    ]).constant('moment', moment)
    .config(baseConfig)
    .config(routerConfig)
    .run(runBlock);
})();
