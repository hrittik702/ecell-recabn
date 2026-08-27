import React, { useState, useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';
import { auth, secondaryAuth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { 
  createUserProfile, 
  getAllTeamMembers, 
  createTask, 
  getAllTasks, 
  deleteTask, 
  deleteTeamMember, 
  updateUserProfile 
} from '../firebase/db';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import MemberFormDrawer from '../components/admin/MemberFormDrawer';
import MemberTable from '../components/admin/MemberTable';
import TaskFormDrawer from '../components/admin/TaskFormDrawer';
import TaskManagerTab from '../components/admin/TaskManagerTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('team'); // 'team', 'tasks'
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    year: '',
    status: 'active'
  });

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: ''
  });

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

  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

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
      password: '',
      role: member.role || '',
      year: member.year || '',
      status: member.status || 'active'
    });
    setIsAddingMember(true);
    setActiveDropdownId(null);
  };

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

  const getOrdinalYear = (year) => {
    const y = parseInt(year);
    if (!y) return <span>Member</span>;
    if (y === 5) return <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase text-[10px]">Alumni</span>;
    if (y === 6) return <span className="text-gray-500 dark:text-gray-400 font-bold tracking-wide uppercase text-[10px]">Former</span>;
    if (y > 6) return <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wide uppercase text-[10px]">Alumni</span>;
    if (y === 1) return <span>1<sup className="lowercase">st</sup></span>;
    if (y === 2) return <span>2<sup className="lowercase">nd</sup></span>;
    if (y === 3) return <span>3<sup className="lowercase">rd</sup></span>;
    if (y === 4) return <span>4<sup className="lowercase">th</sup></span>;
    return <span>{y}</span>;
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
            Control Panel
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 font-medium">Manage E-Cell RECABN team members & assignments</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-bold text-sm shadow-sm"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="flex border-b border-gray-200/50 dark:border-white/10 mb-8 gap-8 overflow-x-auto">
        <button 
          type="button"
          onClick={() => setActiveTab('team')}
          className={`pb-4 font-display font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'team' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Team Management
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('tasks')}
          className={`pb-4 font-display font-bold text-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === 'tasks' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Task Manager
        </button>
      </div>

      {activeTab === 'team' ? (
        <div className={`flex flex-col lg:flex-row-reverse items-start transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isAddingMember ? 'gap-8' : 'gap-0'}`}>
          <MemberFormDrawer 
            isAddingMember={isAddingMember}
            setIsAddingMember={setIsAddingMember}
            editingMemberId={editingMemberId}
            setEditingMemberId={setEditingMemberId}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleAddMember={handleAddMember}
            isSubmitting={isSubmitting}
          />
          <MemberTable 
            currentMembersList={currentMembersList}
            alumniList={alumniList}
            formerMembersList={formerMembersList}
            loading={loading}
            isAddingMember={isAddingMember}
            setIsAddingMember={setIsAddingMember}
            activeDropdownId={activeDropdownId}
            setActiveDropdownId={setActiveDropdownId}
            dropdownRef={dropdownRef}
            handleEditClick={handleEditClick}
            handleDeleteMember={handleDeleteMember}
            getOrdinalYear={getOrdinalYear}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <TaskFormDrawer 
            taskData={taskData}
            setTaskData={setTaskData}
            handleTaskChange={handleTaskChange}
            handleAddTask={handleAddTask}
            isSubmitting={isSubmitting}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            filteredMembers={filteredMembers}
            getOrdinalYear={getOrdinalYear}
          />
          <TaskManagerTab 
            tasks={tasks}
            members={members}
            loading={loading}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
