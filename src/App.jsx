import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import Starfield from './components/Starfield';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = lazy(() => import('./pages/Home'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Profile = lazy(() => import('./pages/Profile'));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500 dark:text-gray-400 gap-3">
    <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
    <span className="text-xs font-mono font-medium tracking-wider uppercase">Loading...</span>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-indigo-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
          >
            Skip to main content
          </a>

          <div className="min-h-screen text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/50 bg-[#F9FAFB] dark:bg-dark-bg relative">
            <Toaster 
              position="top-right" 
              toastOptions={{
                className: 'font-sans font-medium text-sm',
                duration: 4000
              }}
            />
            <Starfield />
            <MouseFollower />
            <Navbar />
            <main id="main-content" tabIndex="-1" className="outline-none focus:outline-none">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute requireAdmin={false}><Profile /></ProtectedRoute>} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
