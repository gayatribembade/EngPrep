const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    uploadedAt: { type: Date, default: Date.now },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    approvedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
});

module.exports = mongoose.model("Resource", resourceSchema);
