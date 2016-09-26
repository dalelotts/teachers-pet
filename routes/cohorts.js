/**
 * See the file "LICENSE" for the full license governing this code.
 *
 * @author Dale "Ducky" Lotts
 * @since 9/26/16.
 */
const express = require('express');
const router = express.Router();

const cohorts = require('./cohorts.json');

router.get('/:cohort', function (req, res) {
  res.json(cohorts[req.params.cohort]);
});

router.get('/', function (req, res) {
  res.json(Object.keys(cohorts).sort());
});

module.exports = router;




