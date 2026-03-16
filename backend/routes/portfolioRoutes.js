const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', portfolioController.getPortfolio);

// Admin routes (Protected)
router.post('/', authMiddleware, portfolioController.createProject);
router.put('/:id', authMiddleware, portfolioController.updateProject);
router.delete('/:id', authMiddleware, portfolioController.deleteProject);

module.exports = router;
