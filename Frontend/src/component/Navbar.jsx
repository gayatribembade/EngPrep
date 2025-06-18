import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Home, 
  BookOpen, 
  Info, 
  LogIn, 
  LogOut, 
  User, 
  Menu, 
  X, 
  Settings, 
  Search,
  HelpCircle,
  Activity,
  FileText,
  ChevronDown,
  Filter,
  Loader2,
  Bell
} from 'lucide-react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from '../auth/auth-provider';
import axiosInstance from '../api/axios';
import ProfileMenuItem from './ProfileMenuItem';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [filters, setFilters] = useState({
    branch: 'all',
    year: 'all',
    type: 'all',
    semester: 'all',
    sort: 'relevance'
  });

  // Check if current page is home
  const isHomePage = location.pathname === '/';

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

  const searchRef = useRef(null);
  const profileMenuRef = useRef(null);
  const filterRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Search function
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Call the backend search API with query and filters
      const response = await axiosInstance.get('/resources/search', {
        params: {
          query,
          branch: filters.branch,
          year: filters.year,
          type: filters.type,
          semester: filters.semester,
          sort: filters.sort,
          limit: 5 // Limit results in dropdown to 5 items
        }
      });

      if (response.data.success) {
        setSearchResults(response.data.results);
      } else {
        console.error('Search failed:', response.data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching resources:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search with useCallback
  const debouncedSearch = useCallback(
    async (value) => {
      if (value.trim()) {
        await performSearch(value);
      } else {
        setSearchResults([]);
      }
    },
    [filters]
  );

  // Update search results when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, debouncedSearch]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDisplayName = () => {
    if (!user) return '';
    // Try different properties that might contain the user's name
    return user.username || user.name || user.email?.split('@')[0] || 'User';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search', { 
        state: { 
          query: searchQuery,
          filters 
        } 
      });
      setShowSearchResults(false);
    }
  };

  // Search Result Item Component
  const SearchResultItem = ({ result }) => (
    <Link
      to={`/resource/${result._id}`}
      className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors duration-200"
      onClick={() => setShowSearchResults(false)}
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          {result.thumbnail ? (
            <img 
              src={result.thumbnail} 
              alt={result.title} 
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <FileText className="w-5 h-5 text-blue-600" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {result.title}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {result.subject && `${result.subject} • `}{result.type} • {result.branch} • {result.year}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400">{result.timeAgo || ''}</span>
          {result.downloads > 0 && (
            <span className="text-xs text-gray-400">• {result.downloads} downloads</span>
          )}
          {result.averageRating > 0 && (
            <span className="flex items-center text-xs text-yellow-500">
              • {result.averageRating.toFixed(1)} ★
            </span>
          )}
        </div>
      </div>
    </Link>
  );

  // Check for pending resources if user is admin
  useEffect(() => {
    const checkPendingResources = async () => {
      if (user && user.role === 'admin') {
        try {
          const response = await axiosInstance.get('/resources/pending');
          setPendingCount(Array.isArray(response.data) ? response.data.length : 0);
        } catch (error) {
          console.error('Error fetching pending resources count:', error);
          // Use mock data for demonstration
          setPendingCount(2);
        }
      }
    };

    checkPendingResources();
    // Check every 5 minutes
    const intervalId = setInterval(checkPendingResources, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHomePage
          ? scrolled 
            ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
            : 'bg-transparent'
          : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-1.5">
            <span className="text-3xl font-extrabold tracking-tight">
              <span className={`text-blue-600 transition-all duration-300`}>Eng</span>
              <span className={`transition-all duration-300 ${isHomePage && !scrolled ? 'text-white' : 'text-gray-800'}`}>Prep</span>
            </span>
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative group" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/90 backdrop-blur-sm"
                />
                <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200">
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Search size={18} />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <Filter size={18} />
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((result) => (
                        <SearchResultItem key={result._id} result={result} />
                      ))}
                      <div className="p-3 bg-gray-50">
                        <button
                          onClick={handleSearch}
                          className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View all results
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span>Searching...</span>
                        </div>
                      ) : (
                        'No results found'
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Filters Dropdown */}
              {showFilters && (
                <div ref={filterRef} className="absolute top-full left-0 right-0 mt-2 p-4 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-100 transform transition-all duration-200 z-50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Branch</label>
                      <select
                        value={filters.branch}
                        onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="all">All Branches</option>
                        {filterOptions.branches.map(branch => (
                          <option key={branch} value={branch}>{branch}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
                      <select
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="all">All Years</option>
                        {filterOptions.years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="all">All Types</option>
                        {filterOptions.types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Semester</label>
                      <select
                        value={filters.semester}
                        onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="all">All Semesters</option>
                        {filterOptions.semesters.map(semester => (
                          <option key={semester} value={semester}>{semester}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort By</label>
                      <select
                        value={filters.sort}
                        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 p-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        {filterOptions.sortOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/about"
              className={`py-2.5 px-4 rounded-xl transition-all duration-300 ${
                isHomePage && !scrolled 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            
            {user ? (
              <>
                {/* Profile Menu */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className={`flex items-center gap-2.5 py-2.5 px-4 rounded-xl transition-all duration-300 ${
                      isHomePage && !scrolled 
                        ? 'text-white hover:bg-white/10' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {getDisplayName()[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{getDisplayName()}</span>
                    <ChevronDown size={16} className={`transform transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-100 py-1.5 transform transition-all duration-200">
                      <ProfileMenuItem
                        icon={User}
                        text="My Profile"
                        onClick={() => navigate('/profile')}
                      />
                      <ProfileMenuItem
                        icon={FileText}
                        text="My Resources"
                        onClick={() => navigate('/my-resources')}
                      />
                      <ProfileMenuItem
                        icon={Activity}
                        text="My Activity"
                        onClick={() => navigate('/activity')}
                      />
                      <ProfileMenuItem
                        icon={BookOpen}
                        text="Upload Resource"
                        onClick={() => navigate('/upload-resource')}
                      />
                      <ProfileMenuItem
                        icon={HelpCircle}
                        text="Help & Support"
                        onClick={() => navigate('/support')}
                      />
                      {user.role === 'admin' && (
                        <ProfileMenuItem
                          icon={Settings}
                          text={
                            <div className="flex items-center justify-between w-full">
                              <span>Admin Dashboard</span>
                              {pendingCount > 0 && (
                                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                                  {pendingCount}
                                </span>
                              )}
                            </div>
                          }
                          onClick={() => navigate('/admin')}
                        />
                      )}
                      <hr className="my-1.5 border-gray-100" />
                      <ProfileMenuItem
                        icon={LogOut}
                        text="Logout"
                        onClick={handleLogout}
                        className="text-red-600 hover:bg-red-50"
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-2 py-2.5 px-5 rounded-xl font-medium transition-all duration-300 ${
                  isHomePage && !scrolled 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                }`}
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isHomePage && !scrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/90 backdrop-blur-sm"
            />
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400">
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <Filter size={18} />
            </button>

            {/* Mobile Search Results */}
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 divide-y divide-gray-100 max-h-[60vh] overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((result) => (
                      <SearchResultItem key={result._id} result={result} />
                    ))}
                    <div className="p-3 bg-gray-50">
                      <button
                        onClick={handleSearch}
                        className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View all results
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        <span>Searching...</span>
                      </div>
                    ) : (
                      'No results found'
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <nav className={`rounded-xl mt-2 p-4 ${
              isHomePage && !scrolled 
                ? 'bg-white/90 backdrop-blur-lg shadow-xl' 
                : 'bg-white shadow-lg'
            }`}>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                    <Info size={18} />
                    <span className="font-medium">About</span>
                  </Link>
                </li>
                
                {user ? (
                  <>
                    <li>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {getDisplayName()[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">{getDisplayName()}</span>
                          <span className="block text-sm text-gray-500">{user.email}</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/my-resources" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <FileText size={18} />
                        <span className="font-medium">My Resources</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/activity" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <Activity size={18} />
                        <span className="font-medium">My Activity</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/upload-resource" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <BookOpen size={18} />
                        <span className="font-medium">Upload Resource</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/support" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <HelpCircle size={18} />
                        <span className="font-medium">Help & Support</span>
                      </Link>
                    </li>
                    {user.role === 'admin' && (
                      <li>
                        <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200">
                          <Settings size={18} />
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">Admin Dashboard</span>
                            {pendingCount > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                                {pendingCount}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
                    >
                      <LogIn size={18} />
                      <span className="font-medium">Login</span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;