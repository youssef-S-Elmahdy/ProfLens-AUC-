import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Display-only star rating component
export const StarRatingDisplay = ({ rating, size = 'md', showValue = true, className = '' }) => {
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FaStar key={i} className="text-auc-gold-500" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-auc-gold-500" />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className="text-auc-gold-500" />
        );
      }
    }
    return stars;
  };

  return (
    <div className={`flex items-center gap-1 ${sizes[size]} ${className}`}>
      <div className="flex">{renderStars()}</div>
      {showValue && (
        <span className="ml-2 font-semibold text-slate-700 text-lg">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// Interactive star rating component for forms
export const StarRatingInput = ({
  value = 0,
  onChange,
  size = 'lg',
  label = '',
  required = false,
  error = '',
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const handleClick = (rating) => {
    onChange(rating);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className={`flex items-center gap-1 ${sizes[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            {star <= (hoverValue || value) ? (
              <FaStar className="text-auc-gold-500" />
            ) : (
              <FaRegStar className="text-slate-300 hover:text-auc-gold-400" />
            )}
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-lg font-medium text-slate-600">
            {value}/5
          </span>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default StarRatingDisplay;
