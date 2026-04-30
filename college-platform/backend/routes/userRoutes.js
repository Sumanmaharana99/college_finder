const express = require('express');
const router = express.Router();
const { saveCollege, getSavedColleges } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/save/:id', protect, saveCollege);
router.get('/saved', protect, getSavedColleges);

module.exports = router;
