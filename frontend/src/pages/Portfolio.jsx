import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import apiClient from '../api/apiClient';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get('/portfolio');
        if (response.data?.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', 'Web App', 'Enterprise', 'Marketing'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Portfolio - SiviOn Global Technologies</title>
        <meta name="description" content="View our portfolio of enterprise web applications, Java backend solutions, and digital marketing success stories." />
      </Helmet>

      {/* Header */}
      <div className="bg-[#0A192F] py-32 text-center text-white relative overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight text-glow"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Masterpieces</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto"
          >
            Explore our archive of high-performance technical solutions and data-driven marketing campaigns.
          </motion.p>
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeFilter === cat 
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:border-sky-500/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20">
             <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-slate-400 font-light tracking-widest uppercase text-sm">Loading Archives...</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20 glass-panel rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-2">No Projects Found</h3>
            <p className="text-slate-400">There are currently no projects matching the selected category.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Portfolio;
