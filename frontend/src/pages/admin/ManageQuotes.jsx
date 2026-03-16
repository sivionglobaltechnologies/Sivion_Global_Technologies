import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { MessageSquare, Trash2, Search, Loader2 } from 'lucide-react';

const ManageQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchQuotes = async () => {
    try {
      const response = await apiClient.get('/quote', {
        headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
      });
      if (response.data?.success) {
        setQuotes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote request?')) {
      try {
        await apiClient.delete(`/quote/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
        });
        setQuotes(quotes.filter(q => q.id !== id));
      } catch (error) {
        alert('Failed to delete quote request.');
      }
    }
  };

  const filteredQuotes = quotes.filter(quote => 
    quote.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    quote.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white font-heading mb-2">Quote Requests</h1>
          <p className="text-slate-400 font-light">View and manage project inquiries and leads.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <input
            type="text"
            className="w-full bg-[#112240] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
            <span className="ml-3 text-sky-400 animate-pulse font-semibold tracking-widest uppercase">Fetching Data...</span>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-600" />
            <p className="text-lg">No quote requests found.</p>
            {searchTerm && <p className="text-sm mt-2 font-light">Try adjusting your search query.</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#112240] border-b border-white/10">
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Client / Company</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Service</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Budget</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase tracking-wider">Details</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQuotes.map(quote => (
                  <tr key={quote.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 text-sm text-slate-400 whitespace-nowrap">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-white mb-0.5">{quote.name}</p>
                      <p className="text-xs text-sky-400">{quote.company_name || 'No Company'}</p>
                      <p className="text-xs text-slate-500 mt-1">{quote.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                        {quote.service}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-emerald-400 font-bold whitespace-nowrap">
                      {quote.budget}
                    </td>
                    <td className="p-4 text-sm text-slate-400 max-w-xs truncate" title={quote.project_details}>
                      {quote.project_details}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(quote.id)}
                        className="p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete Quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageQuotes;
