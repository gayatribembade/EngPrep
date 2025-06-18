import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, Filter, ChevronDown, ChevronUp, Loader2, Download } from 'lucide-react';
import axiosInstance from '../api/axios';

function SearchResults() {
  const location = useLocation();
  const { query, filters: initialFilters } = location.state || { 
    query: '', 
    filters: { 
      branch: 'all', 
      year: 'all', 
      type: 'all',
      semester: 'all',
      sort: 'relevance'
    } 
  };
  
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Filter options
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
    ],
    sortOptions: [
      { value: 'relevance', label: 'Most Relevant' },
      { value: 'newest', label: 'Newest First' },
      { value: 'popular', label: 'Most Downloaded' },
      { value: 'rating', label: 'Highest Rated' }
    ]
  };

  // Fetch search results
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get('/resources/search', {
          params: {
            query,
            branch: filters.branch,
            year: filters.year,
            type: filters.type,
            semester: filters.semester,
            sort: filters.sort,
            page: pagination.page,
            limit: pagination.limit
          }
        });

        if (response.data.success) {
          setSearchResults(response.data.results);
          setPagination(response.data.pagination);
        } else {
          setError('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('An error occurred while fetching search results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, filters, pagination.page, pagination.limit]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({
        ...prev,
        page: newPage
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-screen-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          Found {pagination.total} resources matching your search
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-md p-5 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            <div className={`space-y-5 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Branch Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                <select
                  value={filters.branch}
                  onChange={(e) => handleFilterChange('branch', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="all">All Branches</option>
                  {filterOptions.branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="all">All Years</option>
                  {filterOptions.years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="all">All Types</option>
                  {filterOptions.types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Semester Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="all">All Semesters</option>
                  {filterOptions.semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort By Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  {filterOptions.sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:w-3/4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 size={40} className="animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
              {error}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="mb-4 flex justify-center">
                <FileText size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <Link
                  key={result._id}
                  to={`/resource/${result._id}`}
                  className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        {result.thumbnail ? (
                          <img 
                            src={result.thumbnail} 
                            alt={result.title} 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <FileText className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {result.title}
                        </h3>
                        {result.fileType && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                            {result.fileType}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {result.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                            {result.type}
                          </span>
                          <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                            {result.branch}
                          </span>
                          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                            {result.year}
                          </span>
                          {result.semester && (
                            <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded-full">
                              {result.semester}
                            </span>
                          )}
                          {result.subject && (
                            <span className="px-2.5 py-1 bg-pink-50 text-pink-700 text-xs font-medium rounded-full">
                              {result.subject}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <span className="flex items-center gap-1">
                          <Download size={14} />
                          {result.downloads || 0}
                        </span>
                        
                        {result.averageRating > 0 && (
                          <span className="flex items-center gap-1 text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className="text-xs">
                                {i < Math.round(result.averageRating) ? '★' : '☆'}
                              </span>
                            ))}
                            <span className="text-gray-500">({result.averageRating.toFixed(1)})</span>
                          </span>
                        )}
                        
                        <span className="text-gray-400">
                          {result.timeAgo || new Date(result.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className={`p-2 rounded-lg ${
                        pagination.page === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-lg ${
                          pagination.page === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className={`p-2 rounded-lg ${
                        pagination.page === pagination.pages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults; 