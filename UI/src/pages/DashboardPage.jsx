import React from 'react';
import VideoUpload from '../components/VideoUpload';
import VideoReview from '../components/VideoReview';

function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <VideoUpload />
            <VideoReview />
        </div>
    );
}

export default DashboardPage;
