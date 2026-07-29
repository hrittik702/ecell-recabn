import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Mouse Follower
const MouseFollower = () => {
  const followerRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div 
      ref={followerRef}
      className="mousefollower pointer-events-none fixed top-0 left-0"
      style={{ transform: 'translate(-50%, -50%)', zIndex: 9999 }}
    />
  );
};

function App() {
  return (
    <div className="min-h-screen text-gray-900 selection:bg-indigo-100 bg-[#F9FAFB]">
      <MouseFollower />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Timeline />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
