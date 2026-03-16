import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { CalendarCheck, Trash2, Search, Loader2 } from 'lucide-react';

const ManageConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchConsultations = async () => {
    try {
      const response = await apiClient.get('/consultations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
      });
      if (response.data?.success) {
        setConsultations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation booking?')) {
      try {
        await apiClient.delete(`/consultations/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
        });
        setConsultations(consultations.filter(c => c.id !== id));
      } catch (error) {
        alert('Failed to delete consultation.');
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await apiClient.patch(`/consultations/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
      });
      if (response.data?.success) {
        setConsultations(consultations.map(c => c.id === id ? { ...c, status: newStatus } : c));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return styles[status] || styles.pending;
  };

  const filtered = consultations.filter(c =>
    `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white font-heading mb-2">Consultation Bookings</h1>
          <p className="text-slate-400 font-light">View and manage all scheduled consultation requests.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            type="text"
            className="w-full bg-[#112240] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <CalendarCheck className="w-12 h-12 mx-auto mb-4 text-slate-600" />
            <p className="text-lg">No consultation bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#112240] border-b border-white/10">
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Date Booked</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Client</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Preferred Slot</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Message</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-slate-400 whitespace-nowrap">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-white">{c.first_name} {c.last_name}</p>
                      <p className="text-xs text-sky-400">{c.email}</p>
                      {c.company && <p className="text-xs text-slate-500 mt-0.5">{c.company}</p>}
                    </td>
                    <td className="p-4 text-sm text-slate-400">
                      <p className="font-medium text-white">{new Date(c.preferred_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      <p className="text-xs text-slate-500">{c.preferred_time}</p>
                    </td>
                    <td className="p-4">
                      <select
                        value={c.status || 'pending'}
                        onChange={(e) => handleStatusUpdate(c.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border capitalize outline-none cursor-pointer transition-colors ${getStatusBadge(c.status)}`}
                      >
                        <option value="pending" className="bg-[#112240] text-amber-400 font-bold">Pending</option>
                        <option value="confirmed" className="bg-[#112240] text-emerald-400 font-bold">Confirmed</option>
                        <option value="completed" className="bg-[#112240] text-blue-400 font-bold">Completed</option>
                        <option value="cancelled" className="bg-[#112240] text-red-400 font-bold">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-sm text-slate-400 max-w-[200px]">
                      <p className="truncate">{c.message}</p>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
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

export default ManageConsultations;
