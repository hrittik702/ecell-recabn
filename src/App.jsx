import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import Starfield from './components/Starfield';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/50 bg-[#F9FAFB] dark:bg-dark-bg relative">
          <Starfield />
          <MouseFollower />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

