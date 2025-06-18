import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/auth-provider';
import { User, Mail, Key, Calendar, BookOpen, Activity } from 'lucide-react';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalDownloads: 0,
    dateJoined: new Date(user?.createdAt || Date.now()).toLocaleDateString()
  });

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axiosInstance.get('/user/stats');
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords if changing
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('New passwords do not match');
          return;
        }
        if (!formData.currentPassword) {
          toast.error('Current password is required to set new password');
          return;
        }
      }

      const response = await axiosInstance.put('/user/profile', {
        username: formData.username,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // Reset password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="p-3 bg-blue-100 rounded-full">
        <Icon className="text-blue-600" size={24} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-3xl text-white font-bold">
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={BookOpen}
            title="Total Resources"
            value={stats.totalResources}
          />
          <StatCard
            icon={Activity}
            title="Total Downloads"
            value={stats.totalDownloads}
          />
          <StatCard
            icon={Calendar}
            title="Member Since"
            value={stats.dateJoined}
          />
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
            
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  readOnly
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
            </div>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  minLength={6}
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile; 