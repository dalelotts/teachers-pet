angular.module('apot.pepperController', ['ngResource'])
  .controller('pepperController', [
    '$scope',
    '$resource',
    function ($scope, $resource) {
      'use strict'

      $scope.controllerName = 'pepperController'

      var CohortAPI = $resource('/cohorts/:cohort', {
        cohort: '@cohort'
      })
      var SubjectAPI = $resource('/questions/subjects')
      var QuestionAPI = $resource('/questions/')

      $scope.importNamesAndQuestions = importNamesAndQuestions
      $scope.resetEverything = resetEverything
      $scope.selectQuestion = selectQuestion
      $scope.toggleAnswer = toggleAnswer

      $scope.resetEverything()

      $scope.subjects = SubjectAPI.query()
      $scope.cohorts = CohortAPI.query()

      function importNamesAndQuestions () {
        CohortAPI.query({
          cohort: $scope.cohort
        }).$promise.then((students) => {
          var selectedNames = $scope.selected.map((question) => question.name);
          console.log(selectedNames);
          var result =  students.filter((student) => selectedNames.indexOf(student.name) === -1);
          console.log(result);
          $scope.students = result;
        });

        $scope.questions = QuestionAPI.query({
          subject: $scope.subject
        })
      }

      function resetEverything () {
        $scope.students = []
        $scope.questions = []
        $scope.selected = []
      }

      function selectQuestion () {
        if ($scope.students.length && $scope.questions.length) {
          var rsvpIndex = Math.floor(Math.random() * ($scope.students.length - 1))
          var questionIndex = Math.floor(Math.random() * ($scope.questions.length - 1))

          var rsvp = $scope.students.splice(rsvpIndex, 1)[0]
          var question = $scope.questions.splice(questionIndex, 1)[0]
          question.name = rsvp.name

          $scope.selected.unshift(question)
        }
      }

      function toggleAnswer (index) {
        $scope.selected[index].showAnswer = !$scope.selected[index].showAnswer
      }
    }
  ])