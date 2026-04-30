const User = require('../models/User');
const College = require('../models/College');

// @desc    Save a college to user profile
// @route   POST /api/user/save/:id
// @access  Private
const saveCollege = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const collegeId = req.params.id;

    // Check if college exists
    const collegeExists = await College.findById(collegeId);
    if (!collegeExists) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Check if already saved
    if (user.savedColleges.includes(collegeId)) {
      return res.status(400).json({ message: 'College already saved' });
    }

    user.savedColleges.push(collegeId);
    await user.save();

    res.json({ message: 'College saved successfully', savedColleges: user.savedColleges });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's saved colleges
// @route   GET /api/user/saved
// @access  Private
const getSavedColleges = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedColleges');
    res.json(user.savedColleges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  saveCollege,
  getSavedColleges,
};
