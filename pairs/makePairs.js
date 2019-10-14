const randomMatcher = (student, possiblePairs) => {
  const index = Math.floor(Math.random() * possiblePairs.length)
  return possiblePairs[index]
}

module.exports = (students, previousPairs, matcher = randomMatcher) => {
  if (!students || students.length < 2) {
    throw new Error(`Must be at least two students: Received ${students}`)
  }

  return students.reduce((accumulator, student) => {
    const studentsInPairs = accumulator.flatMap(pair => pair.members)

    const alreadyMatched = studentsInPairs.includes(student)

    if (alreadyMatched) {
      return accumulator
    }

    const studentsNotYetPaired = students.filter(currentStudent => !studentsInPairs.includes(currentStudent))

    if (studentsNotYetPaired.length === 3) {
      return accumulator.concat({
        members: [...studentsNotYetPaired],
        possibleDuplicate: false
      })
    }

    const previouslyPairedWith = previousPairs
      .filter(pair => pair.members.includes(student))
      .flatMap(pair => pair.members)
      .filter(name => name !== student)

    const unmatchedStudents = students
      .filter(currentStudent => currentStudent !== student)
      .filter(currentStudent => !studentsInPairs.includes(currentStudent))

    let possibleDuplicate = false
    let possiblePairs = unmatchedStudents.filter(currentStudent => !previouslyPairedWith.includes(currentStudent))

    if (possiblePairs.length === 0) {
      possiblePairs = unmatchedStudents
      possibleDuplicate = true
    }

    const matchedPair = matcher(student, possiblePairs)

    return accumulator.concat({
      members: [student, matchedPair],
      possibleDuplicate
    })
  }, [])
}
