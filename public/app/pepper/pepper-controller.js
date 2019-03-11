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
        $scope.students = CohortAPI.query({
          cohort: $scope.cohort
        })

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
          var studentIndex = Math.floor(Math.random() * ($scope.students.length - 1))
          var questionIndex = Math.floor(Math.random() * ($scope.questions.length - 1))

          var student = $scope.students.splice(studentIndex, 1)[0]
          var question = $scope.questions.splice(questionIndex, 1)[0]
          question.name = student.name

          $scope.selected.unshift(question)

          if ($scope.students.length === 0 && $scope.questions.length > 0) {
            $scope.students = CohortAPI.query({
              cohort: $scope.cohort
            })
          }
        }
      }

      function toggleAnswer (index) {
        $scope.selected[index].showAnswer = !$scope.selected[index].showAnswer
      }
    }
  ])