import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(navRef.current, {
      y: -50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  });

  return (
    <nav ref={navRef} className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 py-4 shadow-2xs' : 'bg-transparent py-6 border-b border-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center max-w-6xl">
        {/* Navigation Header / Logo */}
        <a href="#" className="text-xl md:text-2xl font-display font-bold tracking-tight text-gray-900">
          E-CELL REC ABN
        </a>
        
        {/* Desktop Nav - Perfect Horizontal Alignment */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Events', 'Team', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-700 hover:text-[#D97706] transition-colors font-sans text-base font-semibold">
              {item}
            </a>
          ))}
          
          {/* Vertical Divider & Social Icons Aligned Perfectly */}
          <div className="flex items-center space-x-4 border-l border-gray-300 pl-6 h-5">
            <a href="https://www.instagram.com/ecell_recabn/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-[#D97706] transition-colors flex items-center">
              <Instagram size={19} />
            </a>
            <a href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-[#D97706] transition-colors flex items-center">
              <Linkedin size={19} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-900 focus:outline-none" 
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute top-full left-0 w-full p-6 flex flex-col items-center space-y-4 shadow-lg">
          {['Home', 'About', 'Events', 'Team', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-gray-900 hover:text-[#D97706] font-sans font-semibold text-lg">
              {item}
            </a>
          ))}
          <div className="flex space-x-6 pt-4 border-t border-gray-100 w-full justify-center">
            <a href="https://www.instagram.com/ecell_recabn/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-[#D97706]">
              <Instagram size={22} />
            </a>
            <a href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-[#D97706]">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
