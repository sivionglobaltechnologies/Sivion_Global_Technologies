import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Code, Server, Database, TrendingUp } from 'lucide-react';

const Technologies = () => {
  const techCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="w-6 h-6 text-blue-600" />,
      skills: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3', 'JavaScript/TypeScript'],
      color: 'blue'
    },
    {
      title: 'Backend Development',
      icon: <Server className="w-6 h-6 text-teal-600" />,
      skills: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'Hibernate', 'Python', 'Django', 'PHP', 'Laravel'],
      color: 'teal'
    },
    {
      title: 'Database & Cloud',
      icon: <Database className="w-6 h-6 text-purple-600" />,
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'Google Cloud', 'Docker', 'Kubernetes'],
      color: 'purple'
    },
    {
      title: 'Digital Marketing & SEO',
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      skills: ['Google Analytics', 'Google Ads', 'SEMrush', 'Ahrefs', 'Mailchimp', 'HubSpot', 'Social Media Management'],
      color: 'amber'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Technologies - SiviOn Global Technologies</title>
        <meta name="description" content="Explore the cutting-edge technologies and frameworks we use at SiviOn Global Technologies." />
      </Helmet>

      <div className="bg-slate-900 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Technologies We Use</h1>
        <p className="text-lg text-slate-300">Modern tools for modern digital solutions.</p>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {techCategories.map((category, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-${category.color}-50 mr-4`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Technologies;
