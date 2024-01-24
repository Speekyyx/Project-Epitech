import React, { useState, useRef } from 'react';
import FlipCard from './FlipCard';
import './JobCarousel.css';

const jobs = [
    { title: "Développeur Web", location: "Paris", description: "Développeur Web à Paris..." },
    { title: "Développeur Web", location: "Paris", description: "Développeur Web à Paris..." },
    { title: "Développeur Web", location: "Paris", description: "Développeur Web à Paris..." },
    { title: "info", location: "bdx", description: "dev." },
    { title: "Développeur java", location: "Paris", description: "coucou" },
    { title: "Développeur python", location: "Paris", description: "toi" },
];

const JobCarousel = () => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (direction) => {
        if (direction === "left" && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (direction === "right" && currentIndex < jobs.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="carousel-wrapper">
            <button onClick={() => handleScroll("left")}>◀</button>
            <div className="carousel-content" ref={carouselRef}>
                {jobs.slice(currentIndex, currentIndex + 3).map((job, index) => (
                    <FlipCard key={index} job={job} />
                ))}
            </div>
            <button onClick={() => handleScroll("right")}>▶</button>
        </div>
    );
};

export default JobCarousel;
