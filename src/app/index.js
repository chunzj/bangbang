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
    $stateProvider.
      state('main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/main/index.html',
            controller: 'MainController'
          }
        }
      }).
      state('login', {
        url: '/login',
        views: {
          '': {
            templateUrl: 'app/components/login/index.html',
            controller: 'LoginController'
          }
        }
      })
      .state('personalCenter', {
        url: '/personal/index',
        templateUrl: 'app/components/personal/personalcenter/index.html',
        controller: 'PersonalCenterController'
      })
      .state('personalEdit', {
        url: '/personal/edit',
        templateUrl: 'app/components/personal/personaledit/index.html',
        controller: 'PersonalEditController'
      })
      .state('myWallet', {
        url: '/personal/wallet',
        templateUrl: 'app/components/personal/mywallet/index.html',
        controller: 'MyWalletController'
      })
      .state('myCash', {
        url: '/personal/cash',
        views: {
          '': {
            templateUrl: 'app/components/personal/mycash/index.html',
            controller: 'MyCashController'
          },
          'operation@myCash': {
            templateUrl: 'app/components/personal/mycash/operation.html',
            controller: 'OperationController'
          }
        }
      }).
      state('myComment', {
        url: '/personal/comment',
        templateUrl: 'app/components/personal/mycomment/index.html',
        controller: 'MyCommentController'
      }).
      state('as', {
        url: '/as/index',
        views: {
          '': {
            templateUrl: 'app/components/as/main/index.html',
            controller: 'AsMainController'
          }
        }
      }).
      state('asRegister', {
        url: '/as/register',
        views: {
          '': {
            templateUrl: 'app/components/as/register/index.html',
            controller: 'AsRegisterController'
          }
        }
      }).
      state('asMyOrders', {
        url: '/as/myOrders',
        views: {
          '': {
            templateUrl: 'app/components/as/myOrders/index.html',
            controller: 'AsMyOrdersController'
          },
          'unresolved@asMyOrders': {
            templateUrl: 'app/components/as/myOrders/unresolved.html',
            controller: 'AsMyOrdersUnresolvedController'
          },
          'latest@asMyOrders': {
            templateUrl: 'app/components/as/myOrders/latest.html',
            controller: 'AsMyOrdersLatestController'
          },
          'resolved@asMyOrders': {
            templateUrl: 'app/components/as/myOrders/resolved.html',
            controller: 'AsMyOrdersResolvedController'
          }
        }
      }).
      state('asUnresolvedOrderDetail', {
        url: '/as/unresolvedOrderDetail/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/as/unresolvedOrderDetail/index.html',
            controller: 'AsUnresolvedOrderDetailController'
          }
        }
      }).
      state('asLatestOrderDetail', {
        url: '/as/latestOrderDetail/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/as/latestOrderDetail/index.html',
            controller: 'AsLatestOrderDetailController'
          }
        }
      }).
      state('lookMain', {
        url: '/look/main',
        views: {
          '': {
            templateUrl: 'app/components/look/main/index.html',
            controller: 'LookMainController'
          }
        }
      }).
      state('lookRegister', {
        url: '/look/register',
        views: {
          '': {
            templateUrl: 'app/components/look/register/index.html',
            controller: 'LookRegisterController'
          }
        }
      }).
      state('lookMyOrders', {
        url: '/look/myOrders',
        views: {
          '': {
            templateUrl: 'app/components/look/myOrders/index.html',
            controller: 'LookMyOrdersController'
          }
        }
      }).
      state('lookOrderDetail', {
        url: '/look/orderDetail/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/look/myOrderDetail/index.html',
            controller: 'LookOrderDetailController'
          }
        }
      }).
      state('lookDemand', {
        url: '/look/demand',
        views: {
          '': {
            templateUrl: 'app/components/look/demand/index.html',
            controller: 'LookDemandController'
          }
        }
      }).
      state('lookFinishOrder', {
        url: '/look/finishOrder/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/look/finishOrder/index.html',
            controller: 'LookFinishOrderController'
          }
        }
      }).
      state('register', {
        url: '/register',
        views: {
          '': {
            templateUrl: 'app/components/register/index.html',
            controller: 'RegisterController'
          }
        }
      }).
      state('registerSuccess', {
        url: '/registerSuccess',
        views: {
          '': {
            templateUrl: 'app/components/registerSuccess/index.html',
            controller: 'RegisterSuccessController'
          }
        }
      }).
      state('couponUsage', {
        url: '/couponUsage',
        views: {
          '': {
            templateUrl: 'app/components/couponUsage/index.html',
            controller: 'CouponUsageController'
          }
        }
      }).
      state('evaluation', {
        url: '/evaluation',
        views: {
          '': {
            templateUrl: 'app/components/evaluation/index.html',
            controller: 'EvaluationController'
          }
        },
        params: {
          orderId: '',
          type: ''
        }
      }).
      state('evaluationSuccess', {
        url: '/evaluationSuccess/:type',
        views: {
          '': {
            templateUrl: 'app/components/evaluationSuccess/index.html',
            controller: 'EvaluationSuccessController'
          }
        }
      }).
      state('payment', {
        url: '/payment/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/look/payment/index.html',
            controller: 'LookPaymentController'
          }
        }
      }).
      state('finishPayment', {
        url: '/finishPayment/:orderId',
        views: {
          '': {
            templateUrl: 'app/components/look/finishPayment/index.html',
            controller: 'LookFinishPaymentController'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject */
  function runBlock($rootScope, $state, $stateParams, $document, $timeout, $log) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function () {
      $timeout(function () {
        $document[0].body.scrollTop = 0;
      }, 100);
    });

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
      'bb.common.constant',
      'bb.cp.common'
    ]).constant('moment', moment)
    .config(baseConfig)
    .config(routerConfig)
    .run(runBlock);
})();
