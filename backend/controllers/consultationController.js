const Consultation = require('../models/consultationModel');

exports.bookConsultation = async (req, res) => {
  try {
    const { first_name, last_name, email, company, preferred_date, preferred_time, message } = req.body;

    if (!first_name || !last_name || !email || !preferred_date || !preferred_time || !message) {
      return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
    }

    const consultation = await Consultation.create({
      first_name, last_name, email,
      company: company || null,
      preferred_date, preferred_time, message
    });

    res.status(201).json({
      success: true,
      data: consultation,
      message: 'Consultation booked successfully! Our team will confirm your slot shortly.'
    });
  } catch (error) {
    console.error('Consultation booking error:', error);
    res.status(500).json({ success: false, error: 'Server error while booking consultation.' });
  }
};

exports.getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.getAll();
    res.status(200).json({ success: true, data: consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ success: false, error: 'Server error while fetching consultations.' });
  }
};

exports.deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    await Consultation.deleteById(id);
    res.status(200).json({ success: true, message: 'Consultation deleted successfully.' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ success: false, error: 'Server error while deleting consultation.' });
  }
};

exports.updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, error: 'Status is required.' });
    const updated = await Consultation.updateStatus(id, status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating consultation status:', error);
    res.status(500).json({ success: false, error: 'Server error while updating consultation status.' });
  }
};
