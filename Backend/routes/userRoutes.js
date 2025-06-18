import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Basic user routes
router.get('/profile', protect, (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        }
    });
});

export default router; 