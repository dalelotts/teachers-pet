angular.module('apot',
  [
    'ui.router',
    'apot.homeController',
    'apot.pepperController'
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
