import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaBook, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { professorsAPI, coursesAPI } from '../services/api';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';
  const [professors, setProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('professors');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Search both professors and courses in parallel
        const [professorsResponse, coursesResponse] = await Promise.all([
          professorsAPI.search(searchQuery),
          coursesAPI.search(searchQuery)
        ]);

        setProfessors(professorsResponse.data.data || []);
        setCourses(coursesResponse.data.data || []);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${
              star <= Math.round(rating) ? 'text-auc-gold-500' : 'text-slate-300'
            } text-sm`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-slate-700">{rating?.toFixed(1) || 'N/A'}</span>
      </div>
    );
  };

  const ProfessorCard = ({ professor }) => (
    <div
      onClick={() => navigate(`/professor/${professor._id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group"
    >
      <div className="flex items-center mb-4">
        <div className="bg-auc-blue-100 p-3 rounded-full group-hover:bg-auc-blue-200 transition-colors">
          <FaChalkboardTeacher className="text-auc-blue-600 text-2xl" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-auc-blue-600 transition-colors">
            {professor.name}
          </h3>
          <p className="text-sm text-slate-600">{professor.department}</p>
        </div>
      </div>
      {renderStars(professor.averageRating)}
      <div className="mt-4 text-sm text-slate-600">
        <p>{professor.reviewCount || 0} reviews</p>
      </div>
    </div>
  );

  const CourseCard = ({ course }) => (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group"
    >
      <div className="flex items-center mb-4">
        <div className="bg-auc-gold-100 p-3 rounded-full group-hover:bg-auc-gold-200 transition-colors">
          <FaBook className="text-auc-gold-600 text-2xl" />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-auc-blue-600 transition-colors">
            {course.code}
          </h3>
          <p className="text-sm text-slate-600">{course.name}</p>
        </div>
      </div>
      {renderStars(course.averageRating)}
      <div className="mt-4 text-sm text-slate-600">
        <p>{course.reviewCount || 0} reviews</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Search Results
          </h1>
          {searchQuery && (
            <p className="text-slate-600">
              Showing results for: <span className="font-semibold">{searchQuery}</span>
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-auc-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Searching...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('professors')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'professors'
                    ? 'text-auc-blue-600 border-b-2 border-auc-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Professors ({professors.length})
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === 'courses'
                    ? 'text-auc-blue-600 border-b-2 border-auc-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Courses ({courses.length})
              </button>
            </div>

            {/* Results Grid */}
            {activeTab === 'professors' && (
              <>
                {professors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professors.map((professor) => (
                      <ProfessorCard key={professor._id} professor={professor} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-slate-600">No professors found matching your search.</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'courses' && (
              <>
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-slate-600">No courses found matching your search.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
