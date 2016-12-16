'use strict'

class Pair {
  constructor (...members) {
    if (members.length === 0) {
      throw new Error('No pair members specified.')
    }
    if (members.length < 2) {
      throw new Error('Must specify at least two members of a pair.')
    }

    const duplicates = members.sort().filter((member, index) => members.indexOf(member, index + 1) !== -1)

    if (duplicates.length > 0) {
      throw new Error('Duplicate members: ' + duplicates)
    }

    this.members = members
  }

  equals (otherPair) {
    if (otherPair && otherPair.members) {
      const commonMembers = this.members.filter((member) => otherPair.members.indexOf(member) > -1)
      return this.members.length === commonMembers.length
    }

    return false
  }

  inArray (pairs) {
    return !!pairs.filter((pair) => this.equals(pair)).length
  }
}

module.exports = Pair;
