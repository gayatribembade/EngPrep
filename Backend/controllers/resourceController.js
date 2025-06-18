import Resource from '../models/resourceModel.js';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export const getResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    res.json(resources);
});

// @desc    Get resource by ID
// @route   GET /api/resources/:id
// @access  Public
export const getResourceById = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    res.json(resource);
});

// @desc    Increment download count for a resource
// @route   POST /api/resources/:id/download
// @access  Public
export const downloadResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    resource.downloads += 1;
    await resource.save();
    
    res.json({ success: true, downloads: resource.downloads });
});

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private
export const createResource = asyncHandler(async (req, res) => {
    const resource = await Resource.create({
        ...req.body,
        user: req.user.id
    });
    res.status(201).json(resource);
});

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
export const updateResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }

    // Check if user owns the resource
    if (resource.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedResource = await Resource.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedResource);
});

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
export const deleteResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }

    // Check if user owns the resource
    if (resource.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await resource.remove();
    res.json({ id: req.params.id });
});

// @desc    Search resources with filters
// @route   GET /api/resources/search
// @access  Public
export const searchResources = asyncHandler(async (req, res) => {
    console.log('Search request received:', req.query);
    const { 
        query, 
        branch, 
        year, 
        type, 
        semester, 
        subject,
        sort = 'newest',
        difficulty
    } = req.query;
    
    try {
        // Build search query
        const searchQuery = {};

        // Add text search if query exists
        if (query && query.trim()) {
            // Use MongoDB text search for better relevance
            searchQuery.$text = { $search: query.trim() };
            
            // Check if text search will return results
            const textSearchCount = await Resource.countDocuments({ 
                ...searchQuery
            });
            
            if (textSearchCount === 0) {
                // If no results with text search, use regex for partial matches
                delete searchQuery.$text;
                const searchRegex = new RegExp(query.trim(), 'i');
                searchQuery.$or = [
                    { title: searchRegex },
                    { description: searchRegex },
                    { subject: searchRegex }
                ];
                console.log('Falling back to regex search:', searchQuery);
            }
        }

        // Add filters if they're not 'all'
        if (branch && branch !== 'all') {
            searchQuery.branch = branch;
        }
        if (year && year !== 'all') {
            searchQuery.year = year;
        }
        if (type && type !== 'all') {
            searchQuery.type = type;
        }
        if (semester && semester !== 'all') {
            searchQuery.semester = semester;
        }
        if (subject && subject !== 'all') {
            searchQuery.subject = { $regex: subject, $options: 'i' };
        }
      
        if (difficulty && difficulty !== 'all') {
            searchQuery.difficulty = difficulty;
        }

        console.log('MongoDB query:', searchQuery);

        // Execute search with pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Determine sort order
        let sortOptions = {};
        switch (sort) {
            case 'newest':
                sortOptions = { createdAt: -1 };
                break;
            case 'oldest':
                sortOptions = { createdAt: 1 };
                break;
            case 'popular':
                sortOptions = { downloads: -1 };
                break;
            case 'rating':
                sortOptions = { averageRating: -1 };
                break;
            case 'relevance':
                if (searchQuery.$text) {
                    // If using text search, sort by text score for relevance
                    sortOptions = { score: { $meta: "textScore" } };
                } else {
                    sortOptions = { createdAt: -1 }; // Default to newest
                }
                break;
            default:
                sortOptions = { createdAt: -1 }; // Default to newest
        }

        // Build the query
        let queryBuilder = Resource.find(searchQuery);
        
        // Add text score projection if using text search
        if (searchQuery.$text) {
            queryBuilder = queryBuilder.select({ score: { $meta: "textScore" } });
        }

        // Apply sorting, pagination, and field selection
        const results = await queryBuilder
            .select('title description type branch year semester subject createdAt averageRating downloads views tags')
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean(); // Use lean for better performance

        const total = await Resource.countDocuments(searchQuery);

        console.log(`Found ${results.length} results`);

        // Add additional metadata to results
        const enhancedResults = results.map(resource => ({
            ...resource,
            timeAgo: getTimeAgo(resource.createdAt),
            resourceUrl: `/resource/${resource._id}`
        }));

        res.json({
            success: true,
            results: enhancedResults,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            filters: {
                branch,
                year,
                type,
                semester,
                subject,
                sort
            }
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Error performing search'
        });
    }
});

// Helper function to format time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
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
}

