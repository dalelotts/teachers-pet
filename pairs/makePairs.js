'use strict'

const Pair = require('./pair')

function makePairs (students, allPreviousPairs) {
  if (!(students && students.length)) {
    throw new Error('No students')
  }

  // To satisfy tests that pass in duplicate students, remove any duplicates before proceeding.
  students = students.filter(removeDuplicates)

  if (students.length <= 3) {
    return [(new Pair(...students))]
  }

  if (!(allPreviousPairs && allPreviousPairs.length)) {
    allPreviousPairs = []
  }

  return students.reduce(studentsToPairs(allPreviousPairs), [])
}

function studentsToPairs (allPreviousPairs) {
  return function reducer (accumulator, currentStudent, index, allStudents) {
    const matchedStudents = accumulator.reduce(pairsToStudents, [])

    if (matchedStudents.indexOf(currentStudent) === -1) {
      const previousPairs = findPreviousPairsForStudent(currentStudent, allPreviousPairs)
      const unmatchedStudents = allStudents.filter((student) => matchedStudents.indexOf(student) === -1)

      const newPair = unmatchedStudents.length <= 3
        ? new Pair(...unmatchedStudents)
        : findPairForStudent(currentStudent, previousPairs, unmatchedStudents);

      accumulator.push(newPair)
    }

    return accumulator
  }
}

function findPreviousPairsForStudent (currentStudent, allPreviousPairs) {
  // You may be tempted sort the list first!! Don't! It will break the algorithm.
  return allPreviousPairs
    .filter((pair) => pair.members.indexOf(currentStudent) > -1)
    .reduce(pairsToStudents, [])
    .filter(removeDuplicates) // optimization not under test - tests will not fail if removed
    .filter((student) => student !== currentStudent)
}

function findPairForStudent (currentStudent, previousPairs, students) {

  if (students.length <= 3) {
    return (new Pair(...students))
  }

  const possiblePairs = students
    .filter((student) => student !== currentStudent)
    .filter((student) => previousPairs.indexOf(student) === -1)

  const secondMember = possiblePairs.length ? possiblePairs[0] : students[1]

  return new Pair(currentStudent, secondMember)
}

function pairsToStudents (students, pair) {
  return students.concat(pair.members)
}

function removeDuplicates (student, index, source) {
  return source.indexOf(student, index + 1) === -1
}

module.exports = makePairs
