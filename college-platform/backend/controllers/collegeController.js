const College = require('../models/College');

// @desc    Get all colleges with search, filter, and pagination
// @route   GET /api/colleges
// @access  Public
const getColleges = async (req, res) => {
  try {
    const { keyword, location, maxFees, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search by name (case-insensitive)
    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by max fees
    if (maxFees) {
      query.fees = { $lte: Number(maxFees) };
    }

    const colleges = await College.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    
    const count = await College.countDocuments(query);

    res.json({
      colleges,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      totalColleges: count,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get college by ID
// @route   GET /api/colleges/:id
// @access  Public
const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (college) {
      res.json(college);
    } else {
      res.status(404).json({ message: 'College not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Compare multiple colleges
// @route   POST /api/compare
// @access  Public
const compareColleges = async (req, res) => {
  try {
    const { collegeIds } = req.body;

    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of college IDs' });
    }

    const colleges = await College.find({ _id: { $in: collegeIds } });

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getColleges,
  getCollegeById,
  compareColleges,
};
