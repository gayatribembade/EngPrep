// import express from "express";
// import express from "express";

// import File from "../models/File.js"; // Import the schema

// const router = express.Router();

// // 🟢 API to Fetch All Files
// router.get("/", async (req, res) => {
//   try {
//     const files = await File.find({});
//     res.json({ success: true, data: files });
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     res.status(500).json({ success: false, message: "Error fetching files" });
//   }
// });

///////////////////////// no use
// 🟢 API to Fetch Files Based on Filters (Subject, Year, Branch, Semester)
// router.get("/search", async (req, res) => {
//   const { subject, year, branch, semester } = req.query;

//   try {
//     const query = {};
//     if (subject) query.subject = subject;
//     if (year) query.year = year;
//     if (branch) query.branch = branch;
//     if (semester) query.semester = semester;

//     const files = await File.find(query);
//     res.json({ success: true, data: files });
//   } catch (error) {
//     console.error("Error filtering files:", error);
//     res.status(500).json({ success: false, message: "Error fetching files" });
//   }
// });
////////////////till here

// router.get("/search", async (req, res) => {
//   const { subject, year, branch, semester } = req.query;

//   console.log("Received Query Parameters:", { subject, year, branch, semester });

//   try {
//     const query = {};
//     if (subject) query.subject = new RegExp(`^${subject}$`, "i"); // Case-insensitive match
//     if (year) query.year = new RegExp(`^${year}$`, "i");
//     if (branch) query.branch = new RegExp(`^${branch}$`, "i");
//     if (semester) query.semester = new RegExp(`^${semester}$`, "i");

//     console.log("Constructed Query:", query);

//     const files = await File.find(query);
//     console.log("Matched Files:", files);

//     res.json({ success: true, data: files });
//   } catch (error) {
//     console.error("Error filtering files:", error);
//     res.status(500).json({ success: false, message: "Error fetching files" });
//   }
// });

// // 🔵 API to Upload a New File with Cloudinary URL
// router.post("/", async (req, res) => {
//   try {
//     const { title, subject, year, branch, semester, cloudinary_url } = req.body;

//     // Check for missing fields
//     if (!title || !subject || !year || !branch || !semester || !cloudinary_url) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Create a new file document
//     const newFile = new File({
//       title,
//       subject,
//       year,
//       branch,
//       semester,
//       cloudinary_url, // ✅ Include Cloudinary file URL
//     });

//     // Save to MongoDB
//     const savedFile = await newFile.save();

//     res.status(201).json({
//       success: true,
//       message: "File uploaded successfully",
//       data: savedFile,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ success: false, message: "Error uploading file" });
//   }
// });

// export default router;

// import express from "express";
// import File from "../models/File.js";

// const router = express.Router();

// router.get("/search", async (req, res) => {
//   const { branch, year, semester } = req.query;

//   console.log("Received search parameters:", { branch, year, semester });

//   try {
//     // Build query with exact matches
//     const query = {};
//     if (branch) query.branch = branch;
//     if (year) query.year = year;
//     if (semester) query.semester = semester;

//     console.log("Database query:", query);

//     const files = await File.find(query);
//     console.log(`Found ${files.length} matching files`);

//     if (files.length === 0) {
//       return res.json({
//         success: true,
//         data: [],
//         message: "No files found for the specified criteria",
//       });
//     }

//     res.json({
//       success: true,
//       data: files,
//     });
//   } catch (error) {
//     console.error("Error in /search:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching files",
//       error: error.message,
//     });
//   }
// });

// export default router;




// ////////////new schema

// import express from "express";
// import File from "../models/File.js";

// const router = express.Router();

// // Search endpoint
// router.get("/search", async (req, res) => {
//   const { branch, year, semester } = req.query;

//   console.log("Received search parameters:", { branch, year, semester });

//   try {
//     const query = {};
//     if (branch) query.branch = branch;
//     if (year) query.year = year;
//     if (semester) query.semester = semester;

//     console.log("Database query:", query);

