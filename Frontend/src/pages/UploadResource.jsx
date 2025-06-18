import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import axiosInstance from '../api/axios';
import { useAuth } from '../auth/auth-provider';

function UploadResource() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    branch: '',
    year: '',
    type: '',
    semester: '',
    subject: '',
    fileUrl: '' // In a real app, you would upload to cloud storage and get a URL
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Filter options for dropdowns
  const filterOptions = {
    branches: [
      'Computer Science',
      'Information Technology',
      'Electronics',
      'Mechanical',
      'Civil',
      'EXTC',
      'Electrical',
      'Production'
    ],
    years: [
      'First Year',
      'Second Year',
      'Third Year',
      'Fourth Year'
    ],
    types: [
      'Notes',
      'PYQS',
      'Books'
    ],
    semesters: [
      'Semester 1',
      'Semester 2',
      'Semester 3',
      'Semester 4',
      'Semester 5',
      'Semester 6',
      'Semester 7',
      'Semester 8'
    ]
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Submit as a request (not direct upload)
      const response = await axiosInstance.post('/resources/request', formData);
      
      setSubmitStatus({
        success: true,
        message: 'Your resource has been submitted for approval'
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        branch: '',
        year: '',
        type: '',
        semester: '',
        subject: '',
        fileUrl: ''
      });
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/my-resources');
      }, 2000);
    } catch (error) {
      console.error('Error submitting resource:', error);
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || 'Failed to submit resource'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload Resource</h1>
        <p className="text-gray-600 mt-1">Share educational materials with other students</p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="font-medium text-yellow-800">Admin Approval Required</h3>
          <p className="text-yellow-700 text-sm">
            All uploaded resources will be reviewed by an administrator before being published. 
            You'll be able to see the status of your uploads in the "My Resources" section.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        {submitStatus && (
          <div className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
            submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {submitStatus.success ? (
              <CheckCircle className="flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="flex-shrink-0" size={20} />
            )}
            <span>{submitStatus.message}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="e.g., Data Structures Notes"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Describe the resource content..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                Branch *
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Select Branch</option>
                {filterOptions.branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year *
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Select Year</option>
                {filterOptions.years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Select Type</option>
                {filterOptions.types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                Semester *
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="">Select Semester</option>
                {filterOptions.semesters.map(semester => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-8">
            <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-1">
              File URL *
            </label>
            <input
              type="url"
              id="fileUrl"
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="https://example.com/file.pdf"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a URL to your file. In a real app, you would upload the file directly.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 py-2.5 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span>Submit for Approval</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadResource; 