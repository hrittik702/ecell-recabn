import React, { useEffect } from 'react';
import { UserPlus, Edit2, X } from 'lucide-react';

const MemberFormDrawer = ({
  isAddingMember,
  setIsAddingMember,
  editingMemberId,
  setEditingMemberId,
  formData,
  setFormData,
  handleChange,
  handleAddMember,
  isSubmitting
}) => {
  // Close drawer on Escape key press
  useEffect(() => {
    if (!isAddingMember) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsAddingMember(false);
        setEditingMemberId(null);
        setFormData({ name: '', email: '', password: '', role: '', year: '', status: 'active' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddingMember, setIsAddingMember, setEditingMemberId, setFormData]);

  return (
    <div 
      aria-hidden={!isAddingMember}
      className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shrink-0 ${
        isAddingMember
          ? 'max-h-[800px] lg:max-h-none opacity-100 lg:w-[350px] xl:w-[400px]'
          : 'max-h-0 lg:max-h-none lg:w-0 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 p-6 h-fit w-full lg:w-[350px] xl:w-[400px]">
        <div className="flex justify-between items-center mb-5 border-b border-gray-200/50 dark:border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm">
              {editingMemberId ? <Edit2 size={20} /> : <UserPlus size={20} />}
            </div>
            <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">
              {editingMemberId ? 'Edit Member Profile' : 'Add New Member'}
            </h2>
          </div>
          <button 
            type="button"
            aria-label="Close member form"
            onClick={() => {
              setIsAddingMember(false);
              setEditingMemberId(null);
              setFormData({ name: '', email: '', password: '', role: '', year: '', status: 'active' });
            }} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label htmlFor="member-name" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Full Name</label>
            <input
              id="member-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
            />
          </div>
          
          <div>
            <label htmlFor="member-email" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Email Address</label>
            <input
              id="member-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={Boolean(editingMemberId)}
              className={`w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm ${editingMemberId ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
          </div>

          {!editingMemberId && (
            <div>
              <label htmlFor="member-password" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Initial Password</label>
              <input
                id="member-password"
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
              />
            </div>
          )}

          <div>
            <label htmlFor="member-role" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Role / Designation</label>
            <input
              id="member-role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Lead Coordinator, Designer"
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
            />
          </div>

          <div>
            <label htmlFor="member-year" className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Academic Year / Status</label>
            <select
              id="member-year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer"
            >
              <option value="" disabled>Select Academic Year...</option>
              <option value="1" className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">1st Year (Fresher)</option>
              <option value="2" className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">2nd Year (Executive)</option>
              <option value="3" className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">3rd Year (Senior Executive)</option>
              <option value="4" className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">4th Year (Final Year Lead)</option>
              <option value="5" className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">5th Year / Alumni (Hall of Fame)</option>
              <option value="6" className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white">Former Member</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-2.5 rounded-lg text-sm transition-all duration-300 disabled:opacity-70 flex justify-center items-center shadow-glow hover:shadow-glow-strong"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              editingMemberId ? 'Update Member Profile' : 'Create Member Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberFormDrawer;
