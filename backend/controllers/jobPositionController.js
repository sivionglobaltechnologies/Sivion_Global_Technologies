const JobPosition = require('../models/jobPositionModel');

exports.createPosition = async (req, res) => {
  try {
    const { title, location, type, department, description, requirements } = req.body;
    if (!title || !location || !type) {
      return res.status(400).json({ success: false, error: 'Title, location, and type are required.' });
    }
    const position = await JobPosition.create({ title, location, type, department, description, requirements });
    res.status(201).json({ success: true, data: position });
  } catch (error) {
    console.error('Error creating position:', error);
    res.status(500).json({ success: false, error: 'Server error creating position.' });
  }
};

exports.getPositions = async (req, res) => {
  try {
    const positions = await JobPosition.getAll();
    res.status(200).json({ success: true, data: positions });
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ success: false, error: 'Server error fetching positions.' });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await JobPosition.update(id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Position not found.' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ success: false, error: 'Server error updating position.' });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await JobPosition.deleteById(id);
    res.status(200).json({ success: true, message: 'Position deleted successfully.' });
  } catch (error) {
    console.error('Error deleting position:', error);
    res.status(500).json({ success: false, error: 'Server error deleting position.' });
  }
};
