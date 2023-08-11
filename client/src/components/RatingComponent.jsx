import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.min(Math.max(rating, 0), maxStars);

  return (
    <div className="star-rating" style={{display: 'flex'}}>
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={index} className="star-icon filled" color='#edda09'/>
      ))}
      {[...Array(maxStars - filledStars)].map((_, index) => (
        <FaStar key={filledStars + index} className="star-icon" color='gray'/>
      ))}
    </div>
  );
};

export default Rating;