// @desc    Get filter options
// @route   GET /api/resources/filters
// @access  Public
export const getFilterOptions = asyncHandler(async (req, res) => {
    // Get unique values for each filter
    const branches = await Resource.distinct('branch');
    const years = await Resource.distinct('year');
    const types = await Resource.distinct('type');

    res.json({
        success: true,
        filters: {
            branches: branches.filter(Boolean).sort(),
            years: years.filter(Boolean).sort(),
            types: types.filter(Boolean).sort()
        }
    });
});

// @desc    Submit a resource request (for user)
// @route   POST /api/resources/request
// @access  Private
export const submitResourceRequest = asyncHandler(async (req, res) => {
    const resourceRequest = {
        ...req.body,
        user: req.user.id,
        status: 'pending' // pending, approved, rejected
    };
    
    const resource = await Resource.create(resourceRequest);
    res.status(201).json({
        success: true,
        message: 'Your resource has been submitted for approval',
        resource
    });
});

// @desc    Get resources uploaded by logged in user
// @route   GET /api/resources/user
// @access  Private
export const getUserResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resources);
});

// @desc    Get resources bookmarked by logged in user
// @route   GET /api/resources/bookmarked
// @access  Private
export const getBookmarkedResources = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    const bookmarkedResources = await Resource.find({
        _id: { $in: user.bookmarks || [] }
    }).sort({ createdAt: -1 });
    
    res.json(bookmarkedResources);
});

// @desc    Bookmark a resource
// @route   POST /api/resources/:id/bookmark
// @access  Private
export const bookmarkResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    // If user doesn't have bookmarks array, create it
    if (!user.bookmarks) {
        user.bookmarks = [];
    }
    
    // Check if already bookmarked
    const isBookmarked = user.bookmarks.includes(resource._id);
    
    if (isBookmarked) {
        // Remove bookmark
        user.bookmarks = user.bookmarks.filter(
            bookmark => bookmark.toString() !== resource._id.toString()
        );
        await user.save();
        
        res.json({
            success: true,
            message: 'Resource removed from bookmarks',
            isBookmarked: false
        });
    } else {
        // Add bookmark
        user.bookmarks.push(resource._id);
        await user.save();
        
        res.json({
            success: true,
            message: 'Resource bookmarked successfully',
            isBookmarked: true
        });
    }
});

// @desc    Check if a resource is bookmarked
// @route   GET /api/resources/:id/bookmark
// @access  Private
export const checkBookmark = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    const isBookmarked = user.bookmarks && 
        user.bookmarks.some(bookmark => bookmark.toString() === req.params.id);
    
    res.json({
        success: true,
        isBookmarked: !!isBookmarked
    });
});

// @desc    Rate a resource
// @route   POST /api/resources/:id/rate
// @access  Private
export const rateResource = asyncHandler(async (req, res) => {
    const { value, comment } = req.body;
    
    if (!value || value < 1 || value > 5) {
        res.status(400);
        throw new Error('Rating must be between 1 and 5');
    }
    
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    // Check if user already rated this resource
    const alreadyRated = resource.ratings.find(
        rating => rating.user.toString() === req.user.id
    );
    
    if (alreadyRated) {
        // Update existing rating
        alreadyRated.value = value;
        alreadyRated.comment = comment || alreadyRated.comment;
        alreadyRated.createdAt = Date.now();
    } else {
        // Add new rating
        resource.ratings.push({
            user: req.user.id,
            value,
            comment,
            createdAt: Date.now()
        });
    }
    
    // Calculate average rating
    const totalRating = resource.ratings.reduce((sum, rating) => sum + rating.value, 0);
    resource.averageRating = totalRating / resource.ratings.length;
    
    await resource.save();
    
    res.json({
        success: true,
        message: 'Rating submitted successfully',
        averageRating: resource.averageRating
    });
});

// @desc    Get resource ratings
// @route   GET /api/resources/:id/ratings
// @access  Public
export const getResourceRatings = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id)
        .populate('ratings.user', 'username name');
    
    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    res.json({
        success: true,
        ratings: resource.ratings,
        averageRating: resource.averageRating
    });
});

// @desc    Approve or reject a resource
// @route   PUT /api/resources/:id/approve
// @access  Private/Admin
export const approveResource = asyncHandler(async (req, res) => {
    const { status } = req.body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
        res.status(400);
        throw new Error('Invalid status value');
    }
    
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    resource.status = status;
    resource.isVerified = status === 'approved';
    resource.verifiedBy = req.user.id;
    resource.verifiedAt = Date.now();
    
    await resource.save();
    
    res.json({
        success: true,
        message: `Resource ${status} successfully`,
        resource
    });
});

// @desc    Get pending resources
// @route   GET /api/resources/pending
// @access  Private/Admin
export const getPendingResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find({ status: 'pending' })
        .sort({ createdAt: -1 });
    
    res.json(resources);
}); 