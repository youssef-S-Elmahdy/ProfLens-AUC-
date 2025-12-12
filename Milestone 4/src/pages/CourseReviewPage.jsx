import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaBook, FaStar, FaThumbsUp, FaPlus, FaArrowLeft, FaGraduationCap } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { coursesAPI, reviewsAPI } from '../services/api';

const CourseReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterSemester, setFilterSemester] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  const handleReport = async (reviewId) => {
    try {
      await reviewsAPI.report(reviewId);
      setError(null);
      setSuccessMessage('Review reported. Thank you.');
    } catch (err) {
      console.error('Error reporting review:', err);
      setError('Failed to report review. Please try again.');
    }
  };

  const ratingBreakdown = useMemo(() => {
    const ratings = course?.ratings || {};
    return [
      { label: 'Difficulty', key: 'difficulty' },
      { label: 'Workload', key: 'workload' },
      { label: 'Usefulness', key: 'usefulness' },
      { label: 'Content Quality', key: 'contentQuality' },
    ].map((item) => ({
      ...item,
      value: ratings[item.key] || 0,
    }));
  }, [course]);
  const reviewCount = reviews.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch course and their reviews in parallel
        const [courseResponse, reviewsResponse] = await Promise.all([
          coursesAPI.getById(id),
          reviewsAPI.getAll({ type: 'course', courseId: id })
        ]);

        setCourse(courseResponse.data.data.course);
        const fetchedReviews = reviewsResponse.data.data.reviews || [];
        setReviews(fetchedReviews);
      } catch (err) {
        console.error('Error fetching course data:', err);
        const message =
          err.code === 'ERR_NETWORK'
            ? 'Cannot connect to the backend. Please ensure the API is running.'
            : err.response?.data?.message || 'Failed to load course data.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleMarkHelpful = async (reviewId) => {
    try {
      const response = await reviewsAPI.markHelpful(reviewId);
      const updatedHelpful = response.data?.data?.helpful;
      setReviews(
        reviews.map((review) =>
          review._id === reviewId
            ? { ...review, helpful: updatedHelpful ?? (review.helpful || 0) + 1 }
            : review
        )
      );
    } catch (err) {
      console.error('Error marking review as helpful:', err);
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${
            star <= Math.round(rating) ? 'text-auc-gold-500' : 'text-slate-300'
          } text-lg`}
        />
      ))}
    </div>
  );

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-3">
            {renderStars(review.rating)}
            <span className="text-sm font-semibold text-slate-800">{review.rating.toFixed(1)}/5</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {review.anonymous
              ? 'Anonymous Student'
              : review.user
              ? `${review.user.firstName} ${review.user.lastName}`
              : 'Student'}{' '}
            • {review.semester || 'N/A'} • {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => handleMarkHelpful(review._id)}
          className="flex items-center space-x-2 text-slate-500 hover:text-auc-blue-600 text-sm"
        >
          <FaThumbsUp />
          <span>Helpful ({review.helpful || 0})</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 mb-3">
        <div>Difficulty: {review.difficulty ? `${review.difficulty}/5` : 'N/A'}</div>
        <div>Workload: {review.workload ? `${review.workload}/5` : 'N/A'}</div>
        <div>Usefulness: {review.usefulness ? `${review.usefulness}/5` : 'N/A'}</div>
        <div>Content Quality: {review.contentQuality ? `${review.contentQuality}/5` : 'N/A'}</div>
      </div>

      {review.comment && <p className="text-slate-700 leading-relaxed">{review.comment}</p>}

      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {review.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-auc-gold-50 text-auc-gold-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-end mt-3">
        <button
          onClick={() => handleReport(review._id)}
          className="text-xs text-slate-500 hover:text-auc-blue-600"
        >
          Report
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-auc-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading course data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">{error}</p>
            <Button onClick={() => navigate('/home')} variant="outline" className="mt-4">
              Go Back Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center space-x-2 text-auc-blue-600 hover:text-auc-blue-700 mb-4 text-sm"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: course card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 lg:col-span-1">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-auc-gold-400 to-auc-gold-500 flex items-center justify-center text-white text-xl font-bold">
                    <FaBook />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">{course?.code}</h1>
                    <p className="text-sm text-slate-600">{course?.name}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                  {course?.credits} credits
                </span>
              </div>

              <p className="mt-3 text-sm text-auc-blue-700 flex items-center space-x-2">
                <FaGraduationCap />
                <span>{course?.departmentName}</span>
              </p>

              <div className="mt-4 flex items-center space-x-2">
                {renderStars(course?.overallRating || 0)}
                <span className="text-lg font-semibold text-slate-800">
                  {course?.overallRating?.toFixed(1) || 'N/A'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {reviewCount} reviews
              </p>

              {course?.description && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Rating Breakdown</h3>
                <div className="space-y-3">
                  {ratingBreakdown.map((item) => (
                    <div key={item.key}>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>{item.label}</span>
                        <span>{item.value.toFixed(1)}/5</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-auc-blue-600"
                          style={{ width: `${(item.value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {course?.professors?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Taught by</h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    {course.professors.map((prof) => (
                      <div key={prof._id} className="px-3 py-2 bg-slate-50 rounded-md border border-slate-100">
                        {prof.firstName} {prof.lastName}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => navigate(`/submit-review/course/${id}`)}
                variant="secondary"
                className="mt-6 w-full flex items-center justify-center space-x-2"
              >
                <FaPlus />
                <span>Write a Review</span>
              </Button>
            </div>
          </div>

          {/* Right column: reviews */}
          <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Student Reviews ({reviewCount})
              </h2>
              {successMessage && (
                <div className="mt-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded px-3 py-2">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="mt-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2">
                  {error}
                </div>
              )}
              <div className="flex items-center space-x-3 mt-2 text-sm text-slate-600">
                <label>
                  Sort:
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="ml-2 border border-slate-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="createdAt">Most Recent</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </label>
                <label>
                  Semester:
                  <select
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                    className="ml-2 border border-slate-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="all">All</option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                </label>
              </div>
            </div>
            <Link
              to={`/submit-review/course/${id}`}
              className="text-auc-blue-600 hover:text-auc-blue-700 text-sm font-semibold"
            >
              Add your review
            </Link>
          </div>

          {reviews.length > 0 ? (
            reviews
              .filter((r) =>
                filterSemester === 'all'
                  ? true
                  : (r.semester || '').toLowerCase().includes(filterSemester.toLowerCase())
              )
              .sort((a, b) =>
                sortBy === 'rating'
                  ? b.rating - a.rating
                  : new Date(b.createdAt) - new Date(a.createdAt)
              )
              .map((review) => <ReviewCard key={review._id} review={review} />)
          ) : (
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-600">
                No reviews yet for this course. Be the first to share your experience.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewPage;
