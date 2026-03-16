const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', quoteController.submitQuote);

// Admin routes (Protected)
router.get('/', authMiddleware, quoteController.getQuotes);
router.delete('/:id', authMiddleware, quoteController.deleteQuote);

module.exports = router;
