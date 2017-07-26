/* eslint-env jasmine */

'use strict'

const path = require('path')
const Pair = require(path.resolve('pairs/pair'))

const makePairs = require(path.resolve('pairs/makePairs'))

describe('Given a MakePairs function', () => {
  describe('When given', () => {
    it('no parameters Then throw "No Students" error', () => {
      expect(makePairs).toThrowError('No students')
    })
    it('empty students array Then throw "No Students" error', () => {
      function emptyStudentsArray () {
        makePairs([])
      }

      expect(emptyStudentsArray).toThrowError('No students')
    })
  })

  fdescribe('When given an even number of students', () => {
    describe('AND no previous pairing', () => {
      it('AND exactly two students, Then return one pair', () => {
        const pairList = makePairs(['Jay', 'Thomas'])
        expect(pairList.length).toEqual(1)
        expect(pairList).toEqual([new Pair('Jay', 'Thomas')])
      })
      it('AND exactly four students, Then return two pairs', () => {
        const pairList = makePairs(['Jay', 'Thomas', 'James', 'Fred'])
        expect(pairList.length).toEqual(2)
        expect(new Pair('Thomas', 'Jay').inArray(pairList)).toEqual(true)
        expect(new Pair('Fred', 'James').inArray(pairList)).toEqual(true)
      })
      it('AND an even  number of students AND one previous pairing, Then return two pairs in order of cohort with no duplicate pairs', () => {
        const pairList = makePairs(['Jay', 'Thomas', 'James', 'Fred'], [{
          members: ['Jay', 'Thomas']
        }])
        expect(pairList.length).toEqual(2)
        expect(new Pair('Jay', 'James').inArray(pairList)).toEqual(true)
        expect(new Pair('Thomas', 'Fred').inArray(pairList)).toEqual(true)
      })

      it('AND an even number of students in a different order AND one previous pairing, Then return two pairs in order of cohort with no duplicate pairs', () => {
        const cohort = ['Jay', 'Thomas', 'Fred', 'James']
        const pairList = makePairs(cohort, [{
          members: ['Jay', 'Thomas']
        }])

        expect(pairList.length).toEqual(2)
        expect(new Pair('Jay', 'Fred').inArray(pairList)).toEqual(true)
        expect(new Pair('Thomas', 'James').inArray(pairList)).toEqual(true)
      })

      it('AND an even number of students in a different order AND one previous pairing, Then return two pairs in order of cohort with no duplicate pairs', () => {
        const cohort = ['Jay', 'Jenny', 'Thomas', 'James']
        const pairList = makePairs(cohort, [{
          members: ['Jay', 'Thomas']
        }])

        expect(pairList.length).toEqual(2)
        expect(new Pair('Jay', 'Jenny').inArray(pairList)).toEqual(true)
        expect(new Pair('Thomas', 'James').inArray(pairList)).toEqual(true)
      })

      it('AND an even number of students in a different order AND one previous pairing, Then return two pairs in order of cohort with no duplicate pairs', () => {
        const cohort = ['Jay', 'Jenny', 'Thomas', 'James', 'Dan', 'Alex']
        const pairList = makePairs(cohort, [{
          members: ['Jay', 'Jenny']
        }])

        expect(pairList.length).toEqual(3)
        expect(new Pair('Jay', 'Thomas').inArray(pairList)).toEqual(true)
        expect(new Pair('Jenny', 'James').inArray(pairList)).toEqual(true)
        expect(new Pair('Dan', 'Alex').inArray(pairList)).toEqual(true)
      })

      it('AND an even number of students in a different order AND one previous pairing, Then return two pairs in order of cohort with no duplicate pairs', () => {
        const cohort = ['Jay', 'Jenny', 'Thomas', 'James', 'Dan', 'Alex']
        const previousPairs = [{
          members: ['Jay', 'Jenny']
        }, {
          members: ['Jenny', 'Thomas']
        }, {
          members: ['Jenny', 'James']
        }]
        const pairList = makePairs(cohort, previousPairs)

        expect(pairList.length).toEqual(3)
        expect(new Pair('Jay', 'Thomas').inArray(pairList)).toEqual(true)
        expect(new Pair('Jenny', 'Dan').inArray(pairList)).toEqual(true)
        expect(new Pair('James', 'Alex').inArray(pairList)).toEqual(true)
      })

      it('if there is no possible match, return a duplicate using the last member in the cohort', () => {
        const cohort = ['James', 'Jenny', 'Thomas', 'Jay']
        const previousPairs = [{
          members: ['James', 'Jenny']
        }, {
          members: ['James', 'Thomas']
        }, {
          members: ['James', 'Jay']
        }]
        const pairList = makePairs(cohort, previousPairs)

        expect(pairList.length).toEqual(2)
        expect(new Pair('James', 'Jenny').inArray(pairList)).toEqual(true)
        expect(new Pair('Thomas', 'Jay').inArray(pairList)).toEqual(true)
      })

      it('if there is an odd number of students, should return a triple', () => {
        const cohort = ['James', 'Jenny', 'Thomas']
        const pairList = makePairs(cohort)

        expect(pairList.length).toEqual(1)
        expect(new Pair('James', 'Jenny', 'Thomas').inArray(pairList)).toEqual(true)
      })

      it('if there are duplicate students in the input array, duplicate should not be matched twice', () => {
        // the first 'James' get's filtered out immediately so Jenny is matched first
        const cohort = ['James', 'Jenny', 'Thomas', 'Fred', 'James']
        const pairList = makePairs(cohort)

        expect(pairList.length).toEqual(2)
        expect(new Pair('Jenny', 'Thomas').inArray(pairList)).toEqual(true)
        expect(new Pair('Fred', 'James').inArray(pairList)).toEqual(true)
      })

      it('if there are triple past pairs and there is no match left, past pairing is ignored', () => {
        const cohort = ['James', 'Jenny', 'Thomas', 'Fred', 'Jay']
        const previousPairs = [{
          members: ['James', 'Jenny', 'Thomas']
        }, {
          members: ['James', 'Fred']
        }, {
          members: ['James', 'Jay', 'Jane']
        }]

        const pairList = makePairs(cohort, previousPairs)

        expect(pairList.length).toEqual(2)
        expect(new Pair('James', 'Jenny').inArray(pairList)).toEqual(true)
        expect(new Pair('Thomas', 'Fred').inArray(pairList)).toEqual(true)
      })
      it('if there are triple past pairs and there is no match left, past pairing is ignored', () => {
        const cohort = ['James', 'Jenny', 'Thomas', 'Fred', 'Danny']
        const previousPairs = [{
          members: ['James', 'Jenny', 'Thomas']
        }, {
          members: ['James', 'Fred']
        }, {
          members: ['James', 'Jay']
        }]

        const pairList = makePairs(cohort, previousPairs)

        expect(pairList.length).toEqual(2)
        expect(new Pair('James', 'Danny').inArray(pairList)).toEqual(true)
        expect(new Pair('Jenny', 'Fred', 'Thomas').inArray(pairList)).toEqual(true)
      })
      it('if there are no matches left, select from remaining students (otherwise duplicates can happen)', () => {
        const cohort = ['James', 'Jenny', 'Thomas', 'Fred', 'Danny']
        const previousPairs = [{
          members: ['James', 'Jenny', 'Thomas']
        }, {
          members: ['James', 'Fred']
        }, {
          members: ['James', 'Jay']
        }, {
          members: ['James', 'Danny']
        }]

        const pairList = makePairs(cohort, previousPairs)

        expect(pairList.length).toEqual(2)
        expect(new Pair('James', 'Jenny').inArray(pairList)).toEqual(true)
        expect(new Pair('Danny', 'Fred', 'Thomas').inArray(pairList)).toEqual(true)
      })
      it('if there are duplicates in the input array and no matches left, select from remaining students without duplication', () => {
        // the first 'James' get's filtered out immediately so Jenny is matched first
        const cohort = ['James', 'Jenny', 'Thomas', 'Fred', 'James']
        const previousPairs = [{
          members: ['James', 'Jenny', 'Thomas']
        }, {
          members: ['James', 'Fred']
        }, {
          members: ['James', 'Jay']
        }, {
          members: ['James', 'Danny']
        }]

        const pairList = makePairs(cohort, previousPairs)

        expect(pairList.length).toEqual(2)
        expect(new Pair('Jenny', 'Fred').inArray(pairList)).toEqual(true)
        expect(new Pair('Thomas', 'James').inArray(pairList)).toEqual(true)
      })
    })
  })
})
