import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaComments, FaGraduationCap } from 'react-icons/fa';
import { StarRatingDisplay } from './StarRating';

const CourseCard = ({ course }) => {
  // Calculate difficulty display
  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 2) return { label: 'Easy', color: 'text-green-600 bg-green-50' };
    if (difficulty <= 3) return { label: 'Moderate', color: 'text-yellow-600 bg-yellow-50' };
    if (difficulty <= 4) return { label: 'Challenging', color: 'text-orange-600 bg-orange-50' };
    return { label: 'Very Hard', color: 'text-red-600 bg-red-50' };
  };

  const difficultyInfo = getDifficultyLabel(course.ratings?.difficulty || 3);

  return (
    <Link
      to={`/course/${course.id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-auc-blue-200 group"
    >
      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1.5 bg-auc-blue-600 text-white text-sm font-semibold rounded">
                {course.code}
              </span>
              <span className="text-sm text-slate-500">{course.credits} credits</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-auc-blue-600 transition-colors">
              {course.name}
            </h3>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-auc-gold-400 to-auc-gold-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <FaBook className="text-white text-2xl" />
          </div>
        </div>

        {/* Department */}
        <p className="mt-3 text-base text-auc-blue-600">
          <FaGraduationCap className="inline mr-2" />
          {course.departmentName}
        </p>

        {/* Description */}
        <p className="mt-4 text-base text-slate-600 line-clamp-2">
          {course.description}
        </p>

        {/* Rating and Stats */}
        <div className="mt-5 flex items-center justify-between">
          <StarRatingDisplay rating={course.overallRating} size="md" />
          <div className="flex items-center text-slate-500 text-base">
            <FaComments className="mr-2" />
            <span>{course.totalReviews} reviews</span>
          </div>
        </div>

        {/* Tags and Difficulty */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {course.tags && course.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className={`px-3 py-1.5 text-sm rounded-full font-medium ${difficultyInfo.color}`}>
            {difficultyInfo.label}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
