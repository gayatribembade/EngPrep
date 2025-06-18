import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
    searchResources,
    getFilterOptions,
    downloadResource,
    submitResourceRequest,
    getUserResources,
    getBookmarkedResources,
    bookmarkResource,
    checkBookmark,
    rateResource,
    getResourceRatings,
    approveResource,
    getPendingResources
} from '../controllers/resourceController.js';

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
    res.json({ message: 'Resource router is working' });
});

// Search and filter routes (these should come before other routes to avoid conflicts)
router.get('/search', searchResources);
router.get('/filters', getFilterOptions);

// User resources routes
router.get('/user', protect, getUserResources);
router.get('/bookmarked', protect, getBookmarkedResources);
router.get('/pending', protect, admin, getPendingResources);

// Resource request route
router.post('/request', protect, submitResourceRequest);

// Resource CRUD routes
router.route('/')
    .get(getResources)
    .post(protect, admin, createResource); // Only admins can directly create resources

// Resource download route
router.post('/:id/download', downloadResource);

// Resource bookmark routes
router.route('/:id/bookmark')
    .get(protect, checkBookmark)
    .post(protect, bookmarkResource);

// Resource rating routes
router.route('/:id/rate')
    .post(protect, rateResource);
router.get('/:id/ratings', getResourceRatings);

// Resource approval route
router.put('/:id/approve', protect, admin, approveResource);

// Resource by ID routes
router.route('/:id')
    .get(getResourceById)
    .put(protect, updateResource)
    .delete(protect, deleteResource);

export default router; 