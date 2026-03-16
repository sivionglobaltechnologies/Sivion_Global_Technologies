const express = require('express');
const router = express.Router();
const jobPositionController = require('../controllers/jobPositionController');
const authMiddleware = require('../middleware/authMiddleware');

// Public - view active job positions
router.get('/', jobPositionController.getPositions);

// Admin - manage job positions
router.post('/', authMiddleware, jobPositionController.createPosition);
router.put('/:id', authMiddleware, jobPositionController.updatePosition);
router.delete('/:id', authMiddleware, jobPositionController.deletePosition);

module.exports = router;
