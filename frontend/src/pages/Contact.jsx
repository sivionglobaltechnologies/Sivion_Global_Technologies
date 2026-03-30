import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import apiClient from '../api/apiClient';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await apiClient.post('/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully. We will get back to you shortly!' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to send message.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - SiviOn Global Technologies</title>
        <meta name="description" content="Get in touch with SiviOn Global Technologies for your web and digital marketing needs." />
      </Helmet>

      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-slate-300">Let's discuss how we can help your business grow</p>
      </div>

      <section id="contact-info" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700 flex flex-col h-full">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-slate-300 mb-8">We’re ready to help you unlock growth. Share your ideas and we’ll get back to you with a tailored plan.</p>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all">
                <div className="bg-blue-500/10 p-3 rounded-xl shrink-0">
                  <MapPin className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Office Addresses</h4>
                  <div className="text-slate-300 mt-3 space-y-5 text-sm sm:text-base">
                    <p className="leading-relaxed"><strong className="text-white">Hyderabad:</strong><br />3rd Floor, Advant Towers, Plot No 4,<br />Rd No 7, Kakatiya Hills, Madhapur,<br />Hyderabad, Telangana - 500081</p>
                    <p className="leading-relaxed"><strong className="text-white">Mumbai:</strong><br />G Block, BKC, Bandra East,<br />Mumbai, Maharashtra - 400051</p>
                    <p className="leading-relaxed"><strong className="text-white">Madhya Pradesh:</strong><br />Skye Corporate Park (Vijay Nagar), 2nd Floor,<br />Near Satya Sai Square, AB Road, Vijay Nagar,<br />Indore, Madhya Pradesh - 452010</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all">
                <div className="bg-teal-500/10 p-3 rounded-xl shrink-0">
                  <Phone className="text-teal-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Phone Number</h4>
                  <p className="text-slate-300 mt-1 sm:text-base text-sm">+91 9581136661, +91 9581136662</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all">
                <div className="bg-indigo-500/10 p-3 rounded-xl shrink-0">
                  <Mail className="text-indigo-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Email Address</h4>
                  <p className="text-slate-300 mt-1 sm:text-base text-sm">Hr@sivionglobaltechnologies.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all">
                <div className="bg-amber-500/10 p-3 rounded-xl shrink-0">
                  <Clock className="text-amber-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Working Hours</h4>
                  <p className="text-slate-300 mt-1 sm:text-base text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 relative h-fit">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h3>
            <p className="text-sm text-slate-500 mb-8">Fast responses guaranteed. Share your requirements and we’ll follow up within 24 hours.</p>

            {status.message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium transition-all ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder-slate-400 bg-slate-50 focus:bg-white" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder-slate-400 bg-slate-50 focus:bg-white" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder-slate-400 bg-slate-50 focus:bg-white" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all resize-none placeholder-slate-400 bg-slate-50 focus:bg-white" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

        {/* Google Maps Embed */}
        <div className="mt-12 lg:mt-16 h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative z-10">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.17974408291!2d78.3968744!3d17.4424998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x23e41b79ea8ac1c1%3A0x8a26da85874bf594!2ssivion%20global%20technologies!5e0!3m2!1sen!2sin!4v1774852045097!5m2!1sen!2sin" width="100%" height="100%" style={{border: '0'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>

      {/* WhatsApp Floating Button Component would be implemented globally, but noting requirement here */}
    </>
  );
};

export default Contact;
