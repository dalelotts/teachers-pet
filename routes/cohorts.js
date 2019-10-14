/**
 * See the file "LICENSE" for the full license governing this code.
 *
 * @author Dale "Ducky" Lotts
 * @since 9/26/16.
 */

const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const shuffle = require(path.resolve('pairs/shuffle'))
const makePairs = require(path.resolve('pairs/makePairs'))

const cohorts = require(path.resolve('data/cohorts'))

router.get('/:cohort', (req, res) => {
  res.json(cohorts[req.params.cohort])
})

router.get('/:cohort/pairs', (req, res) => {
  const pairs = require(path.resolve('data/pairs/' + req.params.cohort))
  const result = (pairs || [])
  res.json(result)
})

router.post('/:cohort/pairs', (req, res, next) => {
  const pastPairs = getPastPairs(req.params.cohort)

  const createdOn = new Date().toISOString()

  const newPairs = req.body.map((pair) => {
    pair.createdOn = createdOn
    return pair
  })

  const newPastPairs = pastPairs.concat(newPairs)

  const fileName = path.resolve('data/pairs/' + req.params.cohort + '.json')

  fs.writeFile(fileName, JSON.stringify(newPastPairs), (err) => {
    if (err) {
      return next(err)
    }
    res.json(newPairs)
  })
})

router.get('/:cohort/pairs/new', (req, res) => {
  const excludedStudents = req.query.exclude || []
  const students = cohorts[req.params.cohort]
  const shuffledStudents = shuffle(
    students
      .map((student) => student.name)
      .filter(studentName => !excludedStudents.includes(studentName))
  )
  const pastPairs = getPastPairs(req.params.cohort)
  const newPairs = makePairs(shuffledStudents, pastPairs)
  res.json(newPairs)
})

router.post('/:cohort/retro', (req, res, next) => {
  const pastPairs = getPastRetro(req.params.cohort)

  req.body.createdOn = new Date().getTime()

  const newPastRetro = pastPairs.concat(req.body)

  const fileName = path.resolve('data/retro/' + req.params.cohort + '.json')

  fs.writeFile(fileName, JSON.stringify(newPastRetro), (err) => {
    if (err) {
      return next(err)
    }
    res.json(req.body)
  })
})

router.get('/:cohort/retro/new', (req, res) => {
  const pastRetro = getPastRetro(req.params.cohort).map((student) => student.name)
  const students = cohorts[req.params.cohort]
  let filteredStudents = students.filter((student) => pastRetro.indexOf(student.name) === -1)
  if (filteredStudents.length === 0) {
    filteredStudents = students
  }
  const shuffledStudents = shuffle(filteredStudents.map((student) => student.name))
  res.json({ name: shuffledStudents[0] })
})

router.post('/:cohort/standup', (req, res, next) => {
  const pastStandUp = getPastStandup(req.params.cohort)

  req.body.createdOn = new Date().getTime()

  const newPastStandup = pastStandUp.concat(req.body)

  const fileName = path.resolve('data/standup/' + req.params.cohort + '.json')

  fs.writeFile(fileName, JSON.stringify(newPastStandup), (err) => {
    if (err) {
      return next(err)
    }
    res.json(req.body)
  })
})

router.get('/:cohort/standup/new', (req, res) => {
  const pastStandup = getPastStandup(req.params.cohort).map((student) => student.name)
  const students = cohorts[req.params.cohort]
  let filteredStudents = students.filter((student) => pastStandup.indexOf(student.name) === -1)
  if (filteredStudents.length === 0) {
    filteredStudents = students
  }
  const shuffledStudents = shuffle(filteredStudents.map((student) => student.name))
  res.json({ name: shuffledStudents[0] })
})

router.get('/:cohort/git-pairs', (req, res) => {
  let students = cohorts[req.params.cohort]

  students = students
    .sort().map((student) => {
      const initialMatches = student.name.match(/\b\w/g)
      student.initials = ((initialMatches.shift() || '') + (initialMatches.pop() || '')).toUpperCase()
      return student
    })

  res.json(students)
})

router.get('/', (req, res) => {
  res.json(Object.keys(cohorts).sort())
})

module.exports = router

function getPastPairs (cohort) {
  try {
    return require(path.resolve('data/pairs/' + cohort))
  } catch (error) {
    return []
  }
}

function getPastStandup (cohort) {
  try {
    return require(path.resolve('data/standup/' + cohort))
  } catch (error) {
    return []
  }
}

function getPastRetro (cohort) {
  try {
    return require(path.resolve('data/retro/' + cohort))
  } catch (error) {
    return []
  }
}
