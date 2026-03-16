const Blog = require('../models/blogModel');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Server error while fetching blogs' });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.getBySlug(req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching blog' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating blog' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: 'Server error while updating blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error while deleting blog' });
  }
};
