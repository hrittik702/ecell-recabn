import React from 'react';
import { CheckCircle, Trash2 } from 'lucide-react';

const TaskManagerTab = ({
  tasks,
  members,
  loading,
  handleDeleteTask
}) => {
  return (
    <div className="lg:col-span-2 bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
      <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm">
            <CheckCircle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">Active Tasks</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">All ongoing assignments</p>
          </div>
        </div>
        <span className="bg-purple-50 text-purple-700 border border-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm">
          {tasks.length} Tasks
        </span>
      </div>

      <div className="overflow-x-auto p-5 md:p-6">
        {loading ? (
          <div className="w-full min-w-[600px]">
            <div className="h-10 bg-gray-50/50 dark:bg-dark-surface/50 border-b border-gray-200/50 dark:border-white/10 w-full mb-2"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 w-full animate-pulse">
                <div className="h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/3 ml-auto"></div>
                <div className="h-6 w-20 bg-gray-200/60 dark:bg-white/10 rounded ml-auto"></div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400 font-medium">No tasks assigned yet.</div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => {
              const assignee = members.find(m => m.id === task.assignedTo);
              return (
                <div key={task.id} className="bg-white/50 dark:bg-dark-surface/50 border border-gray-100 dark:border-white/5 p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{task.title}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{task.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                        Assigned to: {assignee ? assignee.name : 'Unknown'}
                      </span>
                      <span className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-2 py-1 rounded">
                        Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
                      </span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={`Delete task ${task.title}`}
                    title="Delete Task"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagerTab;
