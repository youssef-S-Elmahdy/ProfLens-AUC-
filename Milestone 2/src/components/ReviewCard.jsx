import React from 'react';
import { FaThumbsUp, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { StarRatingDisplay } from './StarRating';

const ReviewCard = ({ review, type = 'professor' }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get rating categories based on type
  const getRatingCategories = () => {
    if (type === 'professor') {
      return [
        { key: 'clarity', label: 'Clarity' },
        { key: 'helpfulness', label: 'Helpfulness' },
        { key: 'engagement', label: 'Engagement' },
        { key: 'grading', label: 'Grading' },
        { key: 'communication', label: 'Communication' },
      ];
    }
    return [
      { key: 'difficulty', label: 'Difficulty' },
      { key: 'workload', label: 'Workload' },
      { key: 'usefulness', label: 'Usefulness' },
      { key: 'contentQuality', label: 'Content Quality' },
    ];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
            <span className="text-slate-600 font-medium text-sm">
              {review.verified ? 'V' : 'A'}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-slate-900">Anonymous Student</span>
              {review.verified && (
                <span className="flex items-center text-green-600 text-xs">
                  <FaCheckCircle className="mr-1" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-slate-500 space-x-2">
              <FaCalendarAlt className="text-xs" />
              <span>{formatDate(review.date)}</span>
              <span>•</span>
              <span>{review.semester}</span>
            </div>
          </div>
        </div>
        <StarRatingDisplay rating={review.rating} size="md" />
      </div>

      {/* Rating Breakdown */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {getRatingCategories().map(({ key, label }) => (
          review[key] && (
            <div key={key} className="text-center p-2 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="font-semibold text-slate-900">{review[key]}/5</p>
            </div>
          )
        ))}
      </div>

      {/* Comment */}
      <div className="mt-4">
        <p className="text-slate-700 leading-relaxed">{review.comment}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100">
        <button className="flex items-center space-x-2 text-slate-500 hover:text-auc-blue-600 transition-colors">
          <FaThumbsUp />
          <span className="text-sm">{review.helpful} found this helpful</span>
        </button>
        <button className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
