import React from 'react';
import { Users, Plus, MoreVertical, Edit2, Trash2, LogOut } from 'lucide-react';

const MemberTable = ({
  currentMembersList,
  alumniList,
  formerMembersList,
  loading,
  isAddingMember,
  setIsAddingMember,
  activeDropdownId,
  setActiveDropdownId,
  dropdownRef,
  handleEditClick,
  handleDeleteMember,
  getOrdinalYear
}) => {
  // Dismiss dropdown on Escape key
  React.useEffect(() => {
    if (!activeDropdownId) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdownId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdownId, setActiveDropdownId]);

  return (
    <div className="flex-1 w-full space-y-8 overflow-hidden">
      {/* Current Members Table */}
      <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
        <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm">
              <Users size={24} />
            </div>
            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">Current Team Members</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm">
              {currentMembersList.length} Members
            </span>
            {!isAddingMember && (
              <button
                type="button"
                onClick={() => setIsAddingMember(true)}
                className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Plus size={16} />
                Add Member
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="w-full min-w-[600px]">
              <div className="h-10 bg-gray-50/50 dark:bg-dark-surface/50 border-b border-gray-200/50 dark:border-white/10 w-full"></div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 w-full animate-pulse bg-white/20 dark:bg-transparent">
                  <div className="w-8 h-8 rounded-full bg-gray-200/60 dark:bg-white/10 shrink-0"></div>
                  <div className="h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200/60 dark:bg-white/10 rounded w-1/3 ml-auto"></div>
                  <div className="h-6 w-16 bg-gray-200/60 dark:bg-white/10 rounded ml-auto"></div>
                </div>
              ))}
            </div>
          ) : currentMembersList.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400 font-medium">No active team members found.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10">
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Member</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Email</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Role</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Year</th>
                  <th scope="col" className="px-4 py-3 w-10"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {currentMembersList.map((member) => (
                  <tr key={member.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 flex items-center justify-center shrink-0">
                          {member.profileImage ? (
                            <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-gray-500">{member.name ? member.name.charAt(0).toUpperCase() : 'U'}</span>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white font-sans text-sm">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-[13px] font-medium">{member.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-white/60 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 rounded-md text-[11px] font-bold text-indigo-700 dark:text-indigo-300 shadow-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">{getOrdinalYear(member.year)} Year</td>
                    <td className="px-4 py-3 relative text-right">
                      <button 
                        type="button"
                        onClick={() => setActiveDropdownId(activeDropdownId === member.id ? null : member.id)}
                        className="p-1.5 text-gray-400 hover:text-indigo-500 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        aria-label={`Actions for ${member.name}`}
                        aria-haspopup="menu"
                        aria-expanded={activeDropdownId === member.id}
                      >
                        <MoreVertical size={18} aria-hidden="true" />
                      </button>
                      
                      {activeDropdownId === member.id && (
                        <div ref={dropdownRef} role="menu" aria-label={`Actions for ${member.name}`} className="absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                          <button role="menuitem" type="button" onClick={() => handleEditClick(member)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                            <Edit2 size={14} aria-hidden="true" />
                            Edit Profile
                          </button>
                          <button 
                            role="menuitem"
                            type="button"
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Hall of Fame / Alumni Table */}
      {alumniList.length > 0 && (
        <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
          <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">Hall of Fame</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Passout Seniors & Mentors</p>
              </div>
            </div>
            <span className="bg-purple-50 text-purple-700 border border-purple-100 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm">
              {alumniList.length} Members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10">
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Member</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Email</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Role</th>
                  <th scope="col" className="px-4 py-3 w-10"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {alumniList.map((member) => (
                  <tr key={member.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors group opacity-80 hover:opacity-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 flex items-center justify-center shrink-0">
                          {member.profileImage ? (
                            <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover grayscale" />
                          ) : (
                            <span className="text-xs font-bold text-gray-500">{member.name ? member.name.charAt(0).toUpperCase() : 'U'}</span>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white font-sans text-sm">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-[13px] font-medium">{member.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-white/60 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 rounded-md text-[11px] font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 relative text-right">
                      <button 
                        type="button"
                        onClick={() => setActiveDropdownId(activeDropdownId === member.id ? null : member.id)}
                        className="p-1.5 text-gray-400 hover:text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                        aria-label={`Actions for ${member.name}`}
                        aria-haspopup="menu"
                        aria-expanded={activeDropdownId === member.id}
                      >
                        <MoreVertical size={18} aria-hidden="true" />
                      </button>
                      
                      {activeDropdownId === member.id && (
                        <div ref={dropdownRef} role="menu" aria-label={`Actions for ${member.name}`} className="absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                          <button role="menuitem" type="button" onClick={() => handleEditClick(member)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
                            <Edit2 size={14} aria-hidden="true" />
                            Edit Profile
                          </button>
                          <button 
                            role="menuitem"
                            type="button"
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Former Members Table */}
      {formerMembersList.length > 0 && (
        <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
          <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 shadow-sm">
                <LogOut size={24} />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">Former Members</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Previous Year Members</p>
              </div>
            </div>
            <span className="bg-gray-100 text-gray-700 border border-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 py-1.5 px-4 rounded-full text-sm font-bold shadow-sm">
              {formerMembersList.length} Members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10">
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Member</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Email</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Role</th>
                  <th scope="col" className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Year</th>
                  <th scope="col" className="px-4 py-3 w-10"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {formerMembersList.map((member) => (
                  <tr key={member.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors group opacity-60 hover:opacity-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 flex items-center justify-center shrink-0">
                          {member.profileImage ? (
                            <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover grayscale" />
                          ) : (
                            <span className="text-xs font-bold text-gray-500">{member.name ? member.name.charAt(0).toUpperCase() : 'U'}</span>
                          )}
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white font-sans text-sm">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-[13px] font-medium">{member.email}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-white/60 dark:bg-dark-surface border border-gray-200/50 dark:border-white/10 rounded-md text-[11px] font-bold text-gray-600 dark:text-gray-400 shadow-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">{getOrdinalYear(member.year)} Year</td>
                    <td className="px-4 py-3 relative text-right">
                      <button 
                        type="button"
                        onClick={() => setActiveDropdownId(activeDropdownId === member.id ? null : member.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                        aria-label={`Actions for ${member.name}`}
                        aria-haspopup="menu"
                        aria-expanded={activeDropdownId === member.id}
                      >
                        <MoreVertical size={18} aria-hidden="true" />
                      </button>
                      
                      {activeDropdownId === member.id && (
                        <div ref={dropdownRef} role="menu" aria-label={`Actions for ${member.name}`} className="absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                          <button role="menuitem" type="button" onClick={() => handleEditClick(member)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500">
                            <Edit2 size={14} aria-hidden="true" />
                            Edit Profile
                          </button>
                          <button 
                            role="menuitem"
                            type="button"
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberTable;
