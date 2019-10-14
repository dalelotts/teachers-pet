'use strict'

const path = require('path')

const express = require('express')
const router = express.Router()

const questions = require(path.resolve('data/questions'))

router.get('/', (req, res) => {
  const subjects = req.query.subject
  res.json(questions.filter(question => subjects.includes(question.subject)))
})

router.get('/subjects', (req, res) => {
  const subjects = Object.keys(questions.reduce((accumulator, question) => {
    accumulator[question.subject] = true
    return accumulator
  }, {})).sort()

  res.json(subjects)
})

module.exports = router
