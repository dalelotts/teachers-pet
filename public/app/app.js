angular.module('apot',
  [
    'apot.homeController',
    'apot.pepperController',
    'ngSanitize',
    'ui.router'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      'use strict';
      $urlRouterProvider.otherwise('/');

      // Home state routing
      $stateProvider
        .state('home', {
          url: '/',
          controller: 'homeController',
          templateUrl: 'app/home/home.html'
        })
        .state('pepper', {
          url: '/pepper',
          controller: 'pepperController',
          templateUrl: 'app/pepper/pepper.html'
        });
    }
  ]);
