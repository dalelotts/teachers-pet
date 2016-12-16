angular.module('apot.pairsController', ['ngResource'])
  .controller('pairsController', [
    '$scope',
    '$resource',
    '$q',
    function($scope, $resource) {
      'use strict'

      const CohortAPI = $resource('/cohorts/:cohort', {
        cohort: '@cohort'
      })

      const PairAPI = $resource('/cohorts/:cohort/pairs/:pair', {
        cohort: '@cohort',
        pair: '@pair'
      })

      $scope.controllerName = 'pairsController'
      $scope.savePairs = savePairs
      $scope.generatePairs = generatePairs
      $scope.cohorts = CohortAPI.query()

      $scope.$watch(
        () => {
          return $scope.cohort
        },
        (newValue, oldValue) => {
          if (newValue !== oldValue) {
            delete $scope.pairs
          }
        }
      )

      function generatePairs() {
        $scope.pairs = PairAPI.query({
          cohort: $scope.cohort,
          pair: 'new'
        })
      }

      function savePairs() {
        const SavePairs = $resource(`/cohorts/${$scope.cohort}/pairs/`, {}, {
          save: {
            method: 'POST',
            isArray: true
          }
        })
        SavePairs.save($scope.pairs, (response) => {
            console.log(response)
            alert('Saved ' + response.length + ' pairs')
          }, (err) => {
            console.log(err)
            alert('Error ' + err)
          })
      }
    }
  ])