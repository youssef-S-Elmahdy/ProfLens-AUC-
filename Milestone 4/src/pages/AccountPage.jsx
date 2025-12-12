import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const AccountPage = () => {
  const { user, updateUser, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const hasLoadedRef = useRef(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    major: user?.major || '',
    graduationYear: user?.graduationYear || '',
  });

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const fetchProfile = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await authAPI.getMe({
          headers: { 'Cache-Control': 'no-cache' },
        });
        const fetchedUser =
          response?.data?.data?.user || (response?.status === 304 ? user : null) || user;
        setProfile(fetchedUser);
        updateUser(fetchedUser);
        setFormData({
          firstName: fetchedUser?.firstName || '',
          lastName: fetchedUser?.lastName || '',
          major: fetchedUser?.major || '',
          graduationYear: fetchedUser?.graduationYear || '',
        });
      } catch (err) {
        console.error('Failed to load account info:', err);
        if (user) {
          setProfile(user);
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            major: user.major || '',
            graduationYear: user.graduationYear || '',
          });
        } else {
          const message =
            err.code === 'ERR_NETWORK'
              ? 'Cannot connect to the server. Please try again.'
              : err.response?.data?.message || 'Unable to load your account information.';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [updateUser, user]);

  const formatDate = (value) => {
    if (!value) return 'N/A';
    return new Date(value).toLocaleDateString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess('');
    setError(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError(null);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        major: formData.major,
        graduationYear: formData.graduationYear ? parseInt(formData.graduationYear, 10) : '',
      };
      const response = await authAPI.updateProfile(payload);
      const updatedUser = response.data?.data?.user || { ...profile, ...payload };
      setProfile(updatedUser);
      updateUser(updatedUser);
      setSuccess(response.data?.message || 'Profile updated successfully.');
      setFormData({
        firstName: updatedUser.firstName || '',
        lastName: updatedUser.lastName || '',
        major: updatedUser.major || '',
        graduationYear: updatedUser.graduationYear || '',
      });
    } catch (err) {
      console.error('Profile update failed:', err);
      const message =
        err.code === 'ERR_NETWORK'
          ? 'Cannot connect to the server. Please try again.'
          : err.response?.status === 429
          ? 'Too many requests. Please wait and try again.'
          : err.response?.data?.message || err.message || 'Failed to update profile.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Account</h1>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-auc-blue-900 to-auc-blue-700 px-6 py-6 text-white flex items-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase">
              {profile?.firstName?.[0]}
              {profile?.lastName?.[0]}
            </div>
            <div className="ml-4">
              <p className="text-sm text-auc-blue-200">Signed in as</p>
              <h2 className="text-xl font-semibold">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <p className="text-auc-blue-100 text-sm">{profile?.email}</p>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                {success}
              </div>
            )}

            {loading ? (
              <p className="text-slate-600">Loading account details...</p>
            ) : (
              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-auc-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-auc-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Email</label>
                  <input
                    value={profile?.email || ''}
                    disabled
                    className="border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Role</label>
                  <input
                    value={(profile?.role || 'student').toUpperCase()}
                    disabled
                    className="border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Major</label>
                  <input
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-auc-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Graduation Year</label>
                  <input
                    name="graduationYear"
                    type="number"
                    min="2020"
                    max="2100"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-auc-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Joined</label>
                  <input
                    value={formatDate(profile?.createdAt)}
                    disabled
                    className="border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold text-slate-600 mb-1">Last Updated</label>
                  <input
                    value={formatDate(profile?.updatedAt)}
                    disabled
                    className="border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-3 py-2"
                  />
                </div>

                <div className="md:col-span-2 flex justify-between items-center pt-2">
                  <Button type="button" variant="outline" onClick={logout}>
                    Sign out
                  </Button>
                  <Button type="submit" variant="primary">
                    Save changes
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
