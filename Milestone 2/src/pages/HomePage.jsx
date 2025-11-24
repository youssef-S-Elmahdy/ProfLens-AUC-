import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChalkboardTeacher, FaBook, FaStar, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ProfessorCard from '../components/ProfessorCard';
import CourseCard from '../components/CourseCard';
import { professors, courses } from '../data/mockData';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('professors');

  // Get top-rated professors and courses
  const topProfessors = [...professors]
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 4);

  const topCourses = [...courses]
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 4);

  const recentlyReviewed = [...professors].slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-auc-blue-900 via-auc-blue-800 to-auc-blue-700 text-white">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Find Your Perfect <span className="text-auc-gold-500">Professor</span>
            </h1>
            <p className="text-xl sm:text-2xl text-auc-blue-200 mb-10 max-w-3xl mx-auto">
              Make informed decisions about your courses with authentic reviews from fellow AUC students.
            </p>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search professors, courses, or departments..."
                  className="w-full pl-14 pr-6 py-5 text-lg rounded-xl text-slate-900 placeholder-slate-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-auc-gold-500/50"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <p className="text-4xl font-bold text-auc-gold-500">150+</p>
                <p className="text-base text-auc-blue-200">Professors</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <p className="text-4xl font-bold text-auc-gold-500">500+</p>
                <p className="text-base text-auc-blue-200">Courses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <p className="text-4xl font-bold text-auc-gold-500">2000+</p>
                <p className="text-base text-auc-blue-200">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="flex space-x-1 bg-slate-100 rounded-lg p-1.5 mb-4 sm:mb-0">
            <button
              onClick={() => setActiveTab('professors')}
              className={`flex items-center px-5 py-2.5 rounded-md text-base font-medium transition-all ${
                activeTab === 'professors'
                  ? 'bg-white text-auc-blue-600 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaChalkboardTeacher className="mr-2" />
              Professors
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center px-5 py-2.5 rounded-md text-base font-medium transition-all ${
                activeTab === 'courses'
                  ? 'bg-white text-auc-blue-600 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FaBook className="mr-2" />
              Courses
            </button>
          </div>

          <Link
            to="/search"
            className="flex items-center text-auc-blue-600 hover:text-auc-blue-800 font-medium text-lg"
          >
            Browse All
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Top Rated Section */}
        <section className="mb-14">
          <div className="flex items-center mb-8">
            <FaStar className="text-auc-gold-500 mr-3 text-xl" />
            <h2 className="text-3xl font-bold text-slate-900">
              Top Rated {activeTab === 'professors' ? 'Professors' : 'Courses'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeTab === 'professors'
              ? topProfessors.map((professor) => (
                  <ProfessorCard key={professor.id} professor={professor} />
                ))
              : topCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
          </div>
        </section>

        {/* Recently Reviewed Section */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Recently Reviewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentlyReviewed.map((professor) => (
              <ProfessorCard key={professor.id} professor={professor} />
            ))}
          </div>
        </section>

        {/* Departments Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Browse by Department</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { name: 'Computer Science', code: 'CSCE', count: 45 },
              { name: 'Business Administration', code: 'BUSN', count: 38 },
              { name: 'Engineering', code: 'ENGR', count: 52 },
              { name: 'Mathematics', code: 'MACT', count: 28 },
              { name: 'Economics', code: 'ECON', count: 32 },
              { name: 'Physics', code: 'PHYS', count: 24 },
              { name: 'Rhetoric', code: 'RHET', count: 18 },
              { name: 'Arabic Studies', code: 'ARIC', count: 22 },
            ].map((dept) => (
              <Link
                key={dept.code}
                to={`/search?department=${dept.code}`}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-auc-blue-200 transition-all group"
              >
                <h3 className="font-semibold text-lg text-slate-900 group-hover:text-auc-blue-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-base text-slate-500 mt-1">{dept.count} professors</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-14 bg-gradient-to-r from-auc-blue-600 to-auc-blue-800 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-5">Share Your Experience</h2>
          <p className="text-lg text-auc-blue-100 mb-8 max-w-2xl mx-auto">
            Help other AUC students make informed decisions by sharing your honest feedback about your professors and courses.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center px-8 py-4 bg-auc-gold-500 text-white font-medium text-lg rounded-lg hover:bg-auc-gold-400 transition-colors"
          >
            Write a Review
            <FaArrowRight className="ml-2" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-auc-blue-900 text-white py-10 mt-14">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-auc-gold-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-auc-blue-900 font-bold text-2xl">P</span>
              </div>
              <span className="font-semibold text-2xl">
                ProfLens<span className="text-auc-gold-500">AUC</span>
              </span>
            </div>
            <p className="text-auc-blue-300 text-base">
              Made by AUC Students, for AUC Students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
