import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGraduationCap, FaUser } from 'react-icons/fa';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    major: '',
    graduationYear: new Date().getFullYear() + 4,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    const aucEmailRegex = /^[a-zA-Z0-9._%+-]+@aucegypt\.edu$/;
    return aucEmailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please use your @aucegypt.edu email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Signup-specific validation
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.firstName || !formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }

      if (!formData.lastName || !formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      if (!formData.major || !formData.major.trim()) {
        newErrors.major = 'Major is required';
      }

      if (!formData.graduationYear || formData.graduationYear < new Date().getFullYear()) {
        newErrors.graduationYear = 'Please enter a valid graduation year';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    if (serverError) {
      setServerError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          major: formData.major,
          graduationYear: parseInt(formData.graduationYear),
        });
      }

      if (result.success) {
        if (isLogin) {
          setSuccessMessage('Login successful! Redirecting...');
          setTimeout(() => {
            navigate('/home');
          }, 800);
        } else {
          setSuccessMessage(result.message || 'Account created successfully! Please log in.');
          setIsLogin(true);
          setFormData((prev) => ({
            ...prev,
            password: '',
            confirmPassword: '',
          }));
        }
      } else {
        setServerError(result.message || 'Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setServerError('');
    setSuccessMessage('');
    setFormData((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-auc-blue-900 via-auc-blue-800 to-auc-blue-900 flex items-center justify-center px-4 py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-auc-gold-500 rounded-2xl mb-4 shadow-lg">
            <FaGraduationCap className="text-auc-blue-900 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            ProfLens<span className="text-auc-gold-500">AUC</span>
          </h1>
          <p className="text-auc-blue-200 mt-2">
            Professor & Course Reviews for AUC Students
          </p>
        </div>

        {/* Login/Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Tab Switcher */}
          <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
            <button
              onClick={switchMode}
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                isLogin
                  ? 'bg-white text-auc-blue-600 shadow'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={switchMode}
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                !isLogin
                  ? 'bg-white text-auc-blue-600 shadow'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    error={errors.firstName}
                    required
                    icon={<FaUser />}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    error={errors.lastName}
                    required
                    icon={<FaUser />}
                  />
                </div>
              </>
            )}

            <Input
              type="email"
              name="email"
              label="AUC Email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="yourname@aucegypt.edu"
              error={errors.email}
              required
              icon={<FaEnvelope />}
            />

            <Input
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors.password}
              required
              icon={<FaLock />}
            />

            {!isLogin && (
              <>
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                  required
                  icon={<FaLock />}
                />

                <Input
                  type="text"
                  name="major"
                  label="Major"
                  value={formData.major}
                  onChange={handleInputChange}
                  placeholder="Computer Science"
                  error={errors.major}
                  required
                />

                <Input
                  type="number"
                  name="graduationYear"
                  label="Expected Graduation Year"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  placeholder="2025"
                  error={errors.graduationYear}
                  required
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 10}
                />
              </>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-auc-blue-600 focus:ring-auc-blue-500"
                  />
                  <span className="ml-2 text-slate-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-auc-blue-600 hover:text-auc-blue-800"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-auc-blue-50 rounded-lg">
            <p className="text-sm text-auc-blue-700">
              <strong>Note:</strong> Only AUC students with @aucegypt.edu email addresses can access ProfLens AUC.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-auc-blue-300 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
