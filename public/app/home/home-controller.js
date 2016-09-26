angular.module('apot.homeController', ['ngResource'])
  .controller('homeController', [
    '$scope',
    '$resource',
    '$q',
    function ($scope, $resource) {
      'use strict';
      $scope.controllerName = 'homeController';


      $scope.resetEverything = function () {
        $scope.api = { };
        $scope.students = [];
        $scope.selected = [];

      };

      const CohortAPI = $resource('/cohorts/:cohort', {cohort:'@cohort'});
      $scope.cohorts = CohortAPI.query();

      $scope.resetEverything();

      $scope.importNames = function () {
        $scope.students = CohortAPI.query({cohort: $scope.cohort});
      };


      $scope.selectStudent = function () {
        if ($scope.students.length) {
          var index = Math.floor(Math.random() * ($scope.students.length - 1));
          $scope.selected.unshift($scope.removeMember(index));
        }
      };

      $scope.clearRSVPS = function () {
        $scope.students = [];
      };

      $scope.removeMember = function (index) {
        return $scope.students.splice(index, 1)[0];
      };

      $scope.removeEvent = function (index) {
        return $scope.events.splice(index, 1)[0];
      };

    }
  ]);