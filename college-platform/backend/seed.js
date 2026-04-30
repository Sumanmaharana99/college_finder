require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const College = require('./models/College');

const colleges = [
  {
    name: 'Stanford University',
    location: 'Stanford, California',
    fees: 56169,
    rating: 4.9,
    courses: ['Computer Science', 'Engineering', 'Business', 'Law'],
    placementPercentage: 96,
    description: 'Stanford University is a private research university in Stanford, California. It is known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world\'s top universities.'
  },
  {
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts',
    fees: 55878,
    rating: 5.0,
    courses: ['Computer Science', 'Mechanical Engineering', 'Mathematics', 'Physics'],
    placementPercentage: 98,
    description: 'MIT is a private land-grant research university in Cambridge, Massachusetts. The institute has an urban campus that extends more than a mile alongside the Charles River.'
  },
  {
    name: 'Harvard University',
    location: 'Cambridge, Massachusetts',
    fees: 54002,
    rating: 4.8,
    courses: ['Law', 'Business', 'Medicine', 'Liberal Arts'],
    placementPercentage: 94,
    description: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636 as Harvard College and named for its first benefactor, the Puritan clergyman John Harvard.'
  },
  {
    name: 'University of California, Berkeley',
    location: 'Berkeley, California',
    fees: 44008,
    rating: 4.7,
    courses: ['Computer Science', 'Electrical Engineering', 'Economics', 'Data Science'],
    placementPercentage: 92,
    description: 'The University of California, Berkeley is a public land-grant research university in Berkeley, California. Established in 1868 as the state\'s first land-grant university, it is the founding campus of the University of California system.'
  },
  {
    name: 'California Institute of Technology (Caltech)',
    location: 'Pasadena, California',
    fees: 58638,
    rating: 4.9,
    courses: ['Physics', 'Astronomy', 'Chemical Engineering', 'Computer Science'],
    placementPercentage: 97,
    description: 'Caltech is a private research university in Pasadena, California. The university is known for its strength in science and engineering, and is one among a small group of institutes of technology in the United States.'
  },
  {
    name: 'Princeton University',
    location: 'Princeton, New Jersey',
    fees: 56010,
    rating: 4.8,
    courses: ['Public Policy', 'Economics', 'Computer Science', 'History'],
    placementPercentage: 95,
    description: 'Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746 in Elizabeth as the College of New Jersey, Princeton is the fourth-oldest institution of higher education in the United States.'
  },
  {
    name: 'Indian Institute of Technology Bombay (IIT Bombay)',
    location: 'Mumbai, Maharashtra, India',
    fees: 3000,
    rating: 4.7,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Mathematics'],
    placementPercentage: 94,
    description: 'IIT Bombay is one of India\'s premier engineering institutes, known for strong technical education, research, and industry connections. It is part of the Indian Institutes of Technology system and consistently ranks among the top engineering schools in Asia.'
  },
  {
    name: 'Indian Institute of Science (IISc)',
    location: 'Bengaluru, Karnataka, India',
    fees: 2500,
    rating: 4.6,
    courses: ['Physics', 'Computer Science', 'Biological Sciences', 'Aerospace Engineering'],
    placementPercentage: 92,
    description: 'IISc Bangalore is India\'s leading research university, especially strong in science and engineering. It offers postgraduate and doctoral programs and is renowned for its research output and academic rigor.'
  },
  {
    name: 'All India Institute of Medical Sciences (AIIMS)',
    location: 'New Delhi, India',
    fees: 500,
    rating: 4.5,
    courses: ['Medicine', 'Nursing', 'Biomedical Engineering', 'Medical Research'],
    placementPercentage: 90,
    description: 'AIIMS Delhi is India\'s top medical school, recognized for excellence in medical education, research, and patient care. It is among the most competitive institutions in India for health sciences.'
  }
];

const importData = async () => {
  try {
    await connectDB();

    await College.deleteMany(); // Clear existing
    console.log('Existing colleges cleared');

    await College.insertMany(colleges);
    console.log('Colleges imported successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
