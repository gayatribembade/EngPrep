// pages/api/submissions/reject/[id].js
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
  const { reason } = req.body;
  
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const submissionsCollection = db.collection('submissions');
    
    // Find the submission
    const submission = await submissionsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!submission) {
      client.close();
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Delete the file from Cloudinary
    await cloudinary.v2.uploader.destroy(submission.filePublicId);
    
    // Update the submission status
    await submissionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: 'rejected', 
          rejectionReason: reason || 'No reason provided',
          updatedAt: new Date() 
        } 
      }
    );
    
    // Send rejection email to the author
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: submission.authorEmail,
      subject: 'About your recent submission',
      html: `
        <h1>Submission Update</h1>
        <p>We've reviewed your submission "${submission.title}" and unfortunately, it doesn't meet our current requirements.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>Feel free to make the necessary changes and submit again.</p>
        <p>Thank you for your understanding!</p>
      `,
    });
    
    client.close();
    
    return res.status(200).json({ message: 'Submission rejected successfully' });
  } catch (error) {
    console.error('Error rejecting submission:', error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}