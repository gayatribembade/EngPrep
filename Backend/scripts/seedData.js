import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resource from '../models/resourceModel.js';
import User from '../models/userModel.js';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MongoDB Atlas Connection String
const MONGODB_URI = "mongodb+srv://gayatribembade:gayatribembade%4015@cluster0.u9c2y7p.mongodb.net/EngPrep?retryWrites=true&w=majority";

// Sample users
const users = [
  {
    username: 'admin',
    email: 'admin@engprep.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true
  },
  {
    username: 'student',
    email: 'student@engprep.com',
    password: bcrypt.hashSync('student123', 10),
    isAdmin: false
  }
];

// Sample resources
const resources = [
  {
    title: 'Data Structures and Algorithms Notes',
    description: 'Comprehensive notes covering all major data structures and algorithms topics for Computer Science students.',
    branch: 'Computer Science',
    year: 'Second Year',
    type: 'Notes',
    fileUrl: 'https://example.com/files/dsa-notes.pdf',
    tags: ['DSA', 'algorithms', 'programming', 'computer science']
  },
  {
    title: 'Digital Electronics Previous Year Questions',
    description: 'Collection of previous year exam questions for Digital Electronics course.',
    branch: 'Electronics',
    year: 'Second Year',
    type: 'PYQS',
    fileUrl: 'https://example.com/files/digital-electronics-pyqs.pdf',
    tags: ['digital', 'electronics', 'exams', 'questions']
  },
  {
    title: 'Strength of Materials Textbook',
    description: 'Complete textbook for Strength of Materials course for Mechanical Engineering students.',
    branch: 'Mechanical',
    year: 'Third Year',
    type: 'Books',
    fileUrl: 'https://example.com/files/strength-of-materials.pdf',
    tags: ['mechanical', 'materials', 'engineering', 'textbook']
  },
  {
    title: 'Web Development Project - E-commerce Platform',
    description: 'A complete web development project showcasing an e-commerce platform built with MERN stack.',
    branch: 'Information Technology',
    year: 'Fourth Year',
    type: 'Projects',
    fileUrl: 'https://example.com/files/ecommerce-project.zip',
    tags: ['web development', 'MERN', 'project', 'ecommerce']
  },
  {
    title: 'Signals and Systems Notes',
    description: 'Detailed notes on Signals and Systems for EXTC students.',
    branch: 'EXTC',
    year: 'Third Year',
    type: 'Notes',
    fileUrl: 'https://example.com/files/signals-systems.pdf',
    tags: ['signals', 'systems', 'EXTC', 'engineering']
  }
];

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Atlas Connected');
  
  try {
    // Clear existing data
    await User.deleteMany({});
    await Resource.deleteMany({});
    console.log('Data cleared');
    
    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users added');
    
    // Add user reference to resources and insert them
    const sampleResources = resources.map(resource => {
      return { 
        ...resource, 
        user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id 
      };
    });
    
    await Resource.insertMany(sampleResources);
    console.log('Resources added');
    
    console.log('Sample data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
}); 