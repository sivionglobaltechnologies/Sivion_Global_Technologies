const Quote = require('../models/quoteModel');

exports.submitQuote = async (req, res) => {
  try {
    const { name, email, phone, company_name, service, budget, project_details } = req.body;
    
    if (!name || !email || !project_details) {
      return res.status(400).json({ error: 'Name, email, and project details are required' });
    }

    const newQuote = await Quote.create({ name, email, phone, company_name, service, budget, project_details });
    res.status(201).json({ success: true, data: newQuote, message: 'Quote request submitted!' });
  } catch (error) {
    console.error('Submit quote error:', error);
    res.status(500).json({ error: 'Server error while submitting quote request' });
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.getAll();
    res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({ error: 'Server error while fetching quotes' });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    await Quote.deleteById(id);
    res.status(200).json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ error: 'Server error while deleting quote' });
  }
};
