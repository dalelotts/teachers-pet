angular.module('apot.retroController', ['ngResource'])
  .controller('retroController', [
    '$scope',
    '$resource',
    '$q',
    function ($scope, $resource) {
      'use strict';
      $scope.controllerName = 'retroController';
      $scope.saveSelectedStudent = saveSelectedStudent;


      const CohortAPI = $resource('/cohorts/:cohort', {cohort:'@cohort'});
      $scope.cohorts = CohortAPI.query();

      const RetroAPI = $resource('/cohorts/:cohort/retro/:retro', {
        cohort: '@cohort',
        retro: '@retro'
      })

      $scope.selectStudent = function () {
        $scope.student = RetroAPI.get({
          cohort: $scope.cohort,
          retro: 'new'
        })
      }

      function saveSelectedStudent() {
        const SaveRetro = $resource(`/cohorts/${$scope.cohort}/retro/`)

        SaveRetro.save($scope.student, (response) => {
          console.log(response)
          alert('Saved ')
        }, (err) => {
          console.log(err)
          alert('Error ' + err)
        })
      }
    }
  ]);
