import React from 'react';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaComments } from 'react-icons/fa';
import { StarRatingDisplay } from './StarRating';

const ProfessorCard = ({ professor }) => {
  return (
    <Link
      to={`/professor/${professor.id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-auc-blue-200 group"
    >
      <div className="p-7">
        {/* Header with Avatar */}
        <div className="flex items-start space-x-4">
          <div className="w-18 h-18 min-w-[4.5rem] min-h-[4.5rem] bg-gradient-to-br from-auc-blue-500 to-auc-blue-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-2xl">
              {professor.firstName[0]}{professor.lastName[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-auc-blue-600 transition-colors truncate">
              {professor.firstName} {professor.lastName}
            </h3>
            <p className="text-base text-slate-500">{professor.title}</p>
            <p className="text-base text-auc-blue-600 truncate">{professor.departmentName}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-5 flex items-center justify-between">
          <StarRatingDisplay rating={professor.overallRating} size="md" />
          <div className="flex items-center text-slate-500 text-base">
            <FaComments className="mr-2" />
            <span>{professor.totalReviews} reviews</span>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-5 flex items-center text-base text-slate-600">
          <FaChalkboardTeacher className="mr-2 text-auc-blue-500 text-lg" />
          <span className="truncate">{professor.courses.join(', ')}</span>
        </div>

        {/* Tags */}
        {professor.tags && professor.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {professor.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-auc-blue-50 text-auc-blue-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProfessorCard;
