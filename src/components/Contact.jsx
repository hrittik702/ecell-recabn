import React, { useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
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
        setSubmitError(result.message || "Failed to send message. Please verify your Web3Forms access key.");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} id="contact" className="py-32 relative z-10 bg-white overflow-hidden">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-3xl opacity-50 -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="contact-header text-center mb-20 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-4 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">Get in Touch</h2>
          <p className="text-gray-600 text-lg font-sans text-balance">
            Reach out to collaborate, partner, or inquire about E-Cell initiatives. Let's build something extraordinary together.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info (2 Cols) */}
          <div className="contact-card lg:col-span-2 bg-charcoal rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-premium text-white relative overflow-hidden group">
            {/* Background Pattern - subtle top right corner */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 mb-12">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 text-white">Let's Connect</h3>
              <p className="text-gray-400 text-sm md:text-base font-sans leading-relaxed text-balance">
                Have an innovative startup idea or looking for institutional partnerships? Send us a message and our team will get back to you.
              </p>
            </div>
            
            <div className="space-y-8 font-sans relative z-10 flex-1 border-t border-white/10 pt-8">
              
              <a href="mailto:ecell@recabn.ac.in" className="flex items-start space-x-5 group/link">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover/link:bg-indigo-500 group-hover/link:border-indigo-400 group-hover/link:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email Us</p>
                  <p className="text-gray-200 text-base font-medium group-hover/link:text-white transition-colors">ecell@recabn.ac.in</p>
                </div>
              </a>

              <div className="w-full h-px bg-white/5"></div>
              
              <a href="https://maps.google.com/?q=Rajkiya+Engineering+College+Ambedkar+Nagar" target="_blank" rel="noreferrer" className="flex items-start space-x-5 group/link">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover/link:bg-indigo-500 group-hover/link:border-indigo-400 group-hover/link:text-white transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Location</p>
                  <p className="text-gray-200 text-base font-medium group-hover/link:text-white transition-colors leading-relaxed">
                    Rajkiya Engineering College,<br/>Ambedkar Nagar, UP
                  </p>
                </div>
              </a>

              <div className="w-full h-px bg-white/5"></div>

              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="pt-0.5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Response Time</p>
                  <p className="text-gray-200 text-base font-medium">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Decorative bottom glow */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-[80px] -z-0 translate-x-1/4 translate-y-1/4 group-hover:bg-indigo-500/30 transition-colors duration-700" />
          </div>

          {/* Contact Form (3 Cols) */}
          <div className="contact-card lg:col-span-3 bg-white border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-premium hover:shadow-premium-hover transition-shadow duration-500">
            {submitted ? (
              <div ref={successRef} className="h-full flex flex-col justify-center items-center text-center py-16 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 size={48} className="text-emerald-500" />
                </div>
                <h4 className="text-3xl font-display font-bold text-gray-900">Message Received!</h4>
                <p className="text-gray-500 font-sans text-base max-w-sm text-balance">
                  Thank you for reaching out. A representative from E-Cell REC ABN will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      placeholder="Your full name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-off-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      placeholder="name@company.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-off-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 flex-1 flex flex-col">
                  <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="contact-message"
                    placeholder="How can we help you?" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full flex-1 min-h-[160px] bg-off-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                    required
                  ></textarea>
                </div>
                
                {submitError && (
                  <p className="text-red-500 text-sm font-medium">{submitError}</p>
                )}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gray-900 hover:bg-indigo-600 disabled:opacity-70 disabled:hover:bg-gray-900 text-white rounded-xl font-sans font-bold text-sm tracking-wide flex justify-center items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-xl group"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />}
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
