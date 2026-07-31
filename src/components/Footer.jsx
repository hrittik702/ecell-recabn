import React from 'react';
import { Instagram, Linkedin, Twitter, ArrowRight, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 relative z-10 font-sans border-t border-gray-800 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -translate-x-1/2" />
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <a href="#" className="inline-flex items-center space-x-2 font-display font-bold text-2xl tracking-tight text-white mb-6 group">
              <Zap className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={24} fill="currentColor" />
              <span>E-Cell <span className="text-gray-400 font-normal">REC ABN</span></span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm text-balance">
              Empowering student entrepreneurs to build innovative solutions, validate markets, and scale ventures from campus to the world.
            </p>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-6 font-mono">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm font-medium transition-colors inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300">About Us</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white text-sm font-medium transition-colors inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300">Achievements</a></li>
              <li><a href="#timeline" className="text-gray-400 hover:text-white text-sm font-medium transition-colors inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300">NEC Timeline</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white text-sm font-medium transition-colors inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300">Leadership</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-6 font-mono">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Startup Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Pitch Deck Templates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Incubation Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Code of Conduct</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-6 font-mono">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest startup insights and E-Cell events.</p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md flex items-center justify-center transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-medium tracking-wide text-center md:text-left">
            &copy; {new Date().getFullYear()} Entrepreneurship Cell, REC Ambedkar Nagar. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
