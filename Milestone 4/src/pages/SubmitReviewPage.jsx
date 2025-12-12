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
    difficulty: 0, // course difficulty or professor workload proxy (legacy)
    clarity: 0,
    helpfulness: 0,
    engagement: 0,
    grading: 0,
    workload: 0,
    communication: 0,
    usefulness: 0,
    contentQuality: 0,
    comment: '',
    semester: 'Fall',
    year: new Date().getFullYear(),
    courseTaken: '',
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
        setTarget(type === 'professor' ? response.data.data.professor : response.data.data.course);
      } catch (err) {
        console.error('Error fetching target:', err);
        const message =
          err.code === 'ERR_NETWORK'
            ? 'Cannot connect to the backend. Please ensure the API is running.'
            : err.response?.data?.message || 'Failed to load data.';
        setError(message);
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
    if (type === 'course') {
      if (formData.difficulty === 0) newErrors.difficulty = 'Please rate the difficulty';
      if (formData.workload === 0) newErrors.workload = 'Please rate the workload';
      if (formData.usefulness === 0) newErrors.usefulness = 'Please rate the usefulness';
      if (formData.contentQuality === 0) newErrors.contentQuality = 'Please rate the content quality';
    } else {
      if (formData.clarity === 0) newErrors.clarity = 'Please rate clarity';
      if (formData.helpfulness === 0) newErrors.helpfulness = 'Please rate helpfulness';
      if (formData.engagement === 0) newErrors.engagement = 'Please rate engagement';
      if (formData.grading === 0) newErrors.grading = 'Please rate grading fairness';
      if (formData.workload === 0) newErrors.workload = 'Please rate workload';
      if (formData.communication === 0) newErrors.communication = 'Please rate communication';
    }
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write a review';
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
        comment: formData.comment,
        semester: `${formData.semester} ${formData.year}`,
        anonymous: formData.anonymous,
      };

      if (type === 'professor') {
        reviewData.clarity = formData.clarity;
        reviewData.helpfulness = formData.helpfulness;
        reviewData.engagement = formData.engagement;
        reviewData.grading = formData.grading;
        reviewData.workload = formData.workload;
        reviewData.communication = formData.communication;
        if (formData.courseTaken) {
          reviewData.courseTaken = formData.courseTaken;
        }
      } else {
        reviewData.difficulty = formData.difficulty;
        reviewData.workload = formData.workload;
        reviewData.usefulness = formData.usefulness;
        reviewData.contentQuality = formData.contentQuality;
      }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/${type}/${id}`)}
          className="flex items-center space-x-2 text-auc-blue-600 hover:text-auc-blue-700 mb-6 text-sm"
        >
          <FaArrowLeft />
          <span>Back to {type === 'professor' ? 'Professor' : 'Course'}</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-auc-blue-900 to-auc-blue-700 px-6 py-5 text-white flex items-center">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-xl font-bold uppercase">
              {type === 'professor'
                ? `${target?.firstName?.[0] || ''}${target?.lastName?.[0] || ''}`
                : (target?.code || 'C')[0]}
            </div>
            <div className="ml-4">
              <p className="text-sm text-auc-blue-200 mb-1">
                {type === 'professor' ? 'Review Professor' : 'Review Course'}
              </p>
              <h1 className="text-lg font-semibold">
                {type === 'professor'
                  ? `${target?.firstName || ''} ${target?.lastName || ''}`.trim()
                  : target?.name || target?.code}
              </h1>
              <p className="text-xs text-auc-blue-200">
                {type === 'professor'
                  ? target?.departmentName || target?.department
                  : target?.departmentName}
              </p>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {type === 'professor' && target?.courses?.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Which course did you take with this professor?
                  </label>
                  <select
                    name="courseTaken"
                    value={formData.courseTaken}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-auc-blue-500"
                  >
                    <option value="">Select a course...</option>
                    {target.courses.map((courseCode) => (
                      <option key={courseCode} value={courseCode}>
                        {courseCode}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <StarRating
                  value={formData.rating}
                  onChange={(value) => handleRatingChange('rating', value)}
                  label="Overall Rating"
                  error={errors.rating}
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Rate specific aspects</h3>
                {type === 'course' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StarRating
                      value={formData.difficulty}
                      onChange={(value) => handleRatingChange('difficulty', value)}
                      label="Difficulty"
                      error={errors.difficulty}
                    />
                    <StarRating
                      value={formData.workload}
                      onChange={(value) => handleRatingChange('workload', value)}
                      label="Workload"
                      error={errors.workload}
                    />
                    <StarRating
                      value={formData.usefulness}
                      onChange={(value) => handleRatingChange('usefulness', value)}
                      label="Usefulness"
                      error={errors.usefulness}
                    />
                    <StarRating
                      value={formData.contentQuality}
                      onChange={(value) => handleRatingChange('contentQuality', value)}
                      label="Content Quality"
                      error={errors.contentQuality}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StarRating
                      value={formData.clarity}
                      onChange={(value) => handleRatingChange('clarity', value)}
                      label="Clarity of Teaching"
                      error={errors.clarity}
                    />
                    <StarRating
                      value={formData.helpfulness}
                      onChange={(value) => handleRatingChange('helpfulness', value)}
                      label="Helpfulness"
                      error={errors.helpfulness}
                    />
                    <StarRating
                      value={formData.engagement}
                      onChange={(value) => handleRatingChange('engagement', value)}
                      label="Engagement"
                      error={errors.engagement}
                    />
                    <StarRating
                      value={formData.grading}
                      onChange={(value) => handleRatingChange('grading', value)}
                      label="Grading Fairness"
                      error={errors.grading}
                    />
                    <StarRating
                      value={formData.workload}
                      onChange={(value) => handleRatingChange('workload', value)}
                      label="Workload"
                      error={errors.workload}
                    />
                    <StarRating
                      value={formData.communication}
                      onChange={(value) => handleRatingChange('communication', value)}
                      label="Communication"
                      error={errors.communication}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Share your experience with this class/professor. What did you like? What could be improved?"
                  rows="6"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-auc-blue-500 ${
                    errors.comment ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                <div className="flex justify-between items-center mt-1 text-xs text-slate-500">
                  {errors.comment && <p className="text-red-600">{errors.comment}</p>}
                  <span>{formData.comment.length} / 2000 characters</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-slate-300 text-auc-blue-600 focus:ring-auc-blue-500"
                />
                <span className="text-sm text-slate-700">Post anonymously (recommended)</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-700">Review Guidelines</p>
                <p>Be honest and constructive in your feedback.</p>
                <p>Focus on the academic aspects of your experience.</p>
                <p>Avoid personal attacks or inappropriate language.</p>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/${type}/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitReviewPage;
