import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Eye, 
  AlertTriangle,
  Download
} from 'lucide-react';
import axiosInstance from '../api/axios';
import { useAuth } from '../auth/auth-provider';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingResources, setPendingResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/unauthorized');
      return;
    }
    
    fetchPendingResources();
  }, [user, navigate]);

  const fetchPendingResources = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/resources/pending');
      setPendingResources(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching pending resources:', error);
      setError('Failed to load pending resources. Please try again later.');
      
      // Use mock data for demonstration
      setPendingResources(mockPendingResources);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveReject = async (id, status) => {
    try {
      await axiosInstance.put(`/resources/${id}/approve`, { status });
      // Remove from list
      setPendingResources(pendingResources.filter(resource => resource._id !== id));
    } catch (error) {
      console.error(`Error ${status === 'approved' ? 'approving' : 'rejecting'} resource:`, error);
      alert(`Failed to ${status === 'approved' ? 'approve' : 'reject'} resource`);
    }
  };

  // Mock data for demonstration
  const mockPendingResources = [
    {
      _id: '1',
      title: 'Computer Science Fundamentals',
      description: 'Comprehensive notes covering basic computer science concepts',
      branch: 'Computer Science',
      year: 'First Year',
      type: 'Notes',
      semester: 'Semester 1',
      subject: 'Introduction to Computer Science',
      createdAt: new Date().toISOString(),
      fileUrl: 'https://example.com/files/cs-fundamentals.pdf',
      user: {
        _id: 'user123',
        username: 'johndoe'
      }
    },
    {
      _id: '2',
      title: 'Data Structures and Algorithms',
      description: 'Complete guide to data structures with implementation examples',
      branch: 'Computer Science',
      year: 'Second Year',
      type: 'Notes',
      semester: 'Semester 3',
      subject: 'Data Structures',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      fileUrl: 'https://example.com/files/dsa.pdf',
      user: {
        _id: 'user456',
        username: 'janedoe'
      }
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage resources and users</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-3 px-4 font-medium whitespace-nowrap ${
            activeTab === 'pending'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <span>Pending Resources</span>
            {pendingResources.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                {pendingResources.length}
              </span>
            )}
          </div>
        </button>
        <button
          className={`py-3 px-4 font-medium whitespace-nowrap ${
            activeTab === 'users'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>User Management</span>
          </div>
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'pending' ? (
        <>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-yellow-800">Resource Approval</h3>
              <p className="text-yellow-700 text-sm">
                Review and approve resources submitted by users. Approved resources will be available to all users.
              </p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 size={40} className="animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
              {error}
            </div>
          ) : pendingResources.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No pending resources</h3>
              <p className="text-gray-600">
                All resources have been reviewed. Check back later for new submissions.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingResources.map(resource => (
                <div key={resource._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h2>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                            {resource.type}
                          </span>
                          <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                            {resource.branch}
                          </span>
                          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                            {resource.year}
                          </span>
                          {resource.semester && (
                            <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
                              {resource.semester}
                            </span>
                          )}
                          {resource.subject && (
                            <span className="px-2.5 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-full">
                              {resource.subject}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Submitted by: {resource.user?.username || 'Anonymous'}</span>
                          <span>Date: {formatDate(resource.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Eye size={18} />
                          <span>Preview</span>
                        </a>
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Download size={18} />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 flex items-center justify-end gap-3 border-t border-gray-100">
                    <button
                      onClick={() => handleApproveReject(resource._id, 'rejected')}
                      className="flex items-center gap-2 py-2 px-4 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={18} />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApproveReject(resource._id, 'approved')}
                      className="flex items-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle size={18} />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-600">
            User management functionality coming soon.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard; 