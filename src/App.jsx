import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import Starfield from './components/Starfield';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = lazy(() => import('./pages/Home'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Profile = lazy(() => import('./pages/Profile'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/tasks" element={<PageTransition><Tasks /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute requireAdmin={false}>
              <PageTransition><Profile /></PageTransition>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/50 bg-[#F9FAFB] dark:bg-dark-bg relative">
            <Starfield />
            <MouseFollower />
            <Navbar />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-500 dark:text-gray-400">Loading...</div>}>
              <AnimatedRoutes />
            </Suspense>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
