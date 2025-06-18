import React, { useState, useEffect } from 'react';
import { FileText, Upload, Edit, Trash2, Eye, Download, Filter, Loader2, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../auth/auth-provider';

function MyResources() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('uploaded');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    subject: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchResources();
  }, [user, navigate, activeTab, filters]);

  const fetchResources = async () => {
    setIsLoading(true);
    try {
      let endpoint = '/resources/user';
      if (activeTab === 'bookmarked') {
        endpoint = '/resources/bookmarked';
      }
      
      // Try to fetch from API, but use mock data for now
      try {
        const response = await axiosInstance.get(endpoint, {
          params: {
            type: filters.type !== 'all' ? filters.type : undefined,
            subject: filters.subject || undefined,
            sort: filters.sortBy
          }
        });
        
        setResources(Array.isArray(response.data) ? response.data : []);
      } catch (apiError) {
        console.error('API not implemented yet, using mock data:', apiError);
        // Mock data for demonstration
        const mockResources = [
          {
            _id: '1',
            title: 'Computer Science Fundamentals',
            description: 'Comprehensive notes covering basic computer science concepts',
            branch: 'Computer Science',
            year: 'First Year',
            type: 'Notes',
            semester: 'Semester 1',
            subject: 'Introduction to Computer Science',
            downloads: 45,
            averageRating: 4.5,
            createdAt: new Date().toISOString(),
            fileUrl: 'https://example.com/files/cs-fundamentals.pdf'
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
            downloads: 78,
            averageRating: 4.8,
            createdAt: new Date().toISOString(),
            fileUrl: 'https://example.com/files/dsa.pdf'
          }
        ];
        
        setResources(mockResources);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to load resources. Please try again later.');
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await axiosInstance.delete(`/resources/${id}`);
        setResources(resources.filter(resource => resource._id !== id));
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert('Failed to delete resource');
      }
    }
  };

  const ResourceCard = ({ resource }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {resource.description}
              </p>
              
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
                {resource.status && (
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    resource.status === 'approved' 
                      ? 'bg-green-50 text-green-700' 
                      : resource.status === 'rejected'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <span className="flex items-center gap-1">
                  <Download size={14} />
                  {resource.downloads || 0}
                </span>
                
                {resource.averageRating > 0 && (
                  <span className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xs">
                        {i < Math.round(resource.averageRating) ? '★' : '☆'}
                      </span>
                    ))}
                    <span className="text-gray-500">({resource.averageRating.toFixed(1)})</span>
                  </span>
                )}
                
                <span className="text-gray-400">
                  {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to={`/resource/${resource._id}`}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye size={18} />
          </Link>
          <a 
            href={resource.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Download size={18} />
          </a>
        </div>
        
        {activeTab === 'uploaded' && (
          <div className="flex items-center gap-2">
            <Link
              to={`/edit-resource/${resource._id}`}
              className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={() => handleDeleteResource(resource._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resources</h1>
          <p className="text-gray-600 mt-1">Manage your uploaded and bookmarked resources</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 py-2 px-3 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          
          <Link
            to="/upload-resource"
            className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Upload size={16} />
            <span>Upload New</span>
          </Link>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-4 font-medium ${
            activeTab === 'uploaded'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('uploaded')}
        >
          Uploaded by Me
        </button>
        <button
          className={`py-3 px-4 font-medium ${
            activeTab === 'bookmarked'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('bookmarked')}
        >
          Bookmarked
        </button>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="all">All Types</option>
                <option value="Notes">Notes</option>
                <option value="PYQS">PYQS</option>
                <option value="Books">Books</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Filter by subject..."
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Downloaded</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Resources List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={40} className="animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
          {error}
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-4 flex justify-center">
            {activeTab === 'uploaded' ? (
              <Upload size={48} className="text-gray-400" />
            ) : (
              <FileText size={48} className="text-gray-400" />
            )}
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {activeTab === 'uploaded' 
              ? "You haven't uploaded any resources yet" 
              : "You haven't bookmarked any resources yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'uploaded'
              ? "Your uploaded resources will appear here once approved by an admin"
              : "Bookmark resources to easily find them later"}
          </p>
          {activeTab === 'uploaded' && (
            <Link
              to="/upload-resource"
              className="inline-flex items-center gap-2 py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              <span>Upload Your First Resource</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {Array.isArray(resources) && resources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResources; 