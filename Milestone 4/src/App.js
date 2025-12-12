import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfessorReviewPage from './pages/ProfessorReviewPage';
import CourseReviewPage from './pages/CourseReviewPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/professor/:id"
            element={
              <ProtectedRoute>
                <ProfessorReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <CourseReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-review/:type/:id"
            element={
              <ProtectedRoute>
                <SubmitReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
