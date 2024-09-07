const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },  // URL to the stored video file
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the Creator
  editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the assigned Editor
  status: { 
    type: String, 
    enum: ['Uploaded', 'In Review', 'Approved', 'Rejected'], 
    default: 'Uploaded' 
  },  // Video status
  uploadedAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
  approvedAt: { type: Date },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
