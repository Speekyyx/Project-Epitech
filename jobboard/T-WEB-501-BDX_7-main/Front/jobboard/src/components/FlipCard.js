import React, { useState } from 'react';
import './FlipCard.css';

const FlipCard = ({ job }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="flip-card" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-front">
                    <h3>{job.title}</h3>
                    <p>{job.location}</p>
                </div>
                <div className="card-back">
                    {/* Ajouter d'autres détails de travail ici */}
                    <p>{job.description}</p>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;
