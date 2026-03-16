import React, { useState, useEffect } from 'react';
import { Users, FileText, Briefcase, MessageSquare, BriefcaseBusiness, Mail, TrendingUp } from 'lucide-react';
import apiClient from '../../api/apiClient';

const StatCard = ({ title, value, icon, colorClass, gradientClass }) => (
  <div className={`glass-panel p-6 rounded-2xl border-t border-l ${colorClass} relative overflow-hidden group`}>
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${gradientClass} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-black text-white font-heading">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${colorClass.replace('border-', 'text-')}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    portfolio: 0,
    quotes: 0,
    contacts: 0,
    applications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would have a dedicated /api/admin/stats endpoint.
    // For now, we simulate by fetching lengths or just mocking if endpoints aren't fully wired for counts.
    const fetchStats = async () => {
      try {
        const [blogsRes, portfolioRes, quotesRes, contactsRes, appsRes] = await Promise.allSettled([
          apiClient.get('/blogs'),
          apiClient.get('/portfolio'),
          apiClient.get('/quote', { headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` } }),
          apiClient.get('/contact', { headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` } }),
          apiClient.get('/careers', { headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` } })
        ]);

        setStats({
          blogs: blogsRes.status === 'fulfilled' ? (blogsRes.value.data?.data?.length || 0) : 0,
          portfolio: portfolioRes.status === 'fulfilled' ? (portfolioRes.value.data?.data?.length || 0) : 0,
          quotes: quotesRes.status === 'fulfilled' ? (quotesRes.value.data?.data?.length || 0) : 0,
          contacts: contactsRes.status === 'fulfilled' ? (contactsRes.value.data?.data?.length || 0) : 0,
          applications: appsRes.status === 'fulfilled' ? (appsRes.value.data?.data?.length || 0) : 0,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-sky-400 animate-pulse tracking-widest uppercase text-sm">Loading Intelligence...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white font-heading mb-2">Command Center</h1>
          <p className="text-slate-400 font-light">Overview of your corporate platform metrics.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full border border-sky-500/20 text-sm font-semibold">
          <TrendingUp size={16} />
          <span>System Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Blogs" 
          value={stats.blogs} 
          icon={<FileText size={24} />} 
          colorClass="border-blue-500/30 text-blue-400"
          gradientClass="bg-blue-500"
        />
        <StatCard 
          title="Portfolio Items" 
          value={stats.portfolio} 
          icon={<Briefcase size={24} />} 
          colorClass="border-purple-500/30 text-purple-400"
          gradientClass="bg-purple-500"
        />
        <StatCard 
          title="Quote Requests" 
          value={stats.quotes} 
          icon={<MessageSquare size={24} />} 
          colorClass="border-emerald-500/30 text-emerald-400"
          gradientClass="bg-emerald-500"
        />
        <StatCard 
          title="Contact Messages" 
          value={stats.contacts} 
          icon={<Mail size={24} />} 
          colorClass="border-amber-500/30 text-amber-400"
          gradientClass="bg-amber-500"
        />
        <StatCard 
          title="Job Applications" 
          value={stats.applications} 
          icon={<BriefcaseBusiness size={24} />} 
          colorClass="border-rose-500/30 text-rose-400"
          gradientClass="bg-rose-500"
        />
        <div className="glass-panel p-6 rounded-2xl border-t border-l border-white/10 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
              <Users size={20} className="text-slate-400" />
            </div>
            <p className="text-slate-400 text-sm">System Admin Access</p>
            <p className="text-white font-bold">Active</p>
        </div>
      </div>
      
      {/* Recent Activity Mock Section */}
      <div className="glass-panel rounded-2xl border-t border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-6 font-heading flex items-center">
          <span className="w-2 h-2 rounded-full bg-sky-400 mr-3 animate-pulse"></span>
          System Intelligence Status
        </h2>
        <div className="space-y-4">
           <div className="flex items-center gap-4 text-sm p-4 rounded-xl bg-white/5 border border-white/5">
             <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><TrendingUp size={16} /></div>
             <div>
               <p className="text-white font-medium">All systems operational</p>
               <p className="text-slate-400 text-xs mt-1">Database connections and API endpoints are functioning perfectly.</p>
             </div>
             <span className="ml-auto text-xs text-slate-500">Just now</span>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
