const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route - book a consultation
router.post('/', consultationController.bookConsultation);

// Admin routes (Protected)
router.get('/', authMiddleware, consultationController.getConsultations);
router.delete('/:id', authMiddleware, consultationController.deleteConsultation);
router.patch('/:id/status', authMiddleware, consultationController.updateConsultationStatus);

module.exports = router;
