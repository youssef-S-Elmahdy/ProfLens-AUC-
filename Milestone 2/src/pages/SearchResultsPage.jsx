import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FaSearch,
  FaChalkboardTeacher,
  FaBook,
  FaFilter,
  FaTimes,
  FaSortAmountDown,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ProfessorCard from '../components/ProfessorCard';
import CourseCard from '../components/CourseCard';
import FilterDropdown from '../components/FilterDropdown';
import { professors, courses, departments, searchAll } from '../data/mockData';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('professors');
  const [filteredProfessors, setFilteredProfessors] = useState(professors);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [departmentFilter, setDepartmentFilter] = useState(searchParams.get('department') || 'all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    applyFilters();
  }, [searchQuery, departmentFilter, ratingFilter, sortBy, activeTab]);

  const applyFilters = () => {
    let profs = [...professors];
    let crses = [...courses];

    // Search filter
    if (searchQuery.trim()) {
      const results = searchAll(searchQuery);
      profs = results.professors;
      crses = results.courses;
    }

    // Department filter
    if (departmentFilter !== 'all') {
      profs = profs.filter((p) => p.department === departmentFilter);
      crses = crses.filter((c) => c.department === departmentFilter);
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      const minRating = parseFloat(ratingFilter);
      profs = profs.filter((p) => p.overallRating >= minRating);
      crses = crses.filter((c) => c.overallRating >= minRating);
    }

    // Sorting
    const sortFn = (a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.overallRating - a.overallRating;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        case 'name':
          if (a.firstName) {
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          }
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    };

    profs.sort(sortFn);
    crses.sort(sortFn);

    setFilteredProfessors(profs);
    setFilteredCourses(crses);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const clearFilters = () => {
    setDepartmentFilter('all');
    setRatingFilter('all');
    setSortBy('rating');
    setSearchQuery('');
    setSearchParams({});
  };

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...departments.map((d) => ({ value: d.id, label: d.name })),
  ];

  const ratingOptions = [
    { value: 'all', label: 'Any Rating' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '3.0', label: '3.0+ Stars' },
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'name', label: 'Alphabetical' },
  ];

  const hasActiveFilters = departmentFilter !== 'all' || ratingFilter !== 'all' || searchQuery;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Browse & Search
          </h1>
          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search professors, courses, or departments..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-auc-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-slate-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('professors')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'professors'
                  ? 'bg-white text-auc-blue-600 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaChalkboardTeacher className="mr-2" />
              Professors ({filteredProfessors.length})
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'courses'
                  ? 'bg-white text-auc-blue-600 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaBook className="mr-2" />
              Courses ({filteredCourses.length})
            </button>
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700"
          >
            <FaFilter className="mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-auc-blue-600 rounded-full" />
            )}
          </button>

          {/* Filters (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <FilterDropdown
              options={departmentOptions}
              value={departmentFilter}
              onChange={setDepartmentFilter}
              placeholder="Department"
              className="w-48"
            />
            <FilterDropdown
              options={ratingOptions}
              value={ratingFilter}
              onChange={setRatingFilter}
              placeholder="Rating"
              className="w-36"
            />
            <FilterDropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort By"
              className="w-40"
            />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-auc-blue-600 hover:text-auc-blue-800"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="lg:hidden bg-white rounded-xl shadow-md p-4 mb-6 animate-slide-down">
            <div className="space-y-4">
              <FilterDropdown
                label="Department"
                options={departmentOptions}
                value={departmentFilter}
                onChange={setDepartmentFilter}
              />
              <FilterDropdown
                label="Minimum Rating"
                options={ratingOptions}
                value={ratingFilter}
                onChange={setRatingFilter}
              />
              <FilterDropdown
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-auc-blue-600 hover:text-auc-blue-800 border border-auc-blue-200 rounded-lg"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 bg-auc-blue-100 text-auc-blue-700 text-sm rounded-full">
                Search: "{searchQuery}"
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="ml-2 hover:text-auc-blue-900"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            )}
            {departmentFilter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 bg-auc-blue-100 text-auc-blue-700 text-sm rounded-full">
                {departments.find((d) => d.id === departmentFilter)?.name}
                <button
                  onClick={() => setDepartmentFilter('all')}
                  className="ml-2 hover:text-auc-blue-900"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            )}
            {ratingFilter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 bg-auc-blue-100 text-auc-blue-700 text-sm rounded-full">
                {ratingFilter}+ Stars
                <button
                  onClick={() => setRatingFilter('all')}
                  className="ml-2 hover:text-auc-blue-900"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {activeTab === 'professors' ? (
          filteredProfessors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessors.map((professor) => (
                <ProfessorCard key={professor.id} professor={professor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaChalkboardTeacher className="text-5xl text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Professors Found</h3>
              <p className="text-slate-500 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="text-auc-blue-600 hover:text-auc-blue-800"
              >
                Clear all filters
              </button>
            </div>
          )
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaBook className="text-5xl text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Courses Found</h3>
            <p className="text-slate-500 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="text-auc-blue-600 hover:text-auc-blue-800"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResultsPage;
