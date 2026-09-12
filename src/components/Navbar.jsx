import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Linkedin, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = ['Home', 'About', 'Events', 'Timeline', 'Team'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, userData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Scroll handler for seamless transition
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    }, { threshold: 0, rootMargin: '-40% 0px -40% 0px' });

    NAV_ITEMS.forEach((item) => {
      const sectionId = item.toLowerCase();
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: section.offsetTop - 80, autoKill: false },
          ease: 'power3.inOut'
        });
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    } else {
      navigate('/#' + sectionId);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };


  useGSAP(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, {
      y: -20,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, { scope: navRef, dependencies: [] });

  return (
    <nav 
      ref={navRef} 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-out ${
        scrolled 
          ? 'bg-white/85 dark:bg-[#0a0a0a]/85 backdrop-blur-[18px] border-b border-white/50 dark:border-white/10 py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
          : 'bg-transparent py-5 md:py-6 border-b-0 shadow-none'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        
        {/* Navigation Logo */}
        <Link to="/" className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
          <img 
            src="/assets/ecell-logo.png" 
            alt="E-Cell REC ABN" 
            width="40"
            height="40"
            className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/ecell-logo.png'; }}
          />
          <span className={`text-lg md:text-xl font-display font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400' : 'text-white group-hover:text-gray-200'
          }`}>
            E-CELL REC ABN
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            
            return (
              <a 
                key={item} 
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, sectionId)}
                className={`relative px-4 py-2 font-sans text-sm font-semibold rounded-full transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  scrolled 
                    ? isActive ? 'text-indigo-600 bg-indigo-50/80 shadow-sm dark:text-indigo-400 dark:bg-indigo-500/15' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10' 
                    : isActive ? 'text-white bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                }`}
              >
                {item}
              </a>
            );
          })}

          {/* Vertical Divider & Social Icons */}
          <div className={`flex items-center space-x-3 border-l pl-4 lg:pl-6 ml-2 lg:ml-4 h-6 transition-colors duration-300 ${
            scrolled ? 'border-gray-200 dark:border-white/10' : 'border-white/20'
          }`}>
            <button 
              onClick={toggleTheme} 
              className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                scrolled ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/10 dark:hover:text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`} 
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="https://www.instagram.com/ecell_recabn/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram" 
              className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                scrolled ? 'text-gray-400 hover:text-pink-600 hover:bg-pink-50 dark:text-gray-500 dark:hover:text-white dark:hover:bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn" 
              className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                scrolled ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-500 dark:hover:text-white dark:hover:bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Profile / Login */}
          <div className="pl-4 ml-2 flex items-center">
            {currentUser ? (
              <Link 
                to="/profile" 
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-200 dark:border-indigo-500/50 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors block shadow-sm group bg-white dark:bg-dark-surface"
              >
                {userData?.profileImage ? (
                  <img src={userData.profileImage} alt={userData?.name || "Profile"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center font-sans text-sm">
                     {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </Link>
            ) : (
              <Link 
                to="/login"
                className={`relative px-5 py-2 font-sans text-sm font-bold rounded-full transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 border border-transparent shadow-sm hover:shadow-md ${
                  scrolled
                    ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                    : 'text-white bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white' : 'text-white hover:bg-white/10'
            }`} 
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className={`p-2 -mr-2 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
            }`} 
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav (Glassmorphism Modal) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100 border-b border-white/50 dark:border-white/10 shadow-xl' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-[18px] px-6 py-6 flex flex-col space-y-2">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            
            return (
              <a 
                key={item} 
                href={`#${sectionId}`} 
                onClick={(e) => handleNavClick(e, sectionId)} 
                className={`px-4 py-3 rounded-xl font-sans font-semibold text-base transition-colors ${
                  isActive ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/15' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/10'
                }`}
              >
                {item}
              </a>
            );
          })}
          
          <Link 
            to={currentUser ? "/profile" : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-3 rounded-xl font-sans font-semibold text-base transition-colors bg-indigo-600 text-white hover:bg-indigo-700 text-center shadow-md mt-2"
          >
            {currentUser ? 'Portal' : 'Login'}
          </Link>

          <div className="flex space-x-4 px-4 pt-4 mt-2 border-t border-gray-100 dark:border-white/10 w-full">
            <a href="https://www.instagram.com/ecell_recabn/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 bg-gray-50 dark:bg-white/5 rounded-full text-gray-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:text-white dark:hover:bg-white/10 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 bg-gray-50 dark:bg-white/5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-white dark:hover:bg-white/10 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
