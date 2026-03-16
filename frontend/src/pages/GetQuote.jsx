import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import apiClient from '../api/apiClient';
import { Send } from 'lucide-react';

const GetQuote = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company_name: '', service: 'Web Development', budget: '', project_details: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await apiClient.post('/quote', formData);
      setStatus({ type: 'success', message: 'Quote request submitted successfully. Our team will contact you soon!' });
      setFormData({ name: '', email: '', phone: '', company_name: '', service: 'Web Development', budget: '', project_details: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to submit quote request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Get a Quote - SiviOn Global Technologies</title>
        <meta name="description" content="Request a free quote for your web development, digital marketing, or IT project with SiviOn." />
      </Helmet>

      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Proposal</h1>
        <p className="text-lg text-slate-300">Tell us about your project and we'll provide a comprehensive quote.</p>
      </div>

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100">

          {status.message && (
            <div className={`p-4 rounded-lg mb-8 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input required type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.company_name} onChange={e => setFormData({ ...formData, company_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Required *</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                  <option value="Java Full Stack Development">Java Full Stack Development</option>
                  <option value="Web Development">Website Design & Development</option>
                  <option value="Web Application">Web Application Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="SEO">SEO Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Budget Range</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}>
                  <option value="">Select a range</option>
                  <option value="< ₹50,000">Less than ₹50,000</option>
                  <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                  <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                  <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                  <option value="₹10,00,000+">Above ₹10,00,000</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Details *</label>
              <textarea required rows={6} placeholder="Please describe your requirements..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" value={formData.project_details} onChange={e => setFormData({ ...formData, project_details: e.target.value })}></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md disabled:opacity-70 flex items-center justify-center">
              {loading ? 'Submitting...' : <>Submit Request <Send className="w-4 h-4 ml-2" /></>}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default GetQuote;
