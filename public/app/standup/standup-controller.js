angular.module('apot.standUpController', ['ngResource'])
  .controller('standUpController', [
    '$scope',
    '$resource',
    '$q',
    function ($scope, $resource) {
      'use strict';
      $scope.controllerName = 'standUpController';
      $scope.saveSelectedStudent = saveSelectedStudent;

      const CohortAPI = $resource('/cohorts/:cohort', {cohort:'@cohort'});
      const StandupAPI = $resource('/cohorts/:cohort/standup/:standUp', {
        cohort: '@cohort',
        standUp: '@standUp'
      })

      $scope.cohorts = CohortAPI.query();
      $scope.selectStudent = function () {
        $scope.student = StandupAPI.get({
          cohort: $scope.cohort,
          standUp: 'new'
        })
      }

      function saveSelectedStudent() {
        const SaveAPI = $resource(`/cohorts/${$scope.cohort}/standup/`)

        SaveAPI.save($scope.student, (response) => {
          console.log(response)
          alert('Saved ')
        }, (err) => {
          console.log(err)
          alert('Error ' + err)
        })
      }
    }
  ]);
