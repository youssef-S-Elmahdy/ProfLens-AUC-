import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaStar, FaThumbsUp, FaPlus, FaArrowLeft } from 'react-icons/fa';
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

        setCourse(courseResponse.data.data);
        setReviews(reviewsResponse.data.data.reviews || []);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.response?.data?.message || 'Failed to load course data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleMarkHelpful = async (reviewId) => {
    try {
      await reviewsAPI.markHelpful(reviewId);
      // Update the review in the local state
      setReviews(reviews.map(review =>
        review._id === reviewId
          ? { ...review, helpfulCount: (review.helpfulCount || 0) + 1 }
          : review
      ));
    } catch (err) {
      console.error('Error marking review as helpful:', err);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${
              star <= Math.round(rating) ? 'text-auc-gold-500' : 'text-slate-300'
            } text-lg`}
          />
        ))}
        <span className="ml-2 text-lg font-bold text-slate-700">{rating?.toFixed(1) || 'N/A'}</span>
      </div>
    );
  };

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {renderStars(review.rating)}
          </div>
          <p className="text-sm text-slate-600">
            {review.semester} {review.year} • {review.anonymous ? 'Anonymous' : review.author?.firstName + ' ' + review.author?.lastName}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {review.comment && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-1">Review</h4>
            <p className="text-slate-700">{review.comment}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div>
            <p className="text-xs text-slate-500 uppercase">Difficulty</p>
            <p className="text-sm font-medium text-slate-900">{review.difficulty}/5</p>
          </div>
          {review.workload && (
            <div>
              <p className="text-xs text-slate-500 uppercase">Workload</p>
              <p className="text-sm font-medium text-slate-900">{review.workload}/5</p>
            </div>
          )}
          {review.grading && (
            <div>
              <p className="text-xs text-slate-500 uppercase">Grading</p>
              <p className="text-sm font-medium text-slate-900">{review.grading}</p>
            </div>
          )}
        </div>

        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
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

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={() => handleMarkHelpful(review._id)}
            className="flex items-center space-x-2 text-slate-600 hover:text-auc-blue-600 transition-colors"
          >
            <FaThumbsUp />
            <span className="text-sm">Helpful ({review.helpfulCount || 0})</span>
          </button>
          <p className="text-xs text-slate-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center space-x-2 text-auc-blue-600 hover:text-auc-blue-700 mb-6"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="bg-auc-gold-100 p-4 rounded-full">
                <FaBook className="text-auc-gold-600 text-4xl" />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {course?.code}
                </h1>
                <p className="text-lg text-slate-600 mb-4">{course?.name}</p>
                {renderStars(course?.averageRating || 0)}
                <p className="text-sm text-slate-600 mt-2">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/submit-review/course/${id}`)}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <FaPlus />
              <span>Add Review</span>
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Student Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => <ReviewCard key={review._id} review={review} />)
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-slate-600 mb-4">No reviews yet for this course.</p>
              <Button
                onClick={() => navigate(`/submit-review/course/${id}`)}
                variant="secondary"
              >
                Be the first to review
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseReviewPage;
