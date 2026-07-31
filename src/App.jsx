import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
