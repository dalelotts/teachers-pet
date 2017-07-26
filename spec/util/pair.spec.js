'use strict'

const path = require('path')

const Pair = require(path.resolve('pairs/pair'));

describe('Given a Pair', function () {

  describe('Constructor', function () {
    it('throws exception if no members are supplied', function () {
      expect(() => new Pair()).toThrow(new Error('No pair members specified.'))
    })
    it('throws exception if fewer than members are supplied', function () {
      expect(() => new Pair('First Last')).toThrow(new Error('Must specify at least two members of a pair.'))
    })
    it('throws exception if duplicate members are supplied', function () {
      expect(() => new Pair('One', 'One')).toThrow(new Error('Duplicate members: One'))
    })
    it('throws exception if non-consecutive and multiple duplicate members are supplied', function () {
      expect(() => new Pair('One', 'Two', 'One', 'Two', 'Three')).toThrow(new Error('Duplicate members: One,Two'))
    })
  })

  describe('When compared to', function () {
   it('undefined, equals returns false', function() {
     const firstPair = new Pair('One', 'Two')
     expect(firstPair.equals(undefined)).toEqual(false)
   })
    it('null, equals returns false', function() {
      const firstPair = new Pair('One', 'Two')
      expect(firstPair.equals(null)).toEqual(false)
    })
    it('empty object, equals returns false', function() {
      const firstPair = new Pair('One', 'Two')
      expect(firstPair.equals({})).toEqual(false)
    })
    it('object with members property that is not an array, equals returns false', function() {
      const firstPair = new Pair('One', 'Two')
      expect(firstPair.equals({members: 'some string value'})).toEqual(false)
    })
  })
  describe('When compared to another pair', function () {
    it('equals returns true if both have the same two members', function () {
      const firstPair = new Pair('One', 'Two')
      const secondPair = new Pair('One', 'Two')
      expect(firstPair.equals(secondPair)).toEqual(true)
      // Test the transitive property
      expect(secondPair.equals(firstPair)).toEqual(true)
    })
    it('equals returns true if both have the same two members in different order', function () {
      const firstPair = new Pair('Two', 'One')
      const secondPair = new Pair('One', 'Two')
      expect(firstPair.equals(secondPair)).toEqual(true)
      // Test the transitive property
      expect(secondPair.equals(firstPair)).toEqual(true)
    })
    it('equals returns true if both have the same three members in different order', function () {
      const firstPair = new Pair('Three', 'Two', 'One')
      const secondPair = new Pair('Three', 'One', 'Two')
      expect(firstPair.equals(secondPair)).toEqual(true)
      // Test the transitive property
      expect(secondPair.equals(firstPair)).toEqual(true)
    })
  })
})