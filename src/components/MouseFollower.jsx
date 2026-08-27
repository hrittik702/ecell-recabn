import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const MouseFollower = () => {
  const followerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);
    
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop || !followerRef.current) return;

    // High performance direct tweens with zero per-frame GC allocations
    const xTo = gsap.quickTo(followerRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(followerRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div 
      ref={followerRef}
      className="mousefollower fixed top-0 left-0 pointer-events-none rounded-full"
      style={{ 
        transform: 'translate(-50%, -50%)', 
        zIndex: 9999,
        width: '12px',
        height: '12px',
        backgroundColor: 'rgba(99, 102, 241, 0.75)',
        boxShadow: '0 0 12px 2px rgba(99, 102, 241, 0.4)'
      }}
      aria-hidden="true"
    />
  );
};

export default MouseFollower;
