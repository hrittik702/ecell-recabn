import React, { useRef, useState } from 'react';
import { Mail, MapPin, CheckCircle2, ArrowRight, Instagram, Linkedin, Twitter, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Footer = () => {
  const containerRef = useRef(null);
  const successRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    gsap.fromTo('.contact-header',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo('.contact-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.contact-header', start: 'top 80%' } }
    );
  }, { scope: containerRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "095a87c3-62a5-493b-87b1-b8549b53b1ce",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Animate Success State
        setTimeout(() => {
          if (successRef.current) {
            gsap.fromTo(successRef.current, 
              { scale: 0.8, opacity: 0 }, 
              { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
          }
        }, 50);

        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitError(result.message || "Failed to send message.");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer ref={containerRef} id="contact" className="bg-charcoal dark:bg-dark-bg text-white pt-16 pb-8 relative z-10 font-sans border-t border-gray-800 dark:border-white/10 overflow-hidden min-h-[50vh] flex flex-col justify-center">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -translate-x-1/2" />
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 w-full">
        
        {/* Top Row: Branding + Links + Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10">
          
          {/* Branding */}
          <div className="md:col-span-3">
            <a href="#home" className="flex items-center space-x-2 font-display font-bold text-xl tracking-tight text-white group mb-3">
              <Zap className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={20} fill="currentColor" />
              <span>E-Cell <span className="text-gray-400 font-normal">REC ABN</span></span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Empowering student entrepreneurs at Rajkiya Engineering College, Ambedkar Nagar.
            </p>
            <div className="flex items-center space-x-3">
              <a href="https://www.linkedin.com/in/e-cell-rec-ambedkar-nagar-7a3a00333/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/ecell_recabn/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="mailto:ecell@recabn.ac.in" aria-label="Email" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <Mail size={18} />
              </a>
              <a href="https://maps.google.com/?q=Rajkiya+Engineering+College+Ambedkar+Nagar" target="_blank" rel="noreferrer" aria-label="Location" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300">
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4 font-mono">Programs</h4>
            <ul className="space-y-2.5">
              <li><a href="#timeline" className="text-gray-400 hover:text-white text-sm transition-colors">NEC 2026</a></li>
              <li><a href="/tasks" className="text-gray-400 hover:text-white text-sm transition-colors">Tasks</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white text-sm transition-colors">E-Summit</a></li>
              <li><a href="https://www.ecell.in/nec/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">IIT-B E-Cell ↗</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4 font-mono">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white text-sm transition-colors">Our Team</a></li>
              <li><a href="/incubation" className="text-gray-400 hover:text-white text-sm transition-colors">Incubation</a></li>
              <li><a href="/startup-guide" className="text-gray-400 hover:text-white text-sm transition-colors">Startup Guide</a></li>
            </ul>
          </div>

          {/* Compact Contact Form */}
          <div className="md:col-span-5">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4 font-mono">Send us a message</h4>
            {submitted ? (
              <div ref={successRef} className="flex items-center space-x-3 py-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <p className="text-emerald-300 text-sm font-medium">Message sent! We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="font-sans space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    id="contact-name"
                    type="text" 
                    placeholder="Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    required 
                  />
                  <input 
                    id="contact-email"
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex gap-3">
                  <textarea 
                    id="contact-message"
                    placeholder="Your message..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none h-[80px]"
                    required
                  ></textarea>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 text-white rounded-lg font-sans font-bold text-xs tracking-wide flex items-center justify-center transition-all duration-300 shrink-0 group"
                  >
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
                {submitError && (
                  <p className="text-red-400 text-xs font-medium">{submitError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-white/10">
          <p className="text-gray-500 text-xs font-medium tracking-wide text-center">
            &copy; {new Date().getFullYear()} Entrepreneurship Cell, REC Ambedkar Nagar. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
