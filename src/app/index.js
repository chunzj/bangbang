/* global moment:false */
(function() {
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
      });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

  angular
    .module('bb', [
      'ngCookies',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ui.router',
      'toastr'
    ]).constant('moment', moment)
    .config(baseConfig)
    .config(routerConfig)
    .run(runBlock);
})();