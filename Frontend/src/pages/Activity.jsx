import React, { useState, useEffect } from 'react';
import { Download, Star, MessageSquare, FileText, Clock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useAuth } from '../auth/auth-provider';

function Activity() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchActivities();
  }, [user, navigate, activeTab]);

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      try {
        const response = await axiosInstance.get('/users/activity', {
          params: {
            type: activeTab !== 'all' ? activeTab : undefined
          }
        });
        
        setActivities(Array.isArray(response.data) ? response.data : []);
      } catch (apiError) {
        console.error('API not implemented yet, using mock data:', apiError);
        // Use the mock data defined below
        setActivities(mockActivities);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to load activity data. Please try again later.');
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for demonstration
  const mockActivities = [
    {
      _id: '1',
      type: 'download',
      resource: {
        _id: 'res1',
        title: 'Computer Science Fundamentals',
        type: 'Notes',
        subject: 'Introduction to Computer Science'
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    {
      _id: '2',
      type: 'rating',
      resource: {
        _id: 'res2',
        title: 'Data Structures and Algorithms',
        type: 'Books',
        subject: 'Data Structures'
      },
      value: 4,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
    },
    {
      _id: '3',
      type: 'comment',
      resource: {
        _id: 'res3',
        title: 'Operating Systems Previous Year Questions',
        type: 'PYQS',
        subject: 'Operating Systems'
      },
      comment: 'This was really helpful for my exam preparation. Thanks for sharing!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
    }
  ];

  // Function to format time ago
  const getTimeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    if (interval === 1) return '1 year ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    if (interval === 1) return '1 month ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return '1 day ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return '1 hour ago';
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return '1 minute ago';
    
    return 'just now';
  };

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = () => {
      switch (activity.type) {
        case 'download':
          return <Download className="w-5 h-5 text-green-500" />;
        case 'rating':
          return <Star className="w-5 h-5 text-yellow-500" />;
        case 'comment':
          return <MessageSquare className="w-5 h-5 text-blue-500" />;
        default:
          return <FileText className="w-5 h-5 text-gray-500" />;
      }
    };
    
    const getActivityText = () => {
      switch (activity.type) {
        case 'download':
          return `You downloaded "${activity.resource.title}"`;
        case 'rating':
          return `You rated "${activity.resource.title}" ${activity.value} stars`;
        case 'comment':
          return `You commented on "${activity.resource.title}"`;
        default:
          return `You interacted with "${activity.resource.title}"`;
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getActivityIcon()}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-800 mb-1">
              {getActivityText()}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                {activity.resource.type}
              </span>
              {activity.resource.subject && (
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                  {activity.resource.subject}
                </span>
              )}
            </div>
            
            {activity.type === 'comment' && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mb-2 italic">
                "{activity.comment}"
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>{getTimeAgo(activity.createdAt)}</span>
              </div>
              
              <Link
                to={`/resource/${activity.resource._id}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Resource
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Activity</h1>
        <p className="text-gray-600 mt-1">Track your interactions with resources</p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          className={`py-3 px-4 font-medium whitespace-nowrap ${
            activeTab === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Activity
        </button>
        <button
          className={`py-3 px-4 font-medium whitespace-nowrap ${
            activeTab === 'download'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('download')}
        >
          Downloads
        </button>
        <button
          className={`py-3 px-4 font-medium whitespace-nowrap ${
            activeTab === 'rating'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('rating')}
        >
          Ratings
        </button>
        <button
          className={`py-3 px-4 font-medium whitespace-nowrap ${
            activeTab === 'comment'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('comment')}
        >
          Comments
        </button>
      </div>
      
      {/* Activities List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={40} className="animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
          {error}
        </div>
      ) : mockActivities.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-4 flex justify-center">
            <Clock size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No activity yet</h3>
          <p className="text-gray-600">
            Your recent interactions with resources will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockActivities
            .filter(activity => activeTab === 'all' || activity.type === activeTab)
            .map(activity => (
              <ActivityItem key={activity._id} activity={activity} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Activity; 