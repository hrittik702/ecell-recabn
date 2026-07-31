import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MouseFollower = () => {
  const followerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (like a mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);
    
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          gsap.to(followerRef.current, {
            x: targetX,
            y: targetY,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          rafId = null;
        });
      }
    };
    
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div 
      ref={followerRef}
      className="mousefollower pointer-events-none fixed top-0 left-0"
      style={{ transform: 'translate(-50%, -50%)', zIndex: 9999 }}
      aria-hidden="true"
    />
  );
};

export default MouseFollower;