//     const files = await File.find(query);
//     console.log(`Found ${files.length} matching files`);

//     if (files.length === 0) {
//       return res.json({
//         success: true,
//         data: [],
//         message: "No files found for the specified criteria",
//       });
//     }

//     res.json({
//       success: true,
//       data: files,
//     });
//   } catch (error) {
//     console.error("Error in /search:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching files",
//       error: error.message,
//     });
//   }
// });

// // Post endpoint to create new file
// router.post("/", async (req, res) => {
//   try {
//     const {
//       title,
//       subject,
//       year,
//       branch,
//       semester,
//       resources
//     } = req.body;

//     // Validate required fields
//     if (!title || !subject || !year || !branch || !semester) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//         requiredFields: ['title', 'subject', 'year', 'branch', 'semester']
//       });
//     }

//     // Validate resources structure if provided
//     if (resources && typeof resources === 'object') {
//       if (!Array.isArray(resources.lectures) || !Array.isArray(resources.pyqs)) {
//         return res.status(400).json({
//           success: false,
//           message: "Resources must contain 'lectures' and 'pyqs' arrays"
//         });
//       }

//       // Validate each resource has required fields
//       const validateResources = (arr) => {
//         return arr.every(item => item.title && item.cloudinary_url);
//       };

//       if (!validateResources(resources.lectures) || !validateResources(resources.pyqs)) {
//         return res.status(400).json({
//           success: false,
//           message: "Each resource must have 'title' and 'cloudinary_url'"
//         });
//       }
//     }

//     console.log("Creating new file:", req.body);

//     const newFile = new File(req.body);
//     const savedFile = await newFile.save();

//     console.log("File created successfully:", savedFile._id);

//     res.status(201).json({
//       success: true,
//       message: "File created successfully",
//       data: savedFile
//     });

//   } catch (error) {
//     console.error("Error in POST /:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating file",
//       error: error.message
//     });
//   }
// });

// // Get all files
// router.get("/", async (req, res) => {
//   try {
//     const files = await File.find();
//     res.json({
//       success: true,
//       data: files
//     });
//   } catch (error) {
//     console.error("Error fetching all files:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching files",
//       error: error.message
//     });
//   }
// });

// export default router;






// // routes/files.js
// import express from 'express';
// import File from '../models/File.js';

// const router = express.Router();

// // GET all files
// router.get('/', async (req, res) => {
//   try {
//     const files = await File.find();
//     res.json({ success: true, data: files });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // GET files by search criteria
// router.get('/search', async (req, res) => {
//   try {
//     const { branch, year, semester } = req.query;
//     console.log('Search params:', { branch, year, semester });

//     const query = {};
//     if (branch) query.branch = branch;
//     if (year) query.year = year;
//     if (semester) query.semester = semester;

//     const files = await File.find(query);
//     console.log('Found files:', files);

//     res.json({ success: true, data: files });
//   } catch (error) {
//     console.error('Search error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // POST new file
// router.post('/', async (req, res) => {
//   try {
//     const newFile = new File(req.body);
//     const savedFile = await newFile.save();
//     res.status(201).json({ success: true, data: savedFile });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;












// routes/files.js
import express from 'express';
import File from '../models/File.js';

const router = express.Router();

// GET /api/files
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all files');
    const files = await File.find();
    res.json({ success: true, data: files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// POST /api/files
router.post('/', async (req, res) => {
  try {
    console.log('Creating new file:', req.body);
    const newFile = new File(req.body);
    const savedFile = await newFile.save();
    res.status(201).json({ success: true, data: savedFile });
  } catch (error) {
    console.error('Error creating file:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/files/search
router.get('/search', async (req, res) => {
  try {
    const { branch, year, semester } = req.query;
    console.log('Searching for files with params:', { branch, year, semester });
    
    const query = {};
    if (branch) query.branch = branch;
    if (year) query.year = year;
    if (semester) query.semester = semester;
    
    const files = await File.find(query);
    res.json({ success: true, data: files });
  } catch (error) {
    console.error('Error searching files:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;