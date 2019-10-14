const makePairs = require('./makePairs')

expect.extend({
  toEqualPairs (actualPairs, expectedPairs) {
    return expectedPairs
      .reduce((accumulator, expected) => {
        if (accumulator.pass) {
          const actual = actualPairs.filter(actualPair => actualPair.members.every(member => expected.members.includes(member)))[0]

          if (!actual) {
            return {
              pass: false,
              message: () => `No match for expected pair ${JSON.stringify(expected)} in actual ${JSON.stringify(actualPairs)}`
            }
          }

          const actualMembers = [...actual.members].sort()
          const expectedMembers = [...expected.members].sort()

          if (!this.equals(actualMembers, expectedMembers)) {
            return {
              pass: false,
              message: () => `Received ${actualMembers}, expected ${expectedMembers}`
            }
          }

          if (!this.equals(actual.possibleDuplicate, expected.possibleDuplicate)) {
            return {
              pass: false,
              message: () => `possibleDuplicate does not match ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`
            }
          }
        }
        return accumulator
      },
      {
        pass: true,
        message: () => ''
      })
  }
})

const firstPossiblePairMatcher = (name, possiblePairs) => {
  return possiblePairs[0]
}

describe('make pairs', () => {
  describe('null', () => {
    it('students throws exception ', () => {
      expect.assertions(1)
      expect(() => makePairs()).toThrow(new Error('Must be at least two students: Received undefined'))
    })
  })

  describe('zero students', () => {
    it('throws exception', () => {
      expect.assertions(1)
      expect(() => makePairs([])).toThrow(new Error('Must be at least two students: Received '))
    })
  })
  describe('1 student', () => {
    it('throws "Must be at least two students"', () => {
      expect.assertions(1)
      const students = ['Bob']

      expect(() => makePairs(students)).toThrow(new Error('Must be at least two students: Received Bob'))
    })
  })
  describe('2 students', () => {
    it('no previous pairing returns a pair', () => {
      expect.assertions(1)
      const students = ['dale', 'jefe']
      const expected = [{ members: ['dale', 'jefe'], possibleDuplicate: false }]

      const actual = makePairs(students, [], firstPossiblePairMatcher)

      expect(actual).toStrictEqual(expected)
    })

    it('with previous pairing returns a pair', () => {
      expect.assertions(1)
      const students = ['Heather', 'Cotton']
      const expected = [{ members: ['Cotton', 'Heather'], possibleDuplicate: true }]

      const actual = makePairs(
        students,
        [{ members: ['Cotton', 'Heather'] }],
        firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })
  })
  describe('3 students', () => {
    it('no previous pairing returns 1 pair o\'3', () => {
      expect.assertions(1)
      const students = [
        'Felicia',
        'Ina',
        'Alvarez'
      ]
      const expected = [
        { members: ['Felicia', 'Ina', 'Alvarez'], possibleDuplicate: false }
      ]

      const actual = makePairs(students, [], firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })
  })
  describe('4 students', () => {
    it('no previous pairing returns 2 pair', () => {
      expect.assertions(1)
      const students = [
        'Sharon',
        'Alexandria',
        'Farrell',
        'Washington'
      ]
      const expected = [
        { members: ['Sharon', 'Alexandria'], possibleDuplicate: false },
        { members: ['Farrell', 'Washington'], possibleDuplicate: false }
      ]

      const actual = makePairs(students, [], firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })

    it('different students with no previous pairing returns 2 pair', () => {
      expect.assertions(1)
      const students = [
        'Beatriz',
        'Kelley',
        'Amalia',
        'Leanna'
      ]
      const expected = [
        { members: ['Beatriz', 'Kelley'], possibleDuplicate: false },
        { members: ['Amalia', 'Leanna'], possibleDuplicate: false }
      ]

      const actual = makePairs(students, [], firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })

    it('with one previous pairing returns 2 unique pairs', () => {
      expect.assertions(1)
      const students = [
        'Priscilla',
        'Talley',
        'Vilma',
        'Mueller'
      ]

      const previousPairs = [
        { members: ['Priscilla', 'Talley'] }
      ]

      const expected = [
        { members: ['Priscilla', 'Vilma'], possibleDuplicate: false },
        { members: ['Talley', 'Mueller'], possibleDuplicate: false }
      ]

      const actual = makePairs(students, previousPairs, firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })
    it('with three previous pairing returns 2 duplicate pairs', () => {
      expect.assertions(1)
      const students = [
        'Priscilla',
        'Talley',
        'Vilma',
        'Mueller'
      ]

      const previousPairs = [
        { members: ['Priscilla', 'Talley'] },
        { members: ['Priscilla', 'Vilma'] },
        { members: ['Priscilla', 'Mueller'] },
        { members: ['Talley', 'Vilma'] },
        { members: ['Talley', 'Mueller'] },
        { members: ['Vilma', 'Mueller'] }
      ]

      const expected = [
        { members: ['Priscilla', 'Talley'], possibleDuplicate: true },
        { members: ['Vilma', 'Mueller'], possibleDuplicate: true }
      ]

      const actual = makePairs(students, previousPairs, firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })
    it('with three previous pairing returns 2 different unique pairs', () => {
      expect.assertions(1)
      const students = [
        'Priscilla',
        'Talley',
        'Vilma',
        'Mueller',
        'Jolene'
      ]

      const previousPairs = [
        { members: ['Priscilla', 'Talley'] },
        { members: ['Priscilla', 'Vilma'] },
        { members: ['Priscilla', 'Mueller'] },
        { members: ['Talley', 'Vilma'] },
        { members: ['Talley', 'Mueller'] },
        { members: ['Vilma', 'Mueller'] }
      ]

      const expected = [
        { members: ['Priscilla', 'Jolene'], possibleDuplicate: false },
        { members: ['Talley', 'Vilma', 'Mueller'], possibleDuplicate: false }
      ]

      const actual = makePairs(students, previousPairs, firstPossiblePairMatcher)

      expect(actual).toEqualPairs(expected)
    })
  })
})
