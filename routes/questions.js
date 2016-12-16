'use strict'

const path = require('path')

const express = require('express')
const router = express.Router()

const questions = require(path.resolve('data/questions'))

router.get('/', (req, res) => {
  const response = res.json(questions.filter((question) => {
    return req.query.subject ? question.subject === req.query.subject : true
  }))
  res.json(response)
})

router.get('/subjects', (req, res) => {
  const subjects = Object.keys(questions.reduce((accumulator, question) => {
    accumulator[question.subject] = true
    return accumulator
  }, {})).sort()

  res.json(subjects)
})

module.exports = router