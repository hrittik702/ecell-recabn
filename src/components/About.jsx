import React, { useRef, useState } from 'react';
import { Award, Trophy, Lightbulb, Users, Coins, Rocket, Building2, Globe2, Target, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mentors } from '../data/constants';

const PipelineStep = ({ icon: Icon, title, desc, isLast }) => (
  <div className="flex flex-col items-center relative z-10 group">
    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-indigo-200">
      <Icon size={28} className="text-indigo-600" />
    </div>
    <h4 className="font-sans font-bold text-gray-900 mb-1">{title}</h4>
    <p className="text-xs text-gray-500 font-medium text-center max-w-[100px]">{desc}</p>
    {!isLast && (
      <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-gray-200 to-transparent -z-10" />
    )}
  </div>
);

const About = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current && videoRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  useGSAP(() => {
    gsap.fromTo('.about-header', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo('.about-card', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.bento-grid', start: 'top 85%' } }
    );

    gsap.fromTo('.pipeline-step', 
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.pipeline-container', start: 'top 80%' } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-24 relative z-10 bg-off-white overflow-hidden">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="about-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-3 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 tracking-tight">Fostering the next generation of builders.</h2>
          </div>
          <p className="text-gray-600 mt-6 md:mt-0 text-base md:text-lg max-w-sm font-sans font-medium text-balance">
            We bridge the gap between student innovation and market execution, backed by real-world mentorship.
          </p>
        </div>
        
        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Main Mission Card - Large */}
          <div className="about-card md:col-span-8 bg-white border border-gray-200/80 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110" />
            <div className="relative z-10">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-6 inline-block">OUR MISSION</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 leading-tight text-balance">
                Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">ideation</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">execution</span>.
              </h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-xl font-sans font-medium text-balance">
                To foster the entrepreneurial spirit among students and provide a robust platform for innovative ideas to flourish into successful, market-ready ventures.
              </p>
            </div>
          </div>

          {/* Vision Card - Tall */}
          <div className="about-card md:col-span-4 rounded-3xl p-8 md:p-10 bg-charcoal text-white flex flex-col justify-between shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-6 inline-block">VISION 2026</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight text-white text-balance">Creating an ecosystem for the future.</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base font-sans font-medium text-balance">
                We envision REC Ambedkar Nagar as a premier hub of cutting-edge startups and visionary leaders, where every student is empowered to build.
              </p>
            </div>
          </div>

          {/* Welcome Video Card - Full Width */}
          <div className="about-card md:col-span-12 bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-premium transition-all duration-300 hover:shadow-premium-hover">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 flex-1 rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-video relative group/video">
                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                <iframe 
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full relative z-0 pointer-events-none"
                  src="https://www.youtube.com/embed/VtlmAhrgK24?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=VtlmAhrgK24&enablejsapi=1" 
                  title="E-Cell Freshie Intro Task" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
                
                {/* Custom Mute/Unmute Toggle */}
                <button 
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 hover:scale-110 transition-all duration-300 border border-white/20"
                  aria-label="Toggle Mute"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
              <div className="w-full md:w-1/2 md:pr-4">
                <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-3 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  Campus Outreach
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  Welcome to the Entrepreneurial Journey
                </h3>
                <p className="text-gray-600 leading-relaxed text-base font-sans font-medium text-balance mb-6">
                  Take a look at how we introduce the vibrant culture of entrepreneurship to our first-year students. This is where the journey of ideation, creation, and building the future begins at REC Ambedkar Nagar.
                </p>
                <a href="https://youtu.be/VtlmAhrgK24?si=aGghO_3CvHffHwoQ" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                  <span>Watch on YouTube</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* The Pipeline (Idea -> Startup) */}
        <div className="pipeline-container bg-white border border-gray-200/80 rounded-3xl p-10 md:p-16 shadow-sm mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">The Innovation Pipeline</h3>
          <p className="text-gray-500 font-sans mb-12">How we transform student ideas into market-ready startups.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="pipeline-step"><PipelineStep icon={Lightbulb} title="Ideation" desc="Brainstorming & Validation" /></div>
            <div className="pipeline-step"><PipelineStep icon={Users} title="Mentorship" desc="Industry Expert Guidance" /></div>
            <div className="pipeline-step"><PipelineStep icon={Coins} title="Funding" desc="Incubation Grants" /></div>
            <div className="pipeline-step"><PipelineStep icon={Rocket} title="Startup" desc="Market Execution" isLast /></div>
          </div>
        </div>

        {/* National Framework Bento */}
        <div className="mb-16">
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-3 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              National Framework
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900">National Entrepreneurship Challenge</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="about-card bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Building2 size={24} className="text-indigo-600 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-1">Organizer</span>
              <h4 className="text-xl font-bold text-gray-900 font-sans">E-Cell IIT Bombay</h4>
            </div>
            
            <div className="about-card bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Target size={24} className="text-emerald-600 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-1">Track</span>
              <h4 className="text-xl font-bold text-gray-900 font-sans">Advance Track</h4>
            </div>

            <div className="about-card bg-white border border-gray-200/80 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Globe2 size={24} className="text-blue-600 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-1">Network</span>
              <h4 className="text-xl font-bold text-gray-900 font-sans">600+ Colleges</h4>
            </div>
          </div>
        </div>

        {/* Institutional Leadership */}
        <div>
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-3 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Institutional Patrons
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Leadership & Guidance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <div key={index} className="about-card bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-200 pb-1 mb-4 inline-block">
                  {mentor.tag}
                </span>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 font-sans">{mentor.name}</h4>
                <p className="text-gray-500 text-sm font-medium font-sans">{mentor.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
