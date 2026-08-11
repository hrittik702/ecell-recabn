import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = ['Home', 'About', 'Events', 'Timeline', 'Team'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

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
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section.offsetTop - 80, autoKill: false },
        ease: 'power3.inOut'
      });
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };


  useGSAP(() => {
    gsap.fromTo(navRef.current, {
      y: -20,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  return (
    <nav 
      ref={navRef} 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-out ${
        scrolled 
          ? 'bg-white/85 backdrop-blur-[18px] border-b border-gray-200/50 py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
          : 'bg-transparent py-5 md:py-6 border-b-0 shadow-none'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-10 flex justify-between items-center max-w-7xl">
        
        {/* Navigation Logo */}
        <a href="#home" className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
          <img 
            src="/assets/ecell-logo.png" 
            alt="E-Cell REC ABN" 
            className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => { e.target.src = '/assets/ecel%20rec%20abn%20logo.png'; }}
          />
          <span className={`text-lg md:text-xl font-display font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-gray-900 group-hover:text-indigo-600' : 'text-white group-hover:text-gray-200'
          }`}>
            E-CELL REC ABN
          </span>
        </a>
        
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
                    ? isActive ? 'text-indigo-600 bg-indigo-50/80 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50' 
                    : isActive ? 'text-white bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-gray-200 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                }`}
              >
                {item}
              </a>
            );
          })}
          
          {/* Vertical Divider & Social Icons */}
          <div className={`flex items-center space-x-3 border-l pl-4 lg:pl-6 ml-2 lg:ml-4 h-6 transition-colors duration-300 ${
            scrolled ? 'border-gray-200' : 'border-white/20'
          }`}>
            <a 
              href="https://www.instagram.com/ecell_recabn/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram" 
              className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                scrolled ? 'text-gray-400 hover:text-pink-600 hover:bg-pink-50' : 'text-gray-300 hover:text-white hover:bg-white/10'
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
                scrolled ? 'text-gray-400 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 -mr-2 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`} 
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav (Glassmorphism Modal) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-[400px] opacity-100 border-b border-gray-200/50 shadow-xl' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-[18px] px-6 py-6 flex flex-col space-y-2">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;
            
            return (
              <a 
                key={item} 
                href={`#${sectionId}`} 
                onClick={(e) => handleNavClick(e, sectionId)} 
                className={`px-4 py-3 rounded-xl font-sans font-semibold text-base transition-colors ${
                  isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item}
              </a>
            );
          })}
          
          <div className="flex space-x-4 px-4 pt-4 mt-2 border-t border-gray-100 w-full">
            <a href="https://www.instagram.com/ecell_recabn/" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-pink-600 hover:bg-pink-50 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
