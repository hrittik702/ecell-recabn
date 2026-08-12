import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Events from '../components/Events';
import Timeline from '../components/Timeline';
import Team from '../components/Team';

const Home = () => {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Events />
      <Timeline />
      <Team />
    </main>
  );
};

export default Home;
