// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   title: String,
//   subject: String,
//   year: String,
//   branch: String,
//   semester: String,
//   // cloudinary_url: String, // Cloudinary file link
//   uploaded_at: { type: Date, default: Date.now }
// });

// export default mongoose.model("File", fileSchema);

// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   title: String,
//   subject: String,
//   year: String,
//   branch: String,
//   semester: String,
//   cloudinary_url: String, // Added Cloudinary file link
//   uploaded_at: { type: Date, default: Date.now }
// });

// export default mongoose.model("File", fileSchema);

////////////////new schema/////////////////////

// models/File.js
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  cloudinary_url: String
});

const fileSchema = new mongoose.Schema({
  title: String,
  subject: String,
  year: String,
  branch: String,
  semester: String,
  resources: {
    lectures: [resourceSchema],
    pyqs: [resourceSchema]
  },
  uploaded_at: { type: Date, default: Date.now }
});

export default mongoose.model("File", fileSchema);