angular.module('apot.homeController', ['ngResource'])
  .controller('homeController', [
    '$scope',
    '$resource',
    '$q',
    function ($scope, $resource, $q) {
      'use strict';
      $scope.controllerName = 'homeController';


      $scope.resetEverything = function () {
        $scope.api = { };
        $scope.rsvps = [];
        $scope.selected = [];

      };

      $scope.resetEverything();

      var RsvpAPI = $resource('/rsvps');

      $scope.importNames = function () {
        $scope.rsvps = RsvpAPI.query({event_id: event.event_id, key: $scope.api.key});
      };


      $scope.selectRSVP = function () {
        if ($scope.rsvps.length) {
          var index = Math.floor(Math.random() * ($scope.rsvps.length - 1));
          $scope.selected.unshift($scope.removeMember(index));
        }
      };

      $scope.clearRSVPS = function () {
        $scope.rsvps = [];
      };

      $scope.removeMember = function (index) {
        return $scope.rsvps.splice(index, 1)[0];
      };

      $scope.removeEvent = function (index) {
        return $scope.events.splice(index, 1)[0];
      };

    }
  ]);