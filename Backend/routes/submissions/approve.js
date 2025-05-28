// pages/api/submissions/approve/[id].js
import { MongoClient, ObjectId } from 'mongodb';
import cloudinary from 'cloudinary';
import nodemailer from 'nodemailer';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { id } = req.query;
  
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const submissionsCollection = db.collection('submissions');
    const resourcesCollection = db.collection('resources');
    
    // Find the submission
    const submission = await submissionsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!submission) {
      client.close();
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Make the Cloudinary file publicly accessible
    await cloudinary.v2.uploader.update(submission.filePublicId, {
      access_mode: 'public',
    });
    
    // Create a resource from the submission
    const resource = {
      title: submission.title,
      description: submission.description,
      category: submission.category,
      tags: submission.tags,
      fileUrl: submission.fileUrl,
      filePublicId: submission.filePublicId,
      authorName: submission.authorName,
      authorEmail: submission.authorEmail,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Save the resource
    await resourcesCollection.insertOne(resource);
    
    // Update the submission status
    await submissionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'approved', updatedAt: new Date() } }
    );
    
    // Send approval email to the author
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: submission.authorEmail,
      subject: 'Your submission has been approved',
      html: `
        <h1>Good news!</h1>
        <p>Your submission "${submission.title}" has been approved and is now available on our platform.</p>
        <p>Thank you for contributing to our college resources!</p>
      `,
    });
    
    client.close();
    
    return res.status(200).json({ message: 'Submission approved successfully' });
  } catch (error) {
    console.error('Error approving submission:', error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}