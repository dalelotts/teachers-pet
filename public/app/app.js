angular.module('apot', [
  'apot.homeController',
  'apot.pepperController',
  'apot.pairsController',
  'apot.retroController',
  'apot.standUpController',
  'ngSanitize',
  'ui.router'
])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      'use strict'
      $urlRouterProvider.otherwise('/')

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
        })
        .state('pairs', {
          url: '/pairs',
          controller: 'pairsController',
          templateUrl: 'app/pairs/pairs.html'
        })
        .state('stand-up', {
          url: '/stand-up',
          controller: 'standUpController',
          templateUrl: 'app/standup/standup.html'
        })
        .state('retro', {
          url: '/retro',
          controller: 'retroController',
          templateUrl: 'app/retro/retro.html'
        })
    }
  ])
