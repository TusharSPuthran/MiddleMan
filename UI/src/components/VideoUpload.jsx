import React, { useState } from 'react';
import axios from 'axios';

function VideoUpload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.post('/api/videos/upload', formData);
            alert('Video uploaded successfully');
        } catch (err) {
            console.error('Error uploading video:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} required />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Upload Video</button>
        </form>
    );
}

export default VideoUpload;
