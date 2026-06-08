import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './VideoBackground.css';

const VideoBackground = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    // Video playlist
    const videos = [
        "/assets/videos/2.webm",
        "/assets/videos/3.webm",
        "/assets/videos/4.webm",
        "/assets/videos/1.webm",
        "/assets/videos/5.webm",
        "/assets/videos/6.webm"
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        // Show video only on Home (/) and About (/about)
        if (location.pathname === '/' || location.pathname === '/about') {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [location]);

    const handleVideoEnded = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    if (!isVisible) return null;

    return (
        <div className="sticky-video-container">
            <video
                key={videos[currentVideoIndex]}
                autoPlay
                muted
                playsInline
                className="sticky-video-element"
                onEnded={handleVideoEnded}
            >
                <source src={videos[currentVideoIndex]} type="video/webm" />
            </video>
            <div className="sticky-video-overlay-gradient"></div>
            <div className="sticky-video-overlay-dark"></div>
        </div>
    );
};

export default VideoBackground;
