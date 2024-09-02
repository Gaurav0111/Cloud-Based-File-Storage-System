import React from 'react';
import '../assets/css/landing.css'; 

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h2>Welcome to Your Files</h2>
            <div className="files-list">
                {/* Here you would map through the files and display them */}
            </div>
        </div>
    );
};

export default LandingPage;
