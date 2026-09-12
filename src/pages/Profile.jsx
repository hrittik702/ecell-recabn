import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, getTasksForUser, updateTaskStatus } from '../firebase/db';
import { signOut, updatePassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, Save, User, Camera, X, ClipboardList, CheckCircle, Edit2, Upload, Instagram, Linkedin, Key } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg, getCroppedBlob } from '../utils/cropImage';
import { normalizeLinkedInUrl, normalizeInstagramUrl } from '../utils/socialLinks';
import { isAdmin as checkIsAdmin } from '../utils/auth';
import { uploadUserAvatar } from '../firebase/storage';

const Profile = () => {
  const { currentUser, userData, loading: authLoading, updateUserData } = useAuth();
  const isAdmin = checkIsAdmin(userData);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    year: '',
    role: '',
    linkedin: '',
    instagram: '',
    profileImage: ''
  });

  // Image Cropping & Uploading State
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Close crop modal on Escape key press
  useEffect(() => {
    if (!isCropping) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isUploading) {
        setIsCropping(false);
        setImageSrc(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCropping, isUploading]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        year: userData.year || '',
        role: userData.role || '',
        linkedin: userData.linkedin || '',
        instagram: userData.instagram || '',
        profileImage: userData.profileImage || ''
      });
    }
  }, [userData]);

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  const fetchTasks = async () => {
    if (!currentUser?.uid) return;
    try {
      setLoadingTasks(true);
      const data = await getTasksForUser(currentUser.uid);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleToggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      await updateTaskStatus(taskId, newStatus);
      fetchTasks();
      toast.success(`Task marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update task');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    try {
      const cleanedData = {
        name: formData.name,
        year: formData.year,
        profileImage: formData.profileImage,
        linkedin: normalizeLinkedInUrl(formData.linkedin),
        instagram: normalizeInstagramUrl(formData.instagram)
      };
      if (isAdmin && formData.role) {
        cleanedData.role = formData.role;
      }
      await updateUserProfile(currentUser.uid, cleanedData);
      if (updateUserData) updateUserData(cleanedData);
      setFormData(cleanedData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Max size is 5MB.");
        e.target.value = ''; 
        return;
      }
      
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropAndUpload = async () => {
    try {
      setIsUploading(true);
      // Produce compressed binary JPEG Blob (512x512 retina avatar, quality 0.8)
      const imageBlob = await getCroppedBlob(imageSrc, croppedAreaPixels);
      
      // Upload directly to Firebase Storage
      const downloadUrl = await uploadUserAvatar(currentUser.uid, imageBlob);
      
      // Save lightweight download URL in Firestore
      await updateUserProfile(currentUser.uid, { profileImage: downloadUrl });
      if (updateUserData) updateUserData({ profileImage: downloadUrl });
      
      setFormData(prev => ({ ...prev, profileImage: downloadUrl }));
      toast.success("Profile photo updated live!");
      
      setIsCropping(false);
      setIsUploading(false);
      setImageSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (e) {
      console.error("Failed to upload avatar to Firebase Storage:", e);
      toast.error("Failed to process and upload image: " + e.message);
      setIsUploading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsChangingPassword(true);
    try {
      await updatePassword(auth.currentUser, passwordForm.newPassword);
      toast.success('Password updated successfully!');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please log out and log back in to change your password.', { duration: 5000 });
      } else {
        toast.error('Failed to update password');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
            Account
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 font-medium">Manage your public E-Cell information</p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="px-5 py-2.5 bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/30 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all font-bold text-sm shadow-sm"
            >
              Admin Panel
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/60 dark:bg-dark-surface/60 backdrop-blur-md text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-bold text-sm shadow-sm"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile Settings (span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark overflow-hidden border border-white/60 dark:border-white/10 transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
            
            <div className="p-6 md:p-8">
              
              {/* Header with Edit Button */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200/50 dark:border-white/10">
                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Personal Details</h3>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors border border-indigo-100 dark:border-indigo-500/20"
                  >
                    <Edit2 size={12} />
                    Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Top Section: Avatar + Essential Info */}
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  
                  {/* Avatar Section (Left) */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={onFileChange} 
                      className="hidden" 
                    />
                    
                    <div className="relative">
                      <div 
                        onClick={() => isEditing && fileInputRef.current?.click()}
                        className={`w-32 h-32 md:w-36 md:h-36 rounded-full bg-white/60 dark:bg-dark-surface/50 backdrop-blur-md overflow-hidden border-4 border-white dark:border-dark-surface shadow-xl flex items-center justify-center relative group ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        {formData.profileImage ? (
                          <img src={formData.profileImage} alt="Profile" className={`w-full h-full object-cover transition-transform duration-500 ${isEditing ? 'group-hover:scale-110' : ''}`} />
                        ) : (
                          <User size={48} className="text-gray-400 dark:text-gray-500" />
                        )}
                        {/* Overlay for hovering */}
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Camera className="text-white mb-1" size={24} />
                          </div>
                        )}
                      </div>
                      
                      {/* Subtle Indicator Badge */}
                      {isEditing && (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-1 right-1 w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-dark-card cursor-pointer hover:bg-indigo-700 hover:scale-110 transition-all z-10"
                          title="Change Profile Photo"
                        >
                          <Upload size={14} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top Form Fields (Right) */}
                  <div className="flex-grow w-full space-y-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">
                        E-Cell Role {!isAdmin && '(Assigned by Admin)'}
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        disabled={!isEditing || !isAdmin}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Full Width */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200/50 dark:border-white/10">
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-gray-400 dark:text-gray-500 font-sans uppercase tracking-wide">Email Address (Locked)</label>
                    <input
                      type="email"
                      value={currentUser?.email || ''}
                      disabled
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 text-gray-400 dark:text-gray-500 cursor-not-allowed outline-none backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">Year</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      disabled={!isEditing}
                      placeholder="e.g. 2"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">LinkedIn Username</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Linkedin size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="username"
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">Instagram Username</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Instagram size={14} className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="username"
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="md:col-span-2 pt-2">
                      <label className="block text-xs font-bold mb-3 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">Social Connect</label>
                      <div className="flex gap-3">
                        {normalizeLinkedInUrl(formData.linkedin) ? (
                          <a href={normalizeLinkedInUrl(formData.linkedin)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors text-sm font-bold">
                            <Linkedin size={16} />
                            LinkedIn
                          </a>
                        ) : null}
                        
                        {normalizeInstagramUrl(formData.instagram) ? (
                          <a href={normalizeInstagramUrl(formData.instagram)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-500/20 hover:bg-pink-100 dark:hover:bg-pink-500/20 transition-colors text-sm font-bold">
                            <Instagram size={16} />
                            Instagram
                          </a>
                        ) : null}

                        {!normalizeLinkedInUrl(formData.linkedin) && !normalizeInstagramUrl(formData.instagram) && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 italic px-1">No social links added. Click Edit to add them.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="pt-4 flex gap-3 border-t border-gray-200/50 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 flex justify-center items-center px-4 py-2.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-sans font-bold text-sm rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] flex justify-center items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm rounded-lg transition-all duration-300 disabled:opacity-70 shadow-sm"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Save size={16} />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark overflow-hidden border border-white/60 dark:border-white/10 transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200/50 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                    <Key size={18} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">Change Password</h3>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300 font-sans uppercase tracking-wide">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-dark-surface/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all backdrop-blur-sm"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isChangingPassword || !passwordForm.newPassword}
                  className="w-full flex justify-center items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm rounded-xl transition-all duration-300 disabled:opacity-70 shadow-sm mt-2"
                >
                  {isChangingPassword ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Right Column: Tasks (span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl rounded-3xl shadow-premium dark:shadow-premium-dark overflow-hidden border border-white/60 dark:border-white/10 transition-all duration-500 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover h-full flex flex-col">
            
            <div className="p-5 md:p-6 border-b border-gray-200/50 dark:border-white/10 flex items-center gap-4 bg-gray-50/50 dark:bg-dark-surface/30">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 shadow-sm shrink-0">
                <ClipboardList size={20} />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">Assigned Tasks</h2>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Tasks assigned to you by the admin</p>
              </div>
            </div>
            
            <div className="p-5 md:p-6 flex-1 overflow-y-auto">
              {loadingTasks ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/40 dark:bg-dark-surface/40 border border-gray-100 dark:border-white/5 p-5 rounded-xl animate-pulse flex flex-col">
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="h-5 bg-gray-200/60 dark:bg-white/10 rounded w-3/4"></div>
                        <div className="h-5 bg-gray-200/60 dark:bg-white/10 rounded w-16"></div>
                      </div>
                      <div className="h-3 bg-gray-200/60 dark:bg-white/10 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200/60 dark:bg-white/10 rounded w-5/6 mb-6"></div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-white/5 mt-auto">
                        <div className="h-3 bg-gray-200/60 dark:bg-white/10 rounded w-12"></div>
                        <div className="h-4 bg-gray-200/60 dark:bg-white/10 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                  <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-full mb-3">
                    <CheckCircle size={32} className="opacity-50" />
                  </div>
                  <p className="font-medium">You have no tasks assigned to you.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map(task => (
                    <div key={task.id} className="bg-white/80 dark:bg-dark-surface/80 border border-gray-100 dark:border-white/5 p-5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col">
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight">{task.title}</h3>
                        <button 
                          onClick={() => handleToggleTaskStatus(task.id, task.status)}
                          className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            task.status === 'completed' 
                              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30' 
                              : 'bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 dark:bg-dark-card dark:text-gray-400 dark:border-white/10 dark:hover:border-indigo-500/50'
                          }`}
                        >
                          <CheckCircle size={12} className={task.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} />
                          {task.status}
                        </button>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4 flex-1">{task.description}</p>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-white/10">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deadline</span>
                        <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-md">
                          {task.deadline ? (isNaN(new Date(task.deadline).getTime()) ? task.deadline : new Date(task.deadline).toLocaleDateString()) : 'No deadline'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Crop Modal */}
      {isCropping && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="crop-modal-title"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-white/10">
            <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-dark-surface/50">
              <h3 id="crop-modal-title" className="font-display font-bold text-xl text-gray-900 dark:text-white">Crop Photo</h3>
              <button 
                onClick={() => { setIsCropping(false); setImageSrc(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                aria-label="Close crop dialog"
                className="p-2 bg-gray-200/50 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
                disabled={isUploading}
              >
                <X size={20} className="text-gray-900 dark:text-white" />
              </button>
            </div>
            
            <div className="relative w-full h-[350px] bg-black">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-dark-surface/50">
              <label htmlFor="crop-zoom" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-sans">Zoom</label>
              <input
                id="crop-zoom"
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom level"
                onChange={(e) => setZoom(e.target.value)}
                className="w-full accent-indigo-500 mb-6"
                disabled={isUploading}
              />
              
              <button
                onClick={handleCropAndUpload}
                disabled={isUploading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold rounded-xl transition-all shadow-glow hover:shadow-glow-strong flex justify-center items-center"
              >
                {isUploading ? (
                   <span className="flex items-center gap-3">
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     Uploading...
                   </span>
                ) : 'Crop & Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
