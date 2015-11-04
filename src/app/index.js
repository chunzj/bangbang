/* global moment:false */
(function (){
  'use strict';

  /** @ngInject */
  function baseConfig($logProvider){

    // Enable log
    $logProvider.debugEnabled(true);
  }

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider){

    var readyResolve = {
      isLogin: function (checker) {
        return checker.isLogin();
      },
      baseData: function (apiService){
        return apiService.getBaseData();
      }
    };

    $stateProvider.
        state('main', {
          url: '/',
          views: {
            '': {
              templateUrl: 'app/main/index.html',
              controller: 'MainController',
              resolve: {
                baseData: function (apiService){
                  return apiService.getBaseData();
                }
              }
            }
          }
        }).
        state('guestMain', {
          controller: function ($state, bbConstant){
            localStorage.setItem('userInfo', JSON.stringify({
              identity: bbConstant.userSource.guest
            }));

            $state.go('lookMain');
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
          controller: 'PersonalCenterController',
          resolve: readyResolve
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
              controller: 'AsMyOrdersController',
              resolve: readyResolve
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
              controller: 'LookMainController',
              resolve: readyResolve
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
  function runBlock($rootScope, $state, $stateParams, $window, $document, $timeout, $log, bbUtil){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.alertSuccess = '操作成功';
    $rootScope.alertError = '操作失败';

    //config api environment variables
    $rootScope.env = 'dev';

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
      var toStateName = toState.name;
      if (toStateName === 'lookDemand' || toStateName === 'personalCenter') { //这个主要是针对guest用户的判断
        if ($window.isGuest) {
          bbUtil.successAlert('当前身份为guest用户，请先登录或注册！', function ($state){
            $state.go('main');
          });
          event.preventDefault();
          return;
        }
      } else if (toStateName !== 'personalCenter' && toStateName !== 'asMyOrders' &&
          toStateName !== 'lookMain' && toStateName !== 'main') { //这个主要是控制页面的访问权限
        if ($window.isGuest || !$window.authCode) {
          $state.go('main');
          event.preventDefault();
          return;
        }
      }

      $timeout(function (){
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
        'bb.common.util',
        'bb.common.filter',
        'bb.common.constant',
        'bb.common.service',
        'bb.cp.common'
      ]).constant('moment', moment)
      .config(baseConfig)
      .config(routerConfig)
      .run(runBlock);
})();
