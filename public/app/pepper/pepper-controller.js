angular.module('apot.pepperController', ['ngResource'])
  .controller('pepperController', [
    '$scope',
    '$resource',
    function ($scope, $resource) {
      'use strict';

      $scope.controllerName = 'pepperController';

      var RsvpAPI = $resource('/rsvps');
      var SubjectAPI = $resource('/subjects');
      var QuestionAPI = $resource('/questions');

      $scope.importNamesAndQuestions = importNamesAndQuestions;
      $scope.resetEverything = resetEverything;
      $scope.selectQuestion = selectQuestion;
      $scope.toggleAnswer = toggleAnswer;

      $scope.resetEverything();

      $scope.subjects = SubjectAPI.query();

      function importNamesAndQuestions () {
        $scope.rsvps = RsvpAPI.query();
        $scope.questions = QuestionAPI.query({subject: $scope.subject});
      }

      function resetEverything () {
        $scope.rsvps = [];
        $scope.questions = [];
        $scope.selected = [];
      }

      function selectQuestion () {
        if ($scope.rsvps.length && $scope.questions.length) {
          var rsvpIndex = Math.floor(Math.random() * ($scope.rsvps.length - 1));
          var questionIndex = Math.floor(Math.random() * ($scope.questions.length - 1));

          var rsvp = $scope.rsvps.splice(rsvpIndex, 1)[0];
          var question = $scope.questions.splice(questionIndex, 1)[0];
          question.name = rsvp.name;

          $scope.selected.unshift(question);
        }
      }

      function toggleAnswer (index) {
        $scope.selected[index].showAnswer = !$scope.selected[index].showAnswer
      }

    }
  ]);