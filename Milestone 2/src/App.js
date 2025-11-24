import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfessorReviewPage from './pages/ProfessorReviewPage';
import CourseReviewPage from './pages/CourseReviewPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SubmitReviewPage from './pages/SubmitReviewPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/professor/:id" element={<ProfessorReviewPage />} />
        <Route path="/course/:id" element={<CourseReviewPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/submit-review/:type/:id" element={<SubmitReviewPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
