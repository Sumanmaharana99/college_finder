const express = require('express');
const router = express.Router();
const { getColleges, getCollegeById, compareColleges } = require('../controllers/collegeController');

router.get('/', getColleges);
router.get('/:id', getCollegeById);

module.exports = router;
