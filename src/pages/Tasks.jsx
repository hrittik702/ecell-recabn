import React, { useEffect, useState } from 'react';
import { ExternalLink, CheckCircle2, AlertCircle, Calendar, User, Target } from 'lucide-react';
import { tasksData } from '../data/tasksData';
import { getAllTasks } from '../firebase/db';
import { useAuth } from '../context/AuthContext';

const TABS = ['Ignite Propel', 'Comprehensive'];

const Tasks = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('Ignite Propel');
  const [allTasks, setAllTasks] = useState(tasksData);
  const [loading, setLoading] = useState(false);

  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // If auth state is still resolving, keep curated static tasks displayed
    // without firing an unauthenticated query
    if (authLoading) {
      return;
    }

    // Unauthenticated visitors: display curated static task catalog.
    // Do NOT attempt authenticated Firestore query (avoids predictable permission-denied errors).
    if (!currentUser) {
      setAllTasks(tasksData);
      setLoading(false);
      return;
    }

    // Authenticated members and admins: load live Firestore tasks
    let isMounted = true;
    const fetchLiveTasks = async () => {
      try {
        setLoading(true);
        const remote = await getAllTasks();
        if (!isMounted) return;

        if (!remote || remote.length === 0) {
          setAllTasks(tasksData);
          return;
        }

        // Map and merge remote tasks with local catalog
        const formattedRemote = remote.map(t => ({
          ...t,
          category: t.category || 'Ignite Propel',
          status: t.status === 'completed' ? 'Completed' : 'In Progress'
        }));

        setAllTasks(prev => {
          const remoteIds = new Set(formattedRemote.map(r => r.id));
          const filteredDefaults = tasksData.filter(d => !remoteIds.has(d.id));
          return [...formattedRemote, ...filteredDefaults];
        });
      } catch (err) {
        // Provide informative diagnostics for authenticated failures
        if (err?.code === 'permission-denied') {
          console.error("Firestore permission denied: Authenticated user cannot read tasks collection.", err);
        } else if (err?.code === 'unavailable') {
          console.error("Firestore unavailable: Network connection issue or offline.", err);
        } else {
          console.error("Error fetching live tasks from Firestore for authenticated user:", err);
        }
        // Preserve static fallback
        if (isMounted) {
          setAllTasks(tasksData);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveTasks();
    return () => { isMounted = false; };
  }, [currentUser, authLoading]);

  const filteredTasks = allTasks.filter(task => (task.category || 'Ignite Propel') === activeTab);

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <span className="inline-block py-1 px-3 md:py-1.5 md:px-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-bold tracking-wide uppercase mb-3 md:mb-4 shadow-sm">
          NEC 2026 Board
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-3 md:mb-6 tracking-tight">
          Assigned Tasks
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg max-w-2xl mx-auto font-sans font-medium text-balance leading-relaxed">
          Track and manage all official tasks assigned to E-Cell REC Ambedkar Nagar for the National Entrepreneurship Challenge.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 md:mb-12">
        <div role="tablist" aria-label="Task category tabs" className="inline-flex bg-white/60 dark:bg-[#1a1a1a]/40 backdrop-blur-xl p-1 md:p-1.5 rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm w-full max-w-sm sm:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 md:py-2.5 rounded-full font-sans font-semibold text-xs sm:text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 dark:text-gray-400 font-medium">
            No tasks found in this section yet.
          </div>
        ) : (
          filteredTasks.map((task) => (
          <div key={task.id} className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1">
            
            <div>
              {/* Status & Link Header */}
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className={`px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wider border ${
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
                  className="p-2 rounded-full bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-white/10 transition-colors border border-gray-100 dark:border-white/10 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label={`View ${task.title} on NEC Portal`}
                  title="View on NEC Portal"
                >
                  <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" aria-hidden="true" />
                </a>
              </div>

              {/* Title */}
              <h2 className="text-lg md:text-2xl font-display font-bold text-gray-900 dark:text-white mb-3 md:mb-4 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {task.title}
              </h2>

              {/* Metadata Pills */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="flex items-center text-[10px] md:text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border border-gray-200/50 dark:border-white/10">
                  <User size={12} className="mr-1 md:mr-1.5 text-indigo-500 md:w-[14px] md:h-[14px]" />
                  {task.assignedTo}
                </div>
                <div className="flex items-center text-[10px] md:text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/20 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border border-gray-200/50 dark:border-white/10">
                  <Calendar size={12} className="mr-1 md:mr-1.5 text-pink-500 md:w-[14px] md:h-[14px]" />
                  {task.deadline}
                </div>
              </div>

              {/* Target & Objective */}
              <div className="space-y-3 md:space-y-4 mb-5 md:mb-8">
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5 md:mb-2 flex items-center">
                    <Target size={14} className="text-indigo-500 mr-1.5 md:mr-2 md:w-[16px] md:h-[16px]" /> Target
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium bg-gray-50/50 dark:bg-white/5 p-3 md:p-4 rounded-xl border border-gray-100 dark:border-white/5">
                    {task.target}
                  </p>
                </div>

                {task.objective && (
                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1.5 md:mb-2">Objective</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                      {task.objective}
                    </p>
                  </div>
                )}
                
                {task.context && (
                  <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-500 italic bg-gray-100/50 dark:bg-black/20 p-2.5 md:p-3 rounded-lg border-l-2 border-indigo-300 dark:border-indigo-500/50">
                    {task.context}
                  </p>
                )}
              </div>

              {/* Guidelines */}
              {task.guidelines && task.guidelines.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 md:mb-3 flex items-center">
                    <CheckCircle2 size={14} className="text-emerald-500 mr-1.5 md:mr-2 md:w-[16px] md:h-[16px]" /> Guidelines & Checklist
                  </h3>
                  <ul className="space-y-1.5 md:space-y-2">
                    {task.guidelines.map((guide, idx) => (
                      <li key={idx} className="flex items-start text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        <div className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 md:mr-3" />
                        <span className="leading-snug">{guide}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* References */}
              {task.references && task.references.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 md:mb-3">References</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {task.references.map((ref, idx) => (
                      <a 
                        key={idx}
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] md:text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors active:scale-95"
                      >
                        {ref.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submission Rules Footer */}
            {task.submissionRules && (
              <div className="mt-3 md:mt-4 bg-gray-900 dark:bg-white/10 rounded-lg md:rounded-xl p-3 md:p-4 flex items-start text-white">
                <AlertCircle size={16} className="shrink-0 mt-0.5 mr-2 md:mr-3 text-amber-400 md:w-[18px] md:h-[18px]" />
                <p className="text-xs md:text-sm font-medium leading-relaxed">
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
