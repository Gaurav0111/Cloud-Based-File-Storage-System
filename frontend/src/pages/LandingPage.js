import React from 'react';
import '../assets/css/landing.css'; // Import the CSS file

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
