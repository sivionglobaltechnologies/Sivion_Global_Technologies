const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/apply', careerController.submitApplication);

// Admin routes (Protected)
router.get('/', authMiddleware, careerController.getApplications);
router.delete('/:id', authMiddleware, careerController.deleteApplication);
router.patch('/:id/status', authMiddleware, careerController.updateApplicationStatus);

module.exports = router;
