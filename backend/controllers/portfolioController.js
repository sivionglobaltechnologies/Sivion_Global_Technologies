const Portfolio = require('../models/portfolioModel');

exports.getPortfolio = async (req, res) => {
  try {
    const projects = await Portfolio.getAll();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching portfolio' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updated = await Portfolio.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Portfolio.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting project' });
  }
};
