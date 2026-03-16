const Contact = require('../models/contactModel');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const newContact = await Contact.create({ name, email, phone, message });
    res.status(201).json({ success: true, data: newContact, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ error: 'Server error while submitting contact form' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Server error while fetching contacts' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.deleteById(id);
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Server error while deleting contact' });
  }
};
