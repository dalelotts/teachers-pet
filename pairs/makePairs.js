'use strict'

const Pair = require('./pair')

function makePairs (students, allPreviousPairs) {
  if (!(students && students.length)) {
    throw new Error('No students')
  }

  if (!(allPreviousPairs && allPreviousPairs.length)) {
    allPreviousPairs = []
  }

  students = students.filter(removeDuplicates)

  if (students.length <= 3) {
    return [(new Pair(...students))]
  }

  return students.reduce(studentsToPairs(allPreviousPairs), [])
}

function findPreviouslyPairedStudents (currentStudent, allPreviousPairs) {
  // You may be tempted sort the list first!! Don't! It will break the algorithm.
  return allPreviousPairs
    .filter((pair) => pair.members.indexOf(currentStudent) > -1)
    .reduce(pairsToStudents, [])
    .filter(removeDuplicates) // optimization not under test - tests will not fail if removed
    .filter((student) => student !== currentStudent)
}

function makePairForStudent (currentStudent, previousPairs, students) {
  const possiblePairs = students
    .filter((student) => student !== currentStudent)
    .filter((student) => previousPairs.indexOf(student) === -1)

  if (students.length <= 3) {
    const pair = new Pair(...students);
    pair.possibleDuplicate = possiblePairs.length === 0;
    return pair
  }

  const secondMember = possiblePairs.length ? possiblePairs[0] : students[1]

  const pair = new Pair(currentStudent, secondMember);

  const previousPairing = previousPairs.filter((student) => student === secondMember)
  pair.possibleDuplicate = previousPairing.length !== 0;
  return pair
}

function pairsToStudents (students, pair) {
  return students.concat(pair.members)
}

function removeDuplicates (student, index, source) {
  return source.indexOf(student, index + 1) === -1
}

function studentsToPairs (allPreviousPairs) {
  return function reducer (pairs, currentStudent, index, allStudents) {
    const pairedStudents = pairs.reduce(pairsToStudents, [])

    if (pairedStudents.indexOf(currentStudent) === -1) {
      const previouslyPairedStudents = findPreviouslyPairedStudents(currentStudent, allPreviousPairs)
      const unPairedStudents = allStudents.filter((student) => pairedStudents.indexOf(student) === -1)
      const newPair = makePairForStudent(currentStudent, previouslyPairedStudents, unPairedStudents)
      pairs.push(newPair)
    }

    return pairs
  }
}

module.exports = makePairs
