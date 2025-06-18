import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Download, 
  Calendar, 
  User, 
  BookOpen, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react';
import axiosInstance from '../api/axios';
import { useAuth } from '../auth/auth-provider';

function ResourceDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axiosInstance.get(`/resources/${id}`);
        setResource(response.data);
        
        // If user is logged in, check if resource is bookmarked
        if (user) {
          try {
            const bookmarkResponse = await axiosInstance.get(`/resources/${id}/bookmark`);
            setIsBookmarked(bookmarkResponse.data.isBookmarked);
          } catch (bookmarkError) {
            console.error('Error checking bookmark status:', bookmarkError);
          }
        }
        
        // Fetch ratings
        try {
          const ratingsResponse = await axiosInstance.get(`/resources/${id}/ratings`);
          setRatings(ratingsResponse.data.ratings || []);
        } catch (ratingsError) {
          console.error('Error fetching ratings:', ratingsError);
        }
      } catch (error) {
        console.error('Error fetching resource:', error);
        setError('Failed to load resource');
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id, user]);

  const handleDownload = async () => {
    try {
      await axiosInstance.post(`/resources/${id}/download`);
      // Open the file URL in a new tab
      if (resource && resource.fileUrl) {
        window.open(resource.fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Error recording download:', error);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!user) {
      // Redirect to login or show login prompt
      return;
    }

    try {
      const response = await axiosInstance.post(`/resources/${id}/bookmark`);
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      // Redirect to login or show login prompt
      return;
    }

    if (rating < 1) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(`/resources/${id}/rate`, {
        value: rating,
        comment
      });
      
      // Refresh ratings
      const ratingsResponse = await axiosInstance.get(`/resources/${id}/ratings`);
      setRatings(ratingsResponse.data.ratings || []);
      
      // Update resource average rating
      setResource(prev => ({
        ...prev,
        averageRating: response.data.averageRating
      }));
      
      // Reset form
      setComment('');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting rating:', error);
      setIsSubmitting(false);
    }
  };

  // Mock data for demonstration
  const mockResource = {
    _id: id,
    title: 'Computer Science Fundamentals',
    description: 'Comprehensive notes covering basic computer science concepts including algorithms, data structures, and programming paradigms.',
    branch: 'Computer Science',
    year: 'First Year',
    type: 'Notes',
    semester: 'Semester 1',
    subject: 'Introduction to Computer Science',
    downloads: 45,
    averageRating: 4.5,
    createdAt: new Date().toISOString(),
    fileUrl: 'https://example.com/files/cs-fundamentals.pdf',
    user: {
      _id: 'user123',
      username: 'johndoe'
    }
  };

  const mockRatings = [
    {
      _id: 'r1',
      user: {
        _id: 'user456',
        username: 'alice'
      },
      value: 5,
      comment: 'Excellent notes, very comprehensive!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
    },
    {
      _id: 'r2',
      user: {
        _id: 'user789',
        username: 'bob'
      },
      value: 4,
      comment: 'Very helpful for my exam preparation',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
    }
  ];

  // Use mock data if API fails
  const displayResource = resource || mockResource;
  const displayRatings = ratings.length > 0 ? ratings : mockRatings;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
          {error}
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Resource Header */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{displayResource.title}</h1>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleBookmarkToggle}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck size={18} />
                    <span>Bookmarked</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={18} />
                    <span>Bookmark</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
              {displayResource.type}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              {displayResource.branch}
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">
              {displayResource.year}
            </span>
            {displayResource.semester && (
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full">
                {displayResource.semester}
              </span>
            )}
            {displayResource.subject && (
              <span className="px-3 py-1 bg-pink-50 text-pink-700 text-sm font-medium rounded-full">
                {displayResource.subject}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(displayResource.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{displayResource.user?.username || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download size={16} />
              <span>{displayResource.downloads || 0} downloads</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.round(displayResource.averageRating || 0) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span>({displayResource.averageRating?.toFixed(1) || '0.0'})</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto">
            <button
              className={`py-4 px-6 font-medium ${
                activeTab === 'details'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button
              className={`py-4 px-6 font-medium ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === 'details' ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {displayResource.description}
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resource Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Branch</h3>
                  <p className="text-gray-900">{displayResource.branch}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Year</h3>
                  <p className="text-gray-900">{displayResource.year}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                  <p className="text-gray-900">{displayResource.type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Semester</h3>
                  <p className="text-gray-900">{displayResource.semester}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Subject</h3>
                  <p className="text-gray-900">{displayResource.subject}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Uploaded On</h3>
                  <p className="text-gray-900">{formatDate(displayResource.createdAt)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews & Ratings</h2>
              
              {user ? (
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Write a Review</h3>
                  <form onSubmit={handleRatingSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Rating
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              size={24}
                              className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                              fill={star <= rating ? 'currentColor' : 'none'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Comment (Optional)
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Share your thoughts about this resource..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || rating < 1}
                      className="flex items-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Submit Review</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg mb-8 text-center">
                  <p className="text-blue-700 mb-2">Sign in to leave a review</p>
                  <Link
                    to="/login"
                    className="inline-block py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
              
              {displayRatings.length > 0 ? (
                <div className="space-y-6">
                  {displayRatings.map((rating) => (
                    <div key={rating._id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">
                            {rating.user?.username || 'Anonymous'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(rating.createdAt)}
                          </div>
                        </div>
                        <div className="flex text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < rating.value ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      {rating.comment && (
                        <p className="text-gray-600">{rating.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
                  <p>No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourceDetail; 