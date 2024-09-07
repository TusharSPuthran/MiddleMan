// manage collaborations or group multiple videos under a single project, this schema will be useful.

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the Creator
  editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the assigned Editor
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],  // List of associated videos
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
