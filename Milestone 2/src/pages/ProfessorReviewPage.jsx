import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaChalkboardTeacher,
  FaStar,
  FaPen,
  FaArrowLeft,
  FaFilter,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { StarRatingDisplay } from '../components/StarRating';
import RatingBar from '../components/RatingBar';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import FilterDropdown from '../components/FilterDropdown';
import { getProfessorById, getReviewsByTarget, getCoursesByProfessor } from '../data/mockData';

const ProfessorReviewPage = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [filterByCourse, setFilterByCourse] = useState('all');

  useEffect(() => {
    // Fetch professor data
    const professorData = getProfessorById(id);
    if (professorData) {
      setProfessor(professorData);
      setReviews(getReviewsByTarget('professor', id));
      setCourses(getCoursesByProfessor(id));
    }
  }, [id]);

  if (!professor) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-slate-600">Professor not found.</p>
          <Link to="/home" className="text-auc-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'highest', label: 'Highest Rated' },
    { value: 'lowest', label: 'Lowest Rated' },
    { value: 'helpful', label: 'Most Helpful' },
  ];

  const courseFilterOptions = [
    { value: 'all', label: 'All Courses' },
    ...courses.map((c) => ({ value: c.id, label: c.code })),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/home"
          className="inline-flex items-center text-slate-600 hover:text-auc-blue-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Professor Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              {/* Professor Header */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-auc-blue-500 to-auc-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">
                    {professor.firstName[0]}{professor.lastName[0]}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {professor.firstName} {professor.lastName}
                </h1>
                <p className="text-slate-500">{professor.title}</p>
                <p className="text-auc-blue-600 text-sm mt-1">{professor.departmentName}</p>
              </div>

              {/* Overall Rating */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center justify-center bg-auc-blue-50 rounded-xl px-6 py-4">
                  <div>
                    <p className="text-4xl font-bold text-auc-blue-600">
                      {professor.overallRating.toFixed(1)}
                    </p>
                    <StarRatingDisplay
                      rating={professor.overallRating}
                      size="md"
                      showValue={false}
                    />
                    <p className="text-sm text-slate-500 mt-1">
                      {professor.totalReviews} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-slate-900 mb-4">Rating Breakdown</h3>
                <RatingBar label="Clarity" value={professor.ratings.clarity} />
                <RatingBar label="Helpfulness" value={professor.ratings.helpfulness} />
                <RatingBar label="Engagement" value={professor.ratings.engagement} />
                <RatingBar label="Grading Fairness" value={professor.ratings.grading} />
                <RatingBar label="Workload" value={professor.ratings.workload} />
                <RatingBar label="Communication" value={professor.ratings.communication} />
              </div>

              {/* Tags */}
              {professor.tags && professor.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Common Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {professor.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-auc-blue-50 text-auc-blue-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Taught */}
              <div className="mt-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  <FaChalkboardTeacher className="inline mr-2" />
                  Courses Taught
                </h3>
                <div className="space-y-2">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="block p-3 bg-slate-50 rounded-lg hover:bg-auc-blue-50 transition-colors"
                    >
                      <p className="font-medium text-slate-900">{course.code}</p>
                      <p className="text-sm text-slate-500">{course.name}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <a
                  href={`mailto:${professor.email}`}
                  className="flex items-center text-slate-600 hover:text-auc-blue-600"
                >
                  <FaEnvelope className="mr-2" />
                  {professor.email}
                </a>
              </div>

              {/* Write Review Button */}
              <Button
                to={`/submit-review/professor/${professor.id}`}
                variant="primary"
                size="lg"
                className="w-full mt-6"
                icon={<FaPen />}
              >
                Write a Review
              </Button>
            </div>
          </div>

          {/* Right Column - Reviews */}
          <div className="lg:col-span-2">
            {/* Reviews Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4 sm:mb-0">
                <FaStar className="inline mr-2 text-auc-gold-500" />
                Student Reviews ({reviews.length})
              </h2>
              <div className="flex items-center space-x-3">
                <FaFilter className="text-slate-400" />
                <FilterDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-40"
                />
                {courses.length > 0 && (
                  <FilterDropdown
                    options={courseFilterOptions}
                    value={filterByCourse}
                    onChange={setFilterByCourse}
                    className="w-40"
                  />
                )}
              </div>
            </div>

            {/* Reviews List */}
            {sortedReviews.length > 0 ? (
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} type="professor" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FaStar className="text-4xl text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Reviews Yet</h3>
                <p className="text-slate-500 mb-6">
                  Be the first to review this professor!
                </p>
                <Button
                  to={`/submit-review/professor/${professor.id}`}
                  variant="primary"
                  icon={<FaPen />}
                >
                  Write the First Review
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessorReviewPage;
