import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChalkboardTeacher, FaBook, FaPaperPlane, FaCheckCircle, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import { professorsAPI, coursesAPI, reviewsAPI } from '../services/api';

const SubmitReviewPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  // Common form state
  const [formData, setFormData] = useState({
    rating: 0,
    difficulty: 0,
    comment: '',
    semester: 'Fall',
    year: new Date().getFullYear(),
    tags: [],
    anonymous: false,
  });

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        setLoading(true);
        let response;
        if (type === 'professor') {
          response = await professorsAPI.getById(id);
        } else {
          response = await coursesAPI.getById(id);
        }
        setTarget(response.data.data);
      } catch (err) {
        console.error('Error fetching target:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTarget();
  }, [type, id]);

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.rating === 0) {
      newErrors.rating = 'Please provide a rating';
    }
    if (formData.difficulty === 0) {
      newErrors.difficulty = 'Please rate the difficulty';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (formData.comment.trim().length < 50) {
      newErrors.comment = 'Review must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const reviewData = {
        type,
        rating: formData.rating,
        difficulty: formData.difficulty,
        comment: formData.comment,
        semester: formData.semester,
        year: parseInt(formData.year),
        tags: formData.tags,
        anonymous: formData.anonymous,
      };

      // Only add numeric fields if they have values
      // Remove grading and attendance for now (they're optional and causing validation errors)

      if (type === 'professor') {
        reviewData.professorId = id;
      } else {
        reviewData.courseId = id;
      }

      await reviewsAPI.create(reviewData);
      setIsSubmitted(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(`/${type}/${id}`);
      }, 2000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, label, error }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`text-3xl transition-colors ${
                star <= value ? 'text-auc-gold-500' : 'text-slate-300 hover:text-auc-gold-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-3 text-lg font-medium text-slate-700">
          {value > 0 ? value : 'Not rated'}
        </span>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-auc-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !target) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
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

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Review Submitted Successfully!
            </h1>
            <p className="text-slate-600 mb-6">
              Thank you for sharing your experience. Your review will help other AUC students make informed decisions.
            </p>
            <Button onClick={() => navigate(`/${type}/${id}`)} variant="primary">
              View {type === 'professor' ? 'Professor' : 'Course'} Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/${type}/${id}`)}
          className="flex items-center space-x-2 text-auc-blue-600 hover:text-auc-blue-700 mb-6"
        >
          <FaArrowLeft />
          <span>Back to {type === 'professor' ? 'Professor' : 'Course'}</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center">
            <div className={`p-4 rounded-full ${type === 'professor' ? 'bg-auc-blue-100' : 'bg-auc-gold-100'}`}>
              {type === 'professor' ? (
                <FaChalkboardTeacher className="text-auc-blue-600 text-3xl" />
              ) : (
                <FaBook className="text-auc-gold-600 text-3xl" />
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-slate-900">
                Submit Review for {target?.name || target?.code}
              </h1>
              <p className="text-slate-600">
                {type === 'professor' ? target?.department : target?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <StarRating
              value={formData.rating}
              onChange={(value) => handleRatingChange('rating', value)}
              label="Overall Rating"
              error={errors.rating}
            />

            <StarRating
              value={formData.difficulty}
              onChange={(value) => handleRatingChange('difficulty', value)}
              label="Difficulty"
              error={errors.difficulty}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-auc-blue-500"
                >
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
              <Input
                type="number"
                name="year"
                label="Year"
                value={formData.year}
                onChange={handleInputChange}
                min="2020"
                max={new Date().getFullYear()}
              />
            </div>


            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Review <span className="text-red-500">*</span>
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Share your experience... (minimum 50 characters)"
                rows="6"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-auc-blue-500 ${
                  errors.comment ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.comment && <p className="text-sm text-red-600">{errors.comment}</p>}
                <p className="text-sm text-slate-500 ml-auto">
                  {formData.comment.length} / 50 characters
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-slate-300 text-auc-blue-600 focus:ring-auc-blue-500"
                />
                <span className="ml-2 text-sm text-slate-700">Submit anonymously</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Submit Review</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
