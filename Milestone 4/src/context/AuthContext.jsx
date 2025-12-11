import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await authAPI.getMe();
          setUser(response.data.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Login failed. Please try again.';

      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        message = 'Cannot connect to server. Please ensure the backend is running on port 5000.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 401) {
        message = 'Invalid email or password.';
      } else if (error.response?.status === 404) {
        message = 'Backend API not found. Is the server running?';
      }

      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user: newUser } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));

      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      let message = 'Registration failed. Please try again.';

      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        message = 'Cannot connect to server. Please ensure the backend is running on port 5000.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 400) {
        message = error.response.data?.message || 'Invalid registration data. Please check all fields.';
      } else if (error.response?.status === 409) {
        message = 'This email is already registered. Please login instead.';
      } else if (error.response?.status === 404) {
        message = 'Backend API not found. Is the server running?';
      }

      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
