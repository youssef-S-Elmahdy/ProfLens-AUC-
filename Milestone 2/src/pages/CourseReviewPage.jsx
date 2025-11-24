import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaBook,
  FaStar,
  FaPen,
  FaArrowLeft,
  FaFilter,
  FaUserTie,
  FaGraduationCap,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { StarRatingDisplay } from '../components/StarRating';
import RatingBar from '../components/RatingBar';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import FilterDropdown from '../components/FilterDropdown';
import { getCourseById, getReviewsByTarget, getProfessorsByCourse } from '../data/mockData';

const CourseReviewPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Fetch course data
    const courseData = getCourseById(id);
    if (courseData) {
      setCourse(courseData);
      setReviews(getReviewsByTarget('course', id));
      setProfessors(getProfessorsByCourse(id));
    }
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-slate-600">Course not found.</p>
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

  // Get difficulty label and color
  const getDifficultyInfo = (difficulty) => {
    if (difficulty <= 2) return { label: 'Easy', color: 'text-green-600 bg-green-50' };
    if (difficulty <= 3) return { label: 'Moderate', color: 'text-yellow-600 bg-yellow-50' };
    if (difficulty <= 4) return { label: 'Challenging', color: 'text-orange-600 bg-orange-50' };
    return { label: 'Very Hard', color: 'text-red-600 bg-red-50' };
  };

  const difficultyInfo = getDifficultyInfo(course.ratings?.difficulty || 3);

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
          {/* Left Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              {/* Course Header */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-auc-gold-400 to-auc-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaBook className="text-white text-3xl" />
                </div>
                <span className="inline-block px-3 py-1 bg-auc-blue-600 text-white text-sm font-semibold rounded mb-2">
                  {course.code}
                </span>
                <h1 className="text-2xl font-bold text-slate-900">{course.name}</h1>
                <p className="text-auc-blue-600 text-sm mt-1">
                  <FaGraduationCap className="inline mr-1" />
                  {course.departmentName}
                </p>
                <p className="text-slate-500 text-sm">{course.credits} Credit Hours</p>
              </div>

              {/* Description */}
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">{course.description}</p>
              </div>

              {/* Overall Rating */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center justify-center bg-auc-gold-50 rounded-xl px-6 py-4">
                  <div>
                    <p className="text-4xl font-bold text-auc-gold-600">
                      {course.overallRating.toFixed(1)}
                    </p>
                    <StarRatingDisplay
                      rating={course.overallRating}
                      size="md"
                      showValue={false}
                    />
                    <p className="text-sm text-slate-500 mt-1">
                      {course.totalReviews} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="mt-4 flex justify-center">
                <span className={`px-4 py-2 rounded-full font-medium ${difficultyInfo.color}`}>
                  Difficulty: {difficultyInfo.label}
                </span>
              </div>

              {/* Rating Breakdown */}
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-slate-900 mb-4">Course Ratings</h3>
                <RatingBar label="Difficulty" value={course.ratings.difficulty} color="orange" />
                <RatingBar label="Workload" value={course.ratings.workload} color="orange" />
                <RatingBar label="Usefulness" value={course.ratings.usefulness} color="green" />
                <RatingBar label="Content Quality" value={course.ratings.contentQuality} color="blue" />
              </div>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Professors Teaching */}
              <div className="mt-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  <FaUserTie className="inline mr-2" />
                  Instructors
                </h3>
                <div className="space-y-2">
                  {professors.map((professor) => (
                    <Link
                      key={professor.id}
                      to={`/professor/${professor.id}`}
                      className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-auc-blue-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-auc-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-auc-blue-600 font-medium text-sm">
                          {professor.firstName[0]}{professor.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {professor.firstName} {professor.lastName}
                        </p>
                        <div className="flex items-center">
                          <StarRatingDisplay
                            rating={professor.overallRating}
                            size="sm"
                            showValue={true}
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Write Review Button */}
              <Button
                to={`/submit-review/course/${course.id}`}
                variant="gold"
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
              </div>
            </div>

            {/* Reviews List */}
            {sortedReviews.length > 0 ? (
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} type="course" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FaStar className="text-4xl text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Reviews Yet</h3>
                <p className="text-slate-500 mb-6">
                  Be the first to review this course!
                </p>
                <Button
                  to={`/submit-review/course/${course.id}`}
                  variant="gold"
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

export default CourseReviewPage;
