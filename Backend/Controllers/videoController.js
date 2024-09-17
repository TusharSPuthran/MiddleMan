const Video = require('../Models/Video');  // Ensure this path is correct
const User = require('../Models/User');    // Ensure this path is correct

// Upload a video - Only accessible by creators
const uploadVideo = async (req, res) => {
    try {
        const { creatorId, videoTitle, description } = req.body;
        const videoFile = req.file?.filename;

        if (!creatorId || !videoTitle || !videoFile) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Ensure the user is a creator
        const creator = await User.findById(creatorId);
        if (!creator || creator.role !== 'creator') {
            return res.status(403).json({ message: "You do not have permission to upload videos" });
        }

        // Create new video entry in the database
        const newVideo = new Video({
            creator: creatorId,
            title: videoTitle,
            description,
            file: videoFile,
            status: 'pending',  // Default status
        });

        const savedVideo = await newVideo.save();
        res.status(201).json({ message: "Video uploaded successfully", video: savedVideo });
    } catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).json({ error: err.message });
    }
};

// Review a video - Only accessible by editors
const reviewVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const { reviewComments, status } = req.body;

        if (!reviewComments || !status) {
            return res.status(400).json({ message: "Missing review comments or status" });
        }

        // Ensure the user is an editor
        const editor = await User.findById(req.user.id);
        if (!editor || editor.role !== 'editor') {
            return res.status(403).json({ message: "You do not have permission to review videos" });
        }

        const updatedVideo = await Video.findByIdAndUpdate(videoId, {
            $set: {
                reviewComments,
                status,
            },
        }, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json({ message: "Video reviewed successfully", video: updatedVideo });
    } catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).json({ error: err.message });
    }
};

// Approve a video - Only accessible by editors
const approveVideo = async (req, res) => {
    try {
        const videoId = req.params.id;

        // Ensure the user is an editor
        const editor = await User.findById(req.user.id);
        if (!editor || editor.role !== 'editor') {
            return res.status(403).json({ message: "You do not have permission to approve videos" });
        }

        const approvedVideo = await Video.findByIdAndUpdate(videoId, {
            $set: {
                status: 'approved',
            },
        }, { new: true });

        if (!approvedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json({ message: "Video approved successfully", video: approvedVideo });
    } catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { uploadVideo, reviewVideo, approveVideo };