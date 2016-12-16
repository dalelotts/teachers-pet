'use strict'

const makePairs = require('./makePairs')
const path = require('path')
const fs = require('fs')

function main () {

  const cohortName = process.argv[2]

  if (!cohortName || cohortName.length === 0) {
    throw new Error("No cohort name specified")
  }

  console.log('cohot', cohortName)

  const cohort = require(path.resolve(path.join('data','cohorts.json')))[cohortName]
  const shuffledCohort = shuffle(cohort.map((student) => student.name))

  const pastPairs = require(path.resolve('data/pastPairs.json'))[cohortName]

  const pairs = makePairs(shuffledCohort, pastPairs)

  const timeStamp = new Date().getTime();
  const fileName = path.join(path.resolve('data'), cohortName + '.' + timeStamp + '.json')
  fs.writeFile(fileName, JSON.stringify(pairs), (err) => {
    if (err) throw err;
    console.log(fileName, 'is saved!');
  })
}


main()

// Fisher–Yates Shuffle
function shuffle (array) {
  let remainingMembers = array.length
  let member
  let index;

  // While there remain elements to shuffle…
  while (remainingMembers) {

    // Pick a remaining element…
    index = Math.floor(Math.random() * remainingMembers--);

    // And swap it with the current element.
    member = array[remainingMembers];
    array[remainingMembers] = array[index];
    array[index] = member;
  }

  return array;
}

