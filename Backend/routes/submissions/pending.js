// pages/api/submissions/pending.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const submissionsCollection = db.collection('submissions');
    
    const submissions = await submissionsCollection
      .find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .toArray();
    
    client.close();
    
    return res.status(200).json({
      submissions: submissions.map(sub => ({
        ...sub,
        _id: sub._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    return res.status(500).json({ message: 'An error occurred', error: error.message });
  }
}