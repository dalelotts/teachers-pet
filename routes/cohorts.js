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
const shuffle = require(path.resolve('util/shuffle'))
const makePairs = require(path.resolve('util/makePairs'))

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

  const createdOn = new Date().getTime()

  const newPairs = req.body.map((pair) => {
    pair.createdOn = createdOn
    return pair
  })

  const newPastPairs = pastPairs.concat(newPairs)

  const fileName = path.resolve('data/pairs/' + req.params.cohort + '.json')

  fs.writeFile(fileName, JSON.stringify(newPastPairs), (err) => {
    if (err) {
      next(err)
    }
    res.json(newPairs)
  })
})

router.get('/:cohort/pairs/new', (req, res, next) => {
  const students = cohorts[req.params.cohort]
  const shuffledStudents = shuffle(students.map((student) => student.name))
  const pastPairs = getPastPairs(req.params.cohort)
  const newPairs = makePairs(shuffledStudents, pastPairs)
  res.json(newPairs)
})

router.get('/', (req, res) => {
  res.json(Object.keys(cohorts).sort())
})

module.exports = router

function getPastPairs(cohort) {
  try {
    return require(path.resolve('data/pairs/' + cohort))
  } catch (error) {
    return []
  }
}