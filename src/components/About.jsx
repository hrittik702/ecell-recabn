import React, { useRef, useState } from 'react';
import { Award, Trophy, Lightbulb, Users, Coins, Rocket, Building2, Globe2, Target, Play, Pause } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mentors } from '../data/constants';

const PipelineStep = ({ icon: Icon, title, desc, isLast }) => (
  <div className="flex flex-col items-center relative z-10 group">
    <div className="w-16 h-16 rounded-2xl bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/50 dark:border-white/10 shadow-sm flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50">
      <Icon size={28} className="text-indigo-600 dark:text-indigo-400" />
    </div>
    <h4 className="font-sans font-bold text-gray-900 dark:text-white mb-1">{title}</h4>
    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center max-w-[100px]">{desc}</p>
    {!isLast && (
      <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent -z-10" />
    )}
  </div>
);

const About = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current && videoRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current && videoRef.current.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      videoRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
      setIsPlaying(!isPlaying);
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
    <section ref={containerRef} id="about" className="py-24 relative z-10 bg-off-white dark:bg-transparent overflow-hidden">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 dark:bg-indigo-500/5 rounded-full blur-3xl opacity-60 dark:opacity-40 -z-10 translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="about-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Fostering the next generation of builders.</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 md:mt-0 text-base md:text-lg max-w-sm font-sans font-medium text-balance">
            We bridge the gap between student innovation and market execution, backed by real-world mentorship.
          </p>
        </div>
        
        {/* Bento Box Layout */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Main Mission Card - Large */}
          <div className="about-card md:col-span-8 bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-premium dark:shadow-premium-dark transition-all duration-300 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 dark:from-indigo-500/10 to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110" />
            <div className="relative z-10">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-6 inline-block">OUR MISSION</span>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight text-balance">
                Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400">ideation</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 dark:from-purple-400 to-pink-600 dark:to-pink-400">execution</span>.
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg max-w-xl font-sans font-medium text-balance">
                To foster the entrepreneurial spirit among students and provide a robust platform for innovative ideas to flourish into successful, market-ready ventures.
              </p>
            </div>
          </div>

          {/* Vision Card - Tall */}
          <div className="about-card md:col-span-4 rounded-3xl p-8 md:p-10 bg-charcoal dark:bg-dark-card dark:border dark:border-white/10 text-white flex flex-col justify-between shadow-premium dark:shadow-premium-dark transition-all duration-300 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover hover:-translate-y-1 relative overflow-hidden group">
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
          <div className="about-card md:col-span-12 bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-premium dark:shadow-premium-dark transition-all duration-300 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div 
                role="button"
                tabIndex={0}
                aria-label="Play E-Cell Freshie Intro Task video"
                className="w-full md:w-1/2 flex-1 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5 aspect-video relative group/video cursor-pointer bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                onClick={() => {
                  if (!isPlaying) setIsPlaying(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isPlaying) setIsPlaying(true);
                  }
                }}
              >
                {isPlaying ? (
                  <iframe 
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full relative z-10"
                    src="https://www.youtube.com/embed/VtlmAhrgK24?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1" 
                    title="E-Cell Freshie Intro Task" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src="https://img.youtube.com/vi/VtlmAhrgK24/hqdefault.jpg"
                      alt="E-Cell REC ABN Video Preview"
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/video:opacity-90 group-hover/video:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 flex flex-col items-center justify-center p-4 text-center z-10">
                      <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-glow group-hover/video:scale-110 group-hover/video:bg-indigo-500 transition-all duration-300 mb-3 border border-white/20">
                        <Play size={28} className="ml-1" fill="currentColor" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                        Click to Play Video
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full md:w-1/2 md:pr-4">
                <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
                  Campus Outreach
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to the Entrepreneurial Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base font-sans font-medium text-balance mb-6">
                  Take a look at how we introduce the vibrant culture of entrepreneurship to our first-year students. This is where the journey of ideation, creation, and building the future begins at REC Ambedkar Nagar.
                </p>
                <a href="https://youtu.be/VtlmAhrgK24?si=aGghO_3CvHffHwoQ" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  <span>Watch on YouTube</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* The Pipeline (Idea -> Startup) */}
        <div className="pipeline-container bg-white/60 dark:bg-dark-surface/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-3xl p-10 md:p-16 shadow-sm mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">The Innovation Pipeline</h3>
          <p className="text-gray-500 dark:text-gray-400 font-sans mb-12">How we transform student ideas into market-ready startups.</p>
          
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
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              National Framework
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">National Entrepreneurship Challenge</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="about-card bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Building2 size={24} className="text-indigo-600 dark:text-indigo-400 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-1">Organizer</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white font-sans">E-Cell IIT Bombay</h4>
            </div>
            
            <div className="about-card bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Target size={24} className="text-emerald-600 dark:text-emerald-400 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-1">Track</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white font-sans">Advance Track</h4>
            </div>

            <div className="about-card bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <Globe2 size={24} className="text-blue-600 dark:text-blue-400 mb-4" />
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-1">Network</span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white font-sans">600+ Colleges</h4>
            </div>
          </div>
        </div>

        {/* Institutional Leadership */}
        <div>
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              Institutional Patrons
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">Leadership & Guidance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <div key={index} className="about-card bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase border-b border-white/50 dark:border-gray-700 pb-1 mb-4 inline-block">
                  {mentor.tag}
                </span>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 font-sans">{mentor.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium font-sans">{mentor.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
