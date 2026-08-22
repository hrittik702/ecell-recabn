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
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let activeElement = null;

    // Track mouse
    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // When an input or interactive element is focused/hovered
    const handleActiveState = (el) => {
      activeElement = el;
      
      // Morph the cursor into a glowing outline matching the element's size
      gsap.to(followerRef.current, {
        width: activeElement.offsetWidth + 8, // Snug fit around the input
        height: activeElement.offsetHeight + 8,
        borderRadius: '16px', 
        backgroundColor: 'rgba(99, 102, 241, 0.03)', // Barely visible tint
        border: '2px solid rgba(99, 102, 241, 0.8)', // Matches indigo-500 focus ring
        boxShadow: '0 0 15px 2px rgba(99, 102, 241, 0.25)', // Smooth indigo glow
        duration: 0.5,
        ease: 'expo.out', // Buttery smooth deceleration
        overwrite: 'auto'
      });
    };

    // When focus/hover is lost
    const handleInactiveState = () => {
      activeElement = null; // Release it IMMEDIATELY so it starts moving to the mouse
      
      // Shrink back to the dot
      gsap.to(followerRef.current, {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '', 
        border: '0px solid transparent',
        boxShadow: '0 0 0px 0px rgba(99, 102, 241, 0)',
        duration: 0.25, // Adjusted to balance with new expo.out easing
        ease: 'power3.out', // Slightly different ease for collapsing to feel snappy
        overwrite: 'auto'
      });
    };

    // Global focus listeners (Keyboard navigation & Clicks)
    const onFocusIn = (e) => {
      const tag = e.target.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        handleActiveState(e.target);
      }
    };

    const onFocusOut = () => {
      // Small delay just in case we are jumping straight to another input
      setTimeout(() => {
        if (activeElement && document.activeElement !== activeElement) {
           handleInactiveState();
        }
      }, 10);
    };
    
    // Smooth animation loop for positioning
    const loop = () => {
      if (activeElement) {
        // If an element is active, stick to it (this handles page scrolling perfectly!)
        const rect = activeElement.getBoundingClientRect();
        gsap.to(followerRef.current, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          duration: 0.3, // Snappy but smooth follow when scrolling
          ease: 'expo.out',
          overwrite: 'auto'
        });
      } else {
        // Normal smooth mouse follow - upgraded to buttery smooth Expo easing
        gsap.to(followerRef.current, {
          x: targetX,
          y: targetY,
          duration: 0.6,
          ease: "expo.out",
          overwrite: "auto"
        });
      }
      rafId = requestAnimationFrame(loop);
    };

    // Attach listeners
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    
    // Start animation loop
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div 
      ref={followerRef}
      className="mousefollower fixed top-0 left-0"
      style={{ transform: 'translate(-50%, -50%)', zIndex: 9999 }}
      aria-hidden="true"
    />
  );
};

export default MouseFollower;
