import React, { useState, useEffect, useRef } from 'react';
import { LogOut, UserPlus, Users, ClipboardList, CheckCircle, Trash2, ChevronDown, X, Plus, MoreVertical, Edit2 } from 'lucide-react';
import { auth, secondaryAuth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { createUserProfile, getAllTeamMembers, createTask, getAllTasks, updateTaskStatus, deleteTask, deleteTeamMember, updateUserProfile } from '../firebase/db';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('team'); // 'team', 'tasks'
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteMember = async (memberId, memberName) => {
    if (window.confirm(`Are you sure you want to remove ${memberName}? This will delete their profile from the website.`)) {
      try {
        await deleteTeamMember(memberId);
        setMembers(prev => prev.filter(m => m.id !== memberId));
        toast.success(`${memberName} has been removed.`);
      } catch (error) {
        console.error(error);
        toast.error('Failed to remove member.');
      }
    }
    setActiveDropdownId(null);
  };

  const getOrdinalYear = (year) => {
    const y = parseInt(year);
    if (!y) return <span>Unknown</span>;
    if (y === 5) return <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase text-[10px]">Alumni</span>;
    if (y === 6) return <span className="text-gray-500 dark:text-gray-400 font-bold tracking-wide uppercase text-[10px]">Former</span>;
    if (y > 6) return <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase text-[10px]">Alumni</span>;
    if (y === 1) return <span>1<sup className="lowercase">st</sup></span>;
    if (y === 2) return <span>2<sup className="lowercase">nd</sup></span>;
    if (y === 3) return <span>3<sup className="lowercase">rd</sup></span>;
    if (y === 4) return <span>4<sup className="lowercase">th</sup></span>;
    return <span>{y}</span>;
  };

  // Member Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    year: '',
    status: 'active'
  });

  // Task Form state
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: ''
  });

  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getAllTeamMembers();
      setMembers(data);
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingMemberId) {
        // Edit Mode
        const updatedData = {
          name: formData.name,
          role: formData.role,
          year: formData.year,
          status: formData.status || 'active',
        };
        
        await updateUserProfile(editingMemberId, updatedData);
        
        setMembers(prev => prev.map(m => m.id === editingMemberId ? { ...m, ...updatedData } : m));
        toast.success(`${formData.name}'s profile updated!`);
      } else {
        // Create Mode
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, formData.email, formData.password);
        const newUserId = userCredential.user.uid;
        
        const newUserData = {
          name: formData.name,
          email: formData.email,
          role: formData.role || 'Member',
          systemRole: 'member',
          year: formData.year,
          status: formData.status || 'active',
          profileImage: '',
          linkedin: '',
          instagram: '',
          createdAt: new Date().toISOString()
        };

        await createUserProfile(newUserId, newUserData);
        setMembers(prev => [...prev, { id: newUserId, ...newUserData }]);
        toast.success('Member added successfully!');
        
        // Immediately sign out the secondary auth to prevent active session conflicts
        await signOut(secondaryAuth);
      }
      
      setIsAddingMember(false);
      setEditingMemberId(null);
      setFormData({ name: '', email: '', password: '', role: '', year: '', status: 'active' });
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already in use by another member.');
      } else {
        toast.error(`Failed to ${editingMemberId ? 'update' : 'add'} member.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (member) => {
    setEditingMemberId(member.id);
    setFormData({
      name: member.name || '',
      email: member.email || '',
      password: '', // Kept empty for security
      role: member.role || '',
      year: member.year || '',
      status: member.status || 'active'
    });
    setIsAddingMember(true);
    setActiveDropdownId(null);
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createTask(taskData);
      toast.success('Task assigned successfully!');
      setTaskData({ title: '', description: '', assignedTo: '', deadline: '' });
      fetchTasks();
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(id);
      fetchTasks();
      toast.success('Task deleted');
    }
  };

  const filteredMembers = members
    .filter(m => m.systemRole !== 'admin' && m.role !== 'admin')
    .sort((a, b) => {
      const yearDiff = parseInt(b.year || 0) - parseInt(a.year || 0);
      if (yearDiff !== 0) return yearDiff;
      return (a.name || '').localeCompare(b.name || '');
    });

  const currentMembersList = filteredMembers.filter(m => parseInt(m.year || 0) <= 4 && m.status !== 'former');
  const alumniList = filteredMembers.filter(m => parseInt(m.year || 0) === 5);
  const formerMembersList = filteredMembers.filter(m => 
    (parseInt(m.year || 0) <= 4 && m.status === 'former') || 
    parseInt(m.year || 0) === 6
  );

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 max-w-7xl mx-auto relative z-10">
      <Toaster 
        position="top-right" 
        containerStyle={{
          top: 100,
          right: 20,
        }}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
            Control Panel
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 font-medium">Manage E-Cell RECABN team members</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-bold text-sm shadow-sm"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="flex border-b border-gray-200/50 dark:border-white/10 mb-8 gap-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('team')}
          className={`pb-4 font-display font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'team' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Team Management
        </button>
        <button 
          onClick={() => setActiveTab('tasks')}
          className={`pb-4 font-display font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'tasks' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Task Manager
        </button>
      </div>

      {activeTab === 'team' ? (
        <div className={`flex flex-col lg:flex-row-reverse items-start transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isAddingMember ? 'gap-8' : 'gap-0'}`}>
          
          {/* Add Member Form Wrapper */}
          <div 
            className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shrink-0 ${
              isAddingMember
                ? 'max-h-[800px] lg:max-h-none opacity-100 lg:w-[350px] xl:w-[400px]'
                : 'max-h-0 lg:max-h-none lg:w-0 opacity-0'
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
                  onClick={() => {
                    setIsAddingMember(false);
                    setEditingMemberId(null);
                    setFormData({ name: '', email: '', password: '', role: '', year: '', status: 'active' });
                  }} 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={!!editingMemberId}
                    className={`w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm ${editingMemberId ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                {!editingMemberId && (
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Initial Password</label>
                    <input
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
                  <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">E-Cell Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Coordinator"
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Academic Year</label>
                    <div 
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer flex justify-between items-center"
                      onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    >
                      <span className={formData.year ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                        {formData.year ? (
                          formData.year === '1' ? '1st Year' :
                          formData.year === '2' ? '2nd Year' :
                          formData.year === '3' ? '3rd Year' :
                          formData.year === '4' ? '4th Year (Senior)' :
                          formData.year === '5' ? 'Passout / Alumni' : 'Select...'
                        ) : 'Select...'}
                      </span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isYearDropdownOpen ? 'rotate-180 text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    
                    {isYearDropdownOpen && (
                      <div className="absolute z-50 w-full bottom-full mb-2 bg-white/95 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-2xl">
                        {[
                          { value: '1', label: '1st Year' },
                          { value: '2', label: '2nd Year' },
                          { value: '3', label: '3rd Year' },
                          { value: '4', label: '4th Year (Senior)' },
                          { value: '5', label: 'Passout / Alumni' },
                        ].map(option => (
                          <div 
                            key={option.value}
                            className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-100/50 dark:border-white/5 last:border-0 transition-colors ${
                              formData.year === option.value 
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold' 
                                : 'hover:bg-gray-50/80 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 font-medium'
                            }`}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, year: option.value }));
                              setIsYearDropdownOpen(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                    <input type="hidden" name="year" value={formData.year} required />
                  </div>
                  
                  <div className="relative">
                    <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Active Status</label>
                    <div 
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer flex justify-between items-center"
                      onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    >
                      <span className={formData.status ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                        {formData.status === 'active' ? 'Active' : 'Former (Inactive)'}
                      </span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isStatusDropdownOpen ? 'rotate-180 text-indigo-500' : 'text-gray-400'}`} />
                    </div>
                    
                    {isStatusDropdownOpen && (
                      <div className="absolute z-50 w-full bottom-full mb-2 bg-white/95 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-2xl">
                        {[
                          { value: 'active', label: 'Active Member' },
                          { value: 'former', label: 'Former (Inactive)' }
                        ].map(option => (
                          <div 
                            key={option.value}
                            className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-100/50 dark:border-white/5 last:border-0 transition-colors ${
                              formData.status === option.value 
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold' 
                                : 'hover:bg-gray-50/80 dark:hover:bg-white/5 text-gray-800 dark:text-gray-200 font-medium'
                            }`}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, status: option.value }));
                              setIsStatusDropdownOpen(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                    <input type="hidden" name="status" value={formData.status} required />
                  </div>
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

          {/* Members Column */}
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
                  <div className="p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="font-medium">Loading members...</p>
                  </div>
                ) : currentMembersList.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 dark:text-gray-400 font-medium">No active team members found.</div>
                ) : (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50/50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200/50 dark:border-white/10">
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Member</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Email</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Role</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Year</th>
                        <th className="px-4 py-3 w-10"></th>
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
                                  <span className="text-xs font-bold text-gray-500">{member.name.charAt(0).toUpperCase()}</span>
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
                              onClick={() => setActiveDropdownId(activeDropdownId === member.id ? null : member.id)}
                              className="p-1.5 text-gray-400 hover:text-indigo-500 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                            >
                              <MoreVertical size={18} />
                            </button>
                            
                            {activeDropdownId === member.id && (
                              <div ref={dropdownRef} className="absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                                <button onClick={() => handleEditClick(member)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                  <Edit2 size={14} />
                                  Edit Profile
                                </button>
                                <button 
                                  onClick={() => handleDeleteMember(member.id, member.name)}
                                  className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                                >
                                  <Trash2 size={14} />
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

            {/* Hall of Fame Table */}
            {alumniList.length > 0 && (
              <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
                <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">Hall of Fame</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Passout Seniors</p>
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
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Member</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Email</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Role</th>
                        <th className="px-4 py-3 w-10"></th>
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
                                  <span className="text-xs font-bold text-gray-500">{member.name.charAt(0).toUpperCase()}</span>
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
                              onClick={() => setActiveDropdownId(activeDropdownId === member.id ? null : member.id)}
                              className="p-1.5 text-gray-400 hover:text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors"
                            >
                              <MoreVertical size={18} />
                            </button>
                            
                            {activeDropdownId === member.id && (
                              <div ref={dropdownRef} className="absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                                <button onClick={() => handleEditClick(member)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                  <Edit2 size={14} />
                                  Edit Profile
                                </button>
                                <button 
                                  onClick={() => handleDeleteMember(member.id, member.name)}
                                  className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                                >
                                  <Trash2 size={14} />
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
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Member</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Email</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Role</th>
                        <th className="px-4 py-3 font-bold font-sans tracking-wide uppercase text-[11px]">Year</th>
                        <th className="px-4 py-3 w-10"></th>
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
                                  <span className="text-xs font-bold text-gray-500">{member.name.charAt(0).toUpperCase()}</span>
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
                              onClick={() => setActiveDropdownId(activeDropdownId === member.id ? null : member.id)}
                              className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            >
                              <MoreVertical size={18} />
                            </button>
                            
                            {activeDropdownId === member.id && (
                              <div ref={dropdownRef} className="absolute right-8 top-10 w-36 bg-white dark:bg-dark-surface rounded-xl shadow-premium dark:shadow-premium-dark border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                                <button onClick={() => handleEditClick(member)} className="w-full px-4 py-2 text-left text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                  <Edit2 size={14} />
                                  Edit Profile
                                </button>
                                <button 
                                  onClick={() => handleDeleteMember(member.id, member.name)}
                                  className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                                >
                                  <Trash2 size={14} />
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
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Task Form */}
          <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 p-6 h-fit transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
            <div className="flex items-center gap-4 mb-5 border-b border-gray-200/50 dark:border-white/10 pb-5">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm">
                <ClipboardList size={20} />
              </div>
              <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">Assign Task</h2>
            </div>
            
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Task Title</label>
                <input
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
                <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Description</label>
                <textarea
                  name="description"
                  value={taskData.description}
                  onChange={handleTaskChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm resize-none"
                ></textarea>
              </div>

              <div className="relative">
                <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Assign To</label>
                <div 
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm cursor-pointer flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={taskData.assignedTo ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    {taskData.assignedTo 
                      ? (() => {
                          const user = members.find(m => m.id === taskData.assignedTo);
                          return user ? `${user.name} (${user.role})` : 'Select a member...';
                        })()
                      : 'Select a member...'}
                  </span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white/95 dark:bg-[#1a1c23]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto custom-scrollbar">
                    {filteredMembers.filter(m => parseInt(m.year || 0) < 4).map(member => (
                      <div 
                        key={member.id}
                        className="px-4 py-3 text-sm hover:bg-gray-50/80 dark:hover:bg-white/5 cursor-pointer text-gray-800 dark:text-gray-200 border-b border-gray-100/50 dark:border-white/5 last:border-0 transition-colors flex items-center gap-3"
                        onClick={() => {
                          setTaskData(prev => ({ ...prev, assignedTo: member.id }));
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-dark-surface shrink-0 border border-gray-200/50 dark:border-white/10 flex items-center justify-center">
                          {member.profileImage ? (
                            <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-gray-500">{member.name.charAt(0).toUpperCase()}</span>
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
                <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans">Deadline</label>
                <input
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

          {/* Task List */}
          <div className="lg:col-span-2 bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
            <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm">
                  <CheckCircle size={24} />
                </div>
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">Active Tasks</h2>
              </div>
            </div>

            <div className="overflow-x-auto p-5 md:p-6">
              {loading ? (
                <div className="p-12 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
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
                              Due: {new Date(task.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                          title="Delete Task"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
