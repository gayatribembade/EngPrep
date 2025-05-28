import File from '../models/File.js';

// Upload File Controller
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newFile = new File({
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date(),
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

// Get All Files Controller
export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving files', error });
  }
};
