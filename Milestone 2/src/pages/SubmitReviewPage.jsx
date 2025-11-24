import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaChalkboardTeacher,
  FaBook,
  FaPaperPlane,
  FaCheckCircle,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { StarRatingInput } from '../components/StarRating';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import FilterDropdown from '../components/FilterDropdown';
import { getProfessorById, getCourseById, courses } from '../data/mockData';

const SubmitReviewPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [target, setTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state for professor review
  const [professorReview, setProfessorReview] = useState({
    courseId: '',
    overallRating: 0,
    clarity: 0,
    helpfulness: 0,
    engagement: 0,
    grading: 0,
    workload: 0,
    communication: 0,
    comment: '',
    anonymous: true,
  });

  // Form state for course review
  const [courseReview, setCourseReview] = useState({
    professorId: '',
    overallRating: 0,
    difficulty: 0,
    workload: 0,
    usefulness: 0,
    contentQuality: 0,
    comment: '',
    anonymous: true,
  });

  useEffect(() => {
    if (type === 'professor') {
      const professor = getProfessorById(id);
      setTarget(professor);
    } else if (type === 'course') {
      const course = getCourseById(id);
      setTarget(course);
    }
  }, [type, id]);

  const validateProfessorReview = () => {
    const newErrors = {};
    if (!professorReview.courseId) {
      newErrors.courseId = 'Please select a course';
    }
    if (professorReview.overallRating === 0) {
      newErrors.overallRating = 'Please provide an overall rating';
    }
    if (professorReview.clarity === 0) {
      newErrors.clarity = 'Please rate clarity';
    }
    if (professorReview.helpfulness === 0) {
      newErrors.helpfulness = 'Please rate helpfulness';
    }
    if (!professorReview.comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (professorReview.comment.trim().length < 50) {
      newErrors.comment = 'Review must be at least 50 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCourseReview = () => {
    const newErrors = {};
    if (courseReview.overallRating === 0) {
      newErrors.overallRating = 'Please provide an overall rating';
    }
    if (courseReview.difficulty === 0) {
      newErrors.difficulty = 'Please rate difficulty';
    }
    if (courseReview.usefulness === 0) {
      newErrors.usefulness = 'Please rate usefulness';
    }
    if (!courseReview.comment.trim()) {
      newErrors.comment = 'Please write a review';
    } else if (courseReview.comment.trim().length < 50) {
      newErrors.comment = 'Review must be at least 50 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = type === 'professor' ? validateProfessorReview() : validateCourseReview();
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate API call (will be replaced with actual backend in Milestone 3)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!target) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-slate-600">
            {type === 'professor' ? 'Professor' : 'Course'} not found.
          </p>
          <Link to="/home" className="text-auc-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
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
          <div className="bg-white rounded-2xl shadow-md p-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Review Submitted Successfully!
            </h1>
            <p className="text-slate-600 mb-6">
              Thank you for sharing your experience. Your review will help other AUC students make informed decisions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                to={`/${type}/${id}`}
                variant="secondary"
              >
                View {type === 'professor' ? 'Professor' : 'Course'}
              </Button>
              <Button
                to="/home"
                variant="primary"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get course options for professor review
  const courseOptions = target.courses
    ? target.courses.map((code) => {
        const course = courses.find((c) => c.code === code);
        return course ? { value: course.id, label: `${course.code} - ${course.name}` } : null;
      }).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/${type}/${id}`}
          className="inline-flex items-center text-slate-600 hover:text-auc-blue-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to {type === 'professor' ? 'Professor' : 'Course'}
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-auc-blue-600 to-auc-blue-800 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${type === 'professor' ? 'bg-white/20' : 'bg-auc-gold-500'} rounded-full flex items-center justify-center`}>
                {type === 'professor' ? (
                  <span className="text-2xl font-bold">
                    {target.firstName[0]}{target.lastName[0]}
                  </span>
                ) : (
                  <FaBook className="text-white text-2xl" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {type === 'professor'
                    ? `Review ${target.firstName} ${target.lastName}`
                    : `Review ${target.code}`
                  }
                </h1>
                <p className="text-auc-blue-200">
                  {type === 'professor' ? target.departmentName : target.name}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Course Selection (for professor reviews) */}
            {type === 'professor' && (
              <FilterDropdown
                label="Which course did you take with this professor?"
                options={courseOptions}
                value={professorReview.courseId}
                onChange={(value) => {
                  setProfessorReview({ ...professorReview, courseId: value });
                  if (errors.courseId) setErrors({ ...errors, courseId: '' });
                }}
                placeholder="Select a course..."
                className="w-full"
              />
            )}
            {errors.courseId && (
              <p className="text-sm text-red-500 -mt-4">{errors.courseId}</p>
            )}

            {/* Overall Rating */}
            <div className="bg-slate-50 rounded-xl p-6">
              <StarRatingInput
                label="Overall Rating"
                value={type === 'professor' ? professorReview.overallRating : courseReview.overallRating}
                onChange={(rating) => {
                  if (type === 'professor') {
                    setProfessorReview({ ...professorReview, overallRating: rating });
                  } else {
                    setCourseReview({ ...courseReview, overallRating: rating });
                  }
                  if (errors.overallRating) setErrors({ ...errors, overallRating: '' });
                }}
                required
                error={errors.overallRating}
              />
            </div>

            {/* Rating Categories */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Rate specific aspects:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {type === 'professor' ? (
                  <>
                    <StarRatingInput
                      label="Clarity of Teaching"
                      value={professorReview.clarity}
                      onChange={(rating) => {
                        setProfessorReview({ ...professorReview, clarity: rating });
                        if (errors.clarity) setErrors({ ...errors, clarity: '' });
                      }}
                      size="md"
                      required
                      error={errors.clarity}
                    />
                    <StarRatingInput
                      label="Helpfulness"
                      value={professorReview.helpfulness}
                      onChange={(rating) => {
                        setProfessorReview({ ...professorReview, helpfulness: rating });
                        if (errors.helpfulness) setErrors({ ...errors, helpfulness: '' });
                      }}
                      size="md"
                      required
                      error={errors.helpfulness}
                    />
                    <StarRatingInput
                      label="Engagement"
                      value={professorReview.engagement}
                      onChange={(rating) => setProfessorReview({ ...professorReview, engagement: rating })}
                      size="md"
                    />
                    <StarRatingInput
                      label="Grading Fairness"
                      value={professorReview.grading}
                      onChange={(rating) => setProfessorReview({ ...professorReview, grading: rating })}
                      size="md"
                    />
                    <StarRatingInput
                      label="Workload"
                      value={professorReview.workload}
                      onChange={(rating) => setProfessorReview({ ...professorReview, workload: rating })}
                      size="md"
                    />
                    <StarRatingInput
                      label="Communication"
                      value={professorReview.communication}
                      onChange={(rating) => setProfessorReview({ ...professorReview, communication: rating })}
                      size="md"
                    />
                  </>
                ) : (
                  <>
                    <StarRatingInput
                      label="Difficulty"
                      value={courseReview.difficulty}
                      onChange={(rating) => {
                        setCourseReview({ ...courseReview, difficulty: rating });
                        if (errors.difficulty) setErrors({ ...errors, difficulty: '' });
                      }}
                      size="md"
                      required
                      error={errors.difficulty}
                    />
                    <StarRatingInput
                      label="Workload"
                      value={courseReview.workload}
                      onChange={(rating) => setCourseReview({ ...courseReview, workload: rating })}
                      size="md"
                    />
                    <StarRatingInput
                      label="Usefulness"
                      value={courseReview.usefulness}
                      onChange={(rating) => {
                        setCourseReview({ ...courseReview, usefulness: rating });
                        if (errors.usefulness) setErrors({ ...errors, usefulness: '' });
                      }}
                      size="md"
                      required
                      error={errors.usefulness}
                    />
                    <StarRatingInput
                      label="Content Quality"
                      value={courseReview.contentQuality}
                      onChange={(rating) => setCourseReview({ ...courseReview, contentQuality: rating })}
                      size="md"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Written Review */}
            <TextArea
              label="Your Review"
              name="comment"
              value={type === 'professor' ? professorReview.comment : courseReview.comment}
              onChange={(e) => {
                const value = e.target.value;
                if (type === 'professor') {
                  setProfessorReview({ ...professorReview, comment: value });
                } else {
                  setCourseReview({ ...courseReview, comment: value });
                }
                if (errors.comment) setErrors({ ...errors, comment: '' });
              }}
              placeholder={`Share your experience with this ${type}. What did you like? What could be improved? Your honest feedback helps other students.`}
              rows={6}
              maxLength={2000}
              required
              error={errors.comment}
            />

            {/* Anonymous Option */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={type === 'professor' ? professorReview.anonymous : courseReview.anonymous}
                onChange={(e) => {
                  if (type === 'professor') {
                    setProfessorReview({ ...professorReview, anonymous: e.target.checked });
                  } else {
                    setCourseReview({ ...courseReview, anonymous: e.target.checked });
                  }
                }}
                className="w-5 h-5 rounded border-slate-300 text-auc-blue-600 focus:ring-auc-blue-500"
              />
              <label htmlFor="anonymous" className="text-slate-700">
                Post anonymously (recommended)
              </label>
            </div>

            {/* Guidelines */}
            <div className="bg-auc-blue-50 rounded-xl p-4">
              <h4 className="font-medium text-auc-blue-900 mb-2">Review Guidelines</h4>
              <ul className="text-sm text-auc-blue-700 space-y-1">
                <li>Be honest and constructive in your feedback</li>
                <li>Focus on the academic aspects of your experience</li>
                <li>Avoid personal attacks or inappropriate language</li>
                <li>Your review will be visible to all AUC students</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-slate-100">
              <Button
                to={`/${type}/${id}`}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                icon={<FaPaperPlane />}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitReviewPage;
