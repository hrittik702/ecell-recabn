import React from 'react';
import { ClipboardList, ChevronDown } from 'lucide-react';

const TaskFormDrawer = ({
  taskData,
  setTaskData,
  handleTaskChange,
  handleAddTask,
  isSubmitting,
  isDropdownOpen,
  setIsDropdownOpen,
  filteredMembers,
  getOrdinalYear
}) => {
  return (
    <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 p-6 h-fit transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
      <div className="flex items-center gap-4 mb-5 border-b border-gray-200/50 dark:border-white/10 pb-5">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm">
          <ClipboardList size={20} />
        </div>
        <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">Assign Task</h2>
      </div>
      
      <form onSubmit={handleAddTask} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Task Title</label>
          <input
            id="task-title"
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleTaskChange}
            required
            placeholder="e.g. Design Hackathon Poster"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
          />
        </div>
        
        <div>
          <label htmlFor="task-description" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Description</label>
          <textarea
            id="task-description"
            name="description"
            value={taskData.description}
            onChange={handleTaskChange}
            required
            rows="3"
            placeholder="Brief overview of expected deliverables..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm resize-none"
          ></textarea>
        </div>

        <div className="relative">
          <label id="assign-to-label" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Assign To</label>
          <button 
            type="button"
            role="combobox"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-labelledby="assign-to-label"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer flex justify-between items-center text-left"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && isDropdownOpen) {
                e.preventDefault();
                setIsDropdownOpen(false);
              }
            }}
          >
            <span className={taskData.assignedTo ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}>
              {taskData.assignedTo 
                ? (() => {
                    const user = filteredMembers.find(m => m.id === taskData.assignedTo);
                    return user ? `${user.name} (${user.role})` : 'Select a member...';
                  })()
                : 'Select a member...'}
            </span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div 
              role="listbox"
              aria-labelledby="assign-to-label"
              className="absolute z-50 w-full mt-2 bg-white/95 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto custom-scrollbar"
            >
              {filteredMembers.filter(m => parseInt(m.year || 0) < 4).map(member => (
                <div 
                  key={member.id}
                  role="option"
                  tabIndex={0}
                  aria-selected={taskData.assignedTo === member.id}
                  className="px-4 py-3 text-sm hover:bg-gray-50/80 dark:hover:bg-white/5 cursor-pointer text-gray-800 dark:text-gray-200 border-b border-gray-100/50 dark:border-white/5 last:border-0 transition-colors flex items-center gap-3 focus:outline-none focus:bg-indigo-50 dark:focus:bg-indigo-900/30"
                  onClick={() => {
                    setTaskData(prev => ({ ...prev, assignedTo: member.id }));
                    setIsDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTaskData(prev => ({ ...prev, assignedTo: member.id }));
                      setIsDropdownOpen(false);
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface shrink-0 border border-gray-200/50 dark:border-white/10 flex items-center justify-center">
                    {member.profileImage ? (
                      <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-gray-500">{member.name ? member.name.charAt(0).toUpperCase() : 'U'}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold leading-tight mb-0.5">{member.name}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">{member.role} • {getOrdinalYear(member.year)} Year</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <input type="hidden" name="assignedTo" value={taskData.assignedTo} required />
        </div>

        <div>
          <label htmlFor="task-deadline" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Deadline</label>
          <input
            id="task-deadline"
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleTaskChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-2.5 rounded-lg text-sm transition-all duration-300 disabled:opacity-70 flex justify-center items-center shadow-glow hover:shadow-glow-strong"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Assign Task'
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskFormDrawer;
