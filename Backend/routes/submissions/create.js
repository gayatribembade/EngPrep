// pages/api/submissions/create.js
import { MongoClient } from 'mongodb';
import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';
import { WebSocketServer } from 'ws';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB connection
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// This is needed to disable the default body parsing in Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Create a connection to WebSocket clients (admins)
let wss;
if (!global.wss) {
  global.wss = new WebSocketServer({ noServer: true });
  wss = global.wss;
} else {
  wss = global.wss;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Parse the form data with formidable
  const form = new IncomingForm();
  
  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });
    
    // Upload the file to Cloudinary (but don't make it public yet)
    const file = files.file;
    const cloudinaryUpload = await cloudinary.v2.uploader.upload(file.filepath, {
      resource_type: 'auto',
      public_id: `pending_${Date.now()}`,
      access_mode: 'authenticated',
      type: 'upload',
    });

    // Create the submission record
    const submission = {
      title: fields.title,
      description: fields.description,
      category: fields.category,
      tags: fields.tags ? fields.tags.split(',').map(tag => tag.trim()) : [],
      authorName: fields.authorName,
      authorEmail: fields.authorEmail,
      fileUrl: cloudinaryUpload.secure_url,
      filePublicId: cloudinaryUpload.public_id,
      status: 'pending', // pending, approved, rejected
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Save to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const submissionsCollection = db.collection('submissions');
    
    const result = await submissionsCollection.insertOne(submission);
    client.close();
    
    // Notify admins via WebSocket
    const notificationData = {
      type: 'new_submission',
      submissionId: result.insertedId.toString(),
      title: submission.title,
      category: submission.category,
      authorName: submission.authorName
    };
    
    wss.clients.forEach(client => {
      if (client.readyState === 1) { // OPEN
        client.send(JSON.stringify(notificationData));
      }
    });
    
    return res.status(201).json({
      message: 'Submission created successfully',
      submissionId: result.insertedId
    });
    
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}