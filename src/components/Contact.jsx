import React, { useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
  const containerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    gsap.fromTo('.contact-header',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.contact-card',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-header',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section ref={containerRef} id="contact" className="py-24 relative z-10 bg-[#F9FAFB]">
      <div className="container mx-auto px-6">
        <div className="contact-header text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">Get in Touch</h2>
          <p className="text-gray-500 text-base md:text-lg font-sans">
            Reach out to collaborate, partner, or inquire about E-Cell initiatives.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="contact-card bg-white border border-gray-200/80 rounded-xl p-8 md:p-10 flex flex-col justify-between shadow-2xs">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Let's Connect</h3>
              <p className="text-gray-600 text-base mb-10 font-sans leading-relaxed">
                Have an innovative startup idea or looking for institutional partnerships? Send us a message and our team will get back to you.
              </p>
            </div>
            
            <div className="space-y-6 font-sans">
              <a href="mailto:ecell@recabn.ac.in" className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Email Us</p>
                  <p className="text-gray-900 text-sm md:text-base font-medium group-hover:text-indigo-600 transition-colors">ecell@recabn.ac.in</p>
                </div>
              </a>
              
              <a href="https://maps.google.com/?q=Rajkiya+Engineering+College+Ambedkar+Nagar" target="_blank" rel="noreferrer" className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-gray-900 text-sm md:text-base font-medium group-hover:text-indigo-600 transition-colors">Rajkiya Engineering College, Ambedkar Nagar, UP</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card bg-white border border-gray-200/80 rounded-xl p-8 md:p-10 shadow-2xs">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center py-12 space-y-4">
                <CheckCircle2 size={48} className="text-indigo-600" />
                <h4 className="text-2xl font-display font-bold text-gray-900">Message Received!</h4>
                <p className="text-gray-500 font-sans text-sm max-w-xs">
                  Thank you for reaching out. A representative from E-Cell REC ABN will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    placeholder="How can we help you?" 
                    rows="4" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all resize-none"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-sans font-medium text-sm tracking-wide flex justify-center items-center space-x-2 transition-all duration-200 shadow-sm hover:scale-[1.01]"
                >
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
