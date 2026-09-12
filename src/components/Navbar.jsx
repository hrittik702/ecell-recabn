import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Linkedin, Home, Info, Calendar, Clock, Users, ChevronRight } from 'lucide-react';
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
          ? 'bg-[#080C17]/90 backdrop-blur-2xl border-b border-white/10 py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
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
          <span className="text-lg md:text-xl font-display font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-300">
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
                  isActive 
                    ? 'text-white bg-white/15 shadow-[0_0_20px_rgba(99,102,241,0.25)] border border-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </a>
            );
          })}

          {/* Vertical Divider & Social Icons */}
          <div className="flex items-center space-x-3 border-l border-white/10 pl-4 lg:pl-6 ml-2 lg:ml-4 h-6">
            <a 
              href="https://www.instagram.com/ecell_recabn/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram" 
              className="p-1.5 rounded-full transition-all duration-300 hover:scale-110 text-gray-400 hover:text-pink-400 hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn" 
              className="p-1.5 rounded-full transition-all duration-300 hover:scale-110 text-gray-400 hover:text-blue-400 hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Profile / Login */}
          <div className="pl-4 ml-2 flex items-center">
            {currentUser ? (
              <Link 
                to="/profile" 
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/50 hover:border-indigo-400 transition-colors block shadow-sm group bg-dark-surface"
              >
                {userData?.profileImage ? (
                  <img src={userData.profileImage} alt={userData?.name || "Profile"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-indigo-900/50 text-indigo-300 font-bold flex items-center justify-center font-sans text-sm">
                     {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </Link>
            ) : (
              <Link 
                to="/login"
                className={`relative px-5 py-2 font-sans text-sm font-bold rounded-full transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 border shadow-sm hover:shadow-md ${
                  scrolled
                    ? 'text-white bg-indigo-600 hover:bg-indigo-500 border-indigo-500/50 shadow-indigo-600/30'
                    : 'text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border-white/20'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden">
          <button 
            className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" 
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
        className={`md:hidden absolute top-full left-0 w-full min-h-[calc(100dvh-4rem)] bg-[#080C17] border-t border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between px-6 pt-5 pb-8 overflow-y-auto transition-all duration-300 ease-in-out origin-top ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
      >
        {/* Nav Items */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 font-semibold">
              Navigation
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
          </div>

          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            const Icon = NAV_ICONS[sectionId] || ChevronRight;
            
            return (
              <a 
                key={item} 
                href={`#${sectionId}`} 
                onClick={(e) => handleNavClick(e, sectionId)} 
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-sans text-base transition-all duration-200 group ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-indigo-600/30 via-indigo-600/20 to-purple-600/10 border border-indigo-500/40 font-bold shadow-lg shadow-indigo-950/50' 
                    : 'text-gray-300 font-medium hover:text-white hover:bg-white/5 active:bg-white/10 border border-transparent'
                }`}
              >
                <span className="flex items-center space-x-3.5">
                  <span className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/50' 
                      : 'bg-white/5 text-gray-400 group-hover:text-indigo-400 group-hover:bg-white/10'
                  }`}>
                    <Icon size={18} />
                  </span>
                  <span className="tracking-tight">{item}</span>
                </span>
                <ChevronRight size={17} className={`transition-transform duration-200 ${
                  isActive ? 'text-indigo-400 translate-x-0.5' : 'text-gray-500 group-hover:text-white group-hover:translate-x-0.5'
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
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0D1322] border border-white/10 hover:border-indigo-500/50 transition-all group shadow-sm"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-indigo-900/50 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 text-base shadow-sm">
                    {userData?.profileImage ? (
                      <img src={userData.profileImage} alt={userData?.name || "Profile"} className="w-full h-full object-cover" />
                    ) : (
                      userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {userData?.name || 'Member Profile'}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      {userData?.role || (userData?.systemRole === 'admin' ? 'Admin' : 'Member')} • Open Portal
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 group-hover:text-indigo-400 transition-all" />
              </Link>
            ) : (
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3.5 px-4 rounded-2xl font-sans font-bold text-base transition-all duration-200 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] text-white shadow-xl shadow-indigo-600/30"
              >
                Login to Member Portal
              </Link>
            )}
          </div>

          {/* Bottom Controls: REC ABN Badge & Social Links */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>REC AMBEDKAR NAGAR</span>
            </div>

            <div className="flex items-center space-x-2">
              <a 
                href="https://www.instagram.com/ecell_recabn/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram" 
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-pink-400 transition-colors shadow-sm"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn" 
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-blue-400 transition-colors shadow-sm"
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
