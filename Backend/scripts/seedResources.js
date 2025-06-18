import mongoose from 'mongoose';
import Resource from '../models/resourceModel.js';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/collageresource')
  .then(() => console.log('MongoDB Connected'.green.bold))
  .catch(err => {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  });

// Sample resources data
const resources = [
  {
    title: 'Computer Science Fundamentals',
    description: 'Comprehensive notes covering basic computer science concepts',
    branch: 'Computer Science',
    year: 'First Year',
    type: 'Notes',
    semester: 'Semester 1',
    subject: 'Introduction to Computer Science',
    courseCode: 'CS101',
    professor: 'Dr. Smith',
    fileUrl: 'https://example.com/files/cs-fundamentals.pdf',
    tags: ['programming', 'algorithms', 'data structures'],
    keywords: ['computer science', 'programming', 'fundamentals']
  },
  {
    title: 'Data Structures and Algorithms',
    description: 'Complete guide to data structures with implementation examples',
    branch: 'Computer Science',
    year: 'Second Year',
    type: 'Notes',
    semester: 'Semester 3',
    subject: 'Data Structures',
    courseCode: 'CS201',
    professor: 'Dr. Johnson',
    fileUrl: 'https://example.com/files/data-structures.pdf',
    tags: ['data structures', 'algorithms', 'complexity'],
    keywords: ['DSA', 'algorithms', 'complexity analysis']
  },
  {
    title: 'Database Management Systems',
    description: 'Notes on database design, normalization and SQL',
    branch: 'Information Technology',
    year: 'Second Year',
    type: 'Notes',
    semester: 'Semester 4',
    subject: 'Database Systems',
    courseCode: 'IT205',
    professor: 'Prof. Williams',
    fileUrl: 'https://example.com/files/dbms.pdf',
    tags: ['database', 'SQL', 'normalization'],
    keywords: ['DBMS', 'SQL', 'database design']
  },
  {
    title: 'Operating Systems Previous Year Questions',
    description: 'Collection of past exam questions for Operating Systems course',
    branch: 'Computer Science',
    year: 'Third Year',
    type: 'PYQS',
    semester: 'Semester 5',
    subject: 'Operating Systems',
    courseCode: 'CS301',
    professor: 'Dr. Brown',
    fileUrl: 'https://example.com/files/os-pyqs.pdf',
    tags: ['operating systems', 'exams', 'questions'],
    keywords: ['OS', 'process management', 'memory management']
  },
  {
    title: 'Computer Networks Textbook',
    description: 'Comprehensive textbook covering all aspects of computer networks',
    branch: 'Computer Science',
    year: 'Third Year',
    type: 'Books',
    semester: 'Semester 6',
    subject: 'Computer Networks',
    courseCode: 'CS302',
    professor: 'Dr. Davis',
    fileUrl: 'https://example.com/files/networks.pdf',
    tags: ['networks', 'protocols', 'OSI model'],
    keywords: ['TCP/IP', 'routing', 'switching']
  }
];

// Seed function
const seedResources = async () => {
  try {
    // Clear existing resources
    await Resource.deleteMany({});
    console.log('Resources cleared'.yellow);

    // Get a user to associate with resources
    const user = await User.findOne();
    
    if (!user) {
      console.log('No users found. Please create a user first.'.red);
      process.exit(1);
    }

    // Add user ID to each resource
    const resourcesWithUser = resources.map(resource => ({
      ...resource,
      user: user._id
    }));

    // Insert resources
    await Resource.insertMany(resourcesWithUser);
    console.log('Sample resources added successfully'.green.bold);

    console.log('Database seeded!'.blue.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

seedResources(); 