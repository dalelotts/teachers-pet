'use strict'

const Pair = require('./pair')

function makePairs (students, previousPairs) {
  if (!(students && students.length)) {
    throw new Error('No students')
  }

  // To satisfy tests that pass in duplicate students, remove any duplicates before proceeding.
  students = students.filter((student, index, source) => source.indexOf(student, index + 1) === -1)

  if (students.length <= 3) {
    return [(new Pair(...students))]
  }

  if (!(previousPairs && previousPairs.length)) {
    previousPairs = []
  }

  const firstMember = students[0]

  // You may be tempted to remove the duplicates from this list,
  // but if you do, don't sort the list first!! Is will break the algorithm.
  const firstMemberPreviousPairs = previousPairs
    .filter((pair) => pair.members.indexOf(firstMember) > -1)
    .reduce((previousPairMember, pair) => {
      return previousPairMember.concat(pair.members.filter((member) => member !== firstMember))
    }, [])

  const possiblePairs = students
    .filter((student) => student !== firstMember)
    .filter((student) => firstMemberPreviousPairs.indexOf(student) === -1)

  const secondMember = possiblePairs.length ? possiblePairs[0] : students[1]

  const currentPair = new Pair(firstMember, secondMember)

  const remainingStudents = students
    .filter((student) => currentPair.members.indexOf(student) === -1)

  return makePairs(remainingStudents, previousPairs).concat(currentPair)
}

module.exports = makePairs
