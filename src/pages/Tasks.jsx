import React, { useEffect, useState } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, Calendar, User, Target } from 'lucide-react';
import { tasksData } from '../data/tasksData';

const TABS = ['Ignite Propel', 'Comprehensive'];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('Ignite Propel');

  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredTasks = tasksData.filter(task => task.category === activeTab);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
      
      <div className="text-center mb-12">
        <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide uppercase mb-4 shadow-sm">
          NEC 2026 Board
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Assigned Tasks
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto font-sans font-medium text-balance">
          Track and manage all official tasks assigned to E-Cell REC Ambedkar Nagar for the National Entrepreneurship Challenge.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <div className="inline-flex bg-white/60 dark:bg-[#1a1a1a]/40 backdrop-blur-xl p-1.5 rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 dark:text-gray-400 font-medium">
            No tasks found in this section yet.
          </div>
        ) : (
          filteredTasks.map((task) => (
          <div key={task.id} className="glass-card rounded-3xl p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                  task.status === 'In Progress' 
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                    : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                }`}>
                  {task.status}
                </span>
                
                <a 
                  href={task.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-full bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-white/10 transition-colors border border-gray-100 dark:border-white/10 shadow-sm"
                  title="View on NEC Portal"
                >
                  <ExternalLink size={18} />
                </a>
              </div>

              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {task.title}
              </h2>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-gray-200/50 dark:border-white/10">
                  <User size={14} className="mr-1.5 text-indigo-500" />
                  {task.assignedTo}
                </div>
                <div className="flex items-center text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-gray-200/50 dark:border-white/10">
                  <Calendar size={14} className="mr-1.5 text-pink-500" />
                  {task.deadline}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 flex items-center">
                    <Target size={16} className="text-indigo-500 mr-2" /> Target
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium bg-gray-50/50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    {task.target}
                  </p>
                </div>

                {task.objective && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Objective</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                      {task.objective}
                    </p>
                  </div>
                )}
                
                {task.context && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 italic bg-gray-100/50 dark:bg-black/20 p-3 rounded-lg border-l-2 border-indigo-300 dark:border-indigo-500/50">
                    {task.context}
                  </p>
                )}
              </div>

              {task.guidelines && task.guidelines.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center">
                    <CheckCircle2 size={16} className="text-emerald-500 mr-2" /> Guidelines & Checklist
                  </h3>
                  <ul className="space-y-2">
                    {task.guidelines.map((guide, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <div className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 mr-3" />
                        <span className="leading-snug">{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {task.references && task.references.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">References</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.references.map((ref, idx) => (
                      <a 
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                      >
                        {ref.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {task.submissionRules && (
              <div className="mt-4 bg-gray-900 dark:bg-white/10 rounded-xl p-4 flex items-start text-white">
                <AlertCircle size={18} className="shrink-0 mt-0.5 mr-3 text-amber-400" />
                <p className="text-sm font-medium leading-relaxed shadow-sm">
                  {task.submissionRules}
                </p>
              </div>
            )}
            
          </div>
        )))}
      </div>

    </div>
  );
};

export default Tasks;
