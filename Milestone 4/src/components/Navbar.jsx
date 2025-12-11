import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { searchAll } from '../data/mockData';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ professors: [], courses: [] });
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length >= 2) {
      const results = searchAll(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults({ professors: [], courses: [] });
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleResultClick = (type, id) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/${type}/${id}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-auc-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-auc-gold-500 rounded-lg flex items-center justify-center">
              <span className="text-auc-blue-900 font-bold text-2xl">P</span>
            </div>
            <span className="text-white font-semibold text-2xl hidden sm:block">
              ProfLens<span className="text-auc-gold-500">AUC</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-2xl mx-10 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search professors, courses, departments..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  onFocus={() => searchQuery.trim().length >= 2 && setShowResults(true)}
                  className="w-full pl-12 pr-5 py-3 text-base rounded-lg bg-auc-blue-800 text-white placeholder-slate-400 border border-auc-blue-700 focus:outline-none focus:ring-2 focus:ring-auc-gold-500 focus:border-transparent transition-all"
                />
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showResults && (searchResults.professors.length > 0 || searchResults.courses.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 max-h-96 overflow-y-auto animate-slide-down">
                {searchResults.professors.length > 0 && (
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase px-3 py-1">Professors</h4>
                    {searchResults.professors.slice(0, 3).map(prof => (
                      <button
                        key={prof.id}
                        onClick={() => handleResultClick('professor', prof.id)}
                        className="w-full text-left px-3 py-3 hover:bg-slate-100 rounded-md flex items-center space-x-3"
                      >
                        <div className="w-10 h-10 bg-auc-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-auc-blue-600 font-medium">
                            {prof.firstName[0]}{prof.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-base font-medium text-slate-900">{prof.firstName} {prof.lastName}</p>
                          <p className="text-sm text-slate-500">{prof.departmentName}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchResults.courses.length > 0 && (
                  <div className="p-3 border-t border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-500 uppercase px-3 py-1">Courses</h4>
                    {searchResults.courses.slice(0, 3).map(course => (
                      <button
                        key={course.id}
                        onClick={() => handleResultClick('course', course.id)}
                        className="w-full text-left px-3 py-3 hover:bg-slate-100 rounded-md"
                      >
                        <p className="text-base font-medium text-slate-900">{course.code}</p>
                        <p className="text-sm text-slate-500">{course.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                <div className="p-3 border-t border-slate-100">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full text-center text-base text-auc-blue-600 hover:text-auc-blue-800 py-2"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              to="/home"
              className={`px-4 py-2.5 rounded-md text-base font-medium transition-colors ${
                isActive('/home')
                  ? 'bg-auc-blue-800 text-white'
                  : 'text-slate-300 hover:bg-auc-blue-800 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-4 py-2.5 rounded-md text-base font-medium transition-colors ${
                isActive('/search')
                  ? 'bg-auc-blue-800 text-white'
                  : 'text-slate-300 hover:bg-auc-blue-800 hover:text-white'
              }`}
            >
              Browse
            </Link>
            <div className="flex items-center space-x-3 ml-5 pl-5 border-l border-auc-blue-700">
              <FaUserCircle className="text-slate-300 text-2xl" />
              <button
                onClick={handleLogout}
                className="text-slate-300 hover:text-white transition-colors text-xl"
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-auc-blue-800 text-white placeholder-slate-400 border border-auc-blue-700 focus:outline-none focus:ring-2 focus:ring-auc-gold-500"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-auc-blue-800 animate-slide-down">
          <div className="px-6 py-4 space-y-2">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-md text-lg font-medium text-white hover:bg-auc-blue-700"
            >
              Home
            </Link>
            <Link
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-md text-lg font-medium text-white hover:bg-auc-blue-700"
            >
              Browse
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-3 rounded-md text-lg font-medium text-white hover:bg-auc-blue-700 flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
