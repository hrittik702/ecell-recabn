import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Linkedin, Sun, Moon, Home, Info, Calendar, Clock, Users, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = ['Home', 'About', 'Events', 'Timeline', 'Team'];

const NAV_ICONS = {
  home: Home,
  about: Info,
  events: Calendar,
  timeline: Clock,
  team: Users,
};

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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
        scrolled || mobileMenuOpen
          ? 'bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-gray-200/50 dark:border-white/10 py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
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
            scrolled || mobileMenuOpen ? 'text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400' : 'text-white group-hover:text-gray-200'
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
        <div className="flex items-center space-x-1 sm:space-x-2 md:hidden">
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              scrolled || mobileMenuOpen ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white' : 'text-white hover:bg-white/10'
            }`} 
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className={`p-2 -mr-1 rounded-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              scrolled || mobileMenuOpen ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
            }`} 
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Full-Height Drawer */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full min-h-[calc(100dvh-4rem)] bg-white dark:bg-[#080C17] border-t border-gray-100 dark:border-white/10 shadow-2xl flex flex-col justify-between px-6 pt-5 pb-8 overflow-y-auto transition-all duration-300 ease-in-out origin-top ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
      >
        {/* Nav Items */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3 py-1 font-semibold">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            const Icon = NAV_ICONS[sectionId] || ChevronRight;
            
            return (
              <a 
                key={item} 
                href={`#${sectionId}`} 
                onClick={(e) => handleNavClick(e, sectionId)} 
                className={`flex items-center justify-between px-4 py-3 rounded-2xl font-sans text-base transition-all duration-200 group ${
                  isActive 
                    ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/15 font-bold shadow-sm' 
                    : 'text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-100/80 dark:hover:bg-white/5 active:bg-gray-100 dark:active:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-3.5">
                  <span className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30' 
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-white/10'
                  }`}>
                    <Icon size={18} />
                  </span>
                  <span className="tracking-tight">{item}</span>
                </span>
                <ChevronRight size={17} className={`transition-transform duration-200 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400 translate-x-0.5' : 'text-gray-400 dark:text-gray-500 group-hover:translate-x-0.5'
                }`} />
              </a>
            );
          })}
        </div>

        {/* User Status / Login Portal & Controls */}
        <div className="space-y-4 pt-6 mt-auto">
          {/* User Status / Login Portal Button */}
          <div>
            {currentUser ? (
              <Link 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-500/40 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-300 text-base shadow-sm">
                    {userData?.profileImage ? (
                      <img src={userData.profileImage} alt={userData?.name || "Profile"} className="w-full h-full object-cover" />
                    ) : (
                      userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {userData?.name || 'Member Profile'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {userData?.role || (userData?.systemRole === 'admin' ? 'Admin' : 'Member')} • Open Portal
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3.5 px-4 rounded-2xl font-sans font-bold text-base transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white shadow-lg shadow-indigo-600/25"
              >
                Login to Member Portal
              </Link>
            )}
          </div>

          {/* Bottom Controls: Theme Switcher & Social Links */}
          <div className="pt-4 border-t border-gray-200/80 dark:border-white/10 flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <div className="flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/ecell_recabn/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram" 
                className="p-2.5 bg-gray-100 dark:bg-white/5 rounded-xl text-gray-600 hover:text-pink-600 hover:bg-pink-50 dark:text-gray-400 dark:hover:text-pink-400 dark:hover:bg-pink-950/30 transition-colors shadow-sm"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn" 
                className="p-2.5 bg-gray-100 dark:bg-white/5 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/30 transition-colors shadow-sm"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
