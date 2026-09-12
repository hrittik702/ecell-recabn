import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Starfield = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isDark) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const STAR_COUNT = isMobile ? 60 : 160;

    // Stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      baseOpacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Shooting stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 4 + 3,
        angle: Math.PI / 6 + Math.random() * 0.3,
        opacity: 1,
        decay: Math.random() * 0.015 + 0.01,
      });
    };

    // Nebula glow spots (neutral deep space tones)
    const nebulae = [
      { x: 0.15, y: 0.25, radius: 250, color: 'rgba(30, 41, 59, 0.04)' },
      { x: 0.8, y: 0.6, radius: 300, color: 'rgba(15, 23, 42, 0.03)' },
      { x: 0.5, y: 0.85, radius: 200, color: 'rgba(30, 41, 59, 0.025)' },
    ];

    let nebulaCanvas = document.createElement('canvas');
    let nebulaCtx = nebulaCanvas.getContext('2d');
    
    const preRenderNebulae = (w, h) => {
      nebulaCanvas.width = w;
      nebulaCanvas.height = h;
      nebulaCtx.clearRect(0, 0, w, h);
      nebulae.forEach(n => {
        const nx = w * n.x;
        const ny = h * n.y;
        const gradient = nebulaCtx.createRadialGradient(nx, ny, 0, nx, ny, n.radius);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'transparent');
        nebulaCtx.fillStyle = gradient;
        nebulaCtx.fillRect(nx - n.radius, ny - n.radius, n.radius * 2, n.radius * 2);
      });
    };

    preRenderNebulae(width, height);

    let time = 0;
    let lastShootingStarTime = 0;
    let isVisible = document.visibilityState === 'visible';
    let isRunning = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      if (!isVisible && !prefersReducedMotion) {
        isRunning = false;
        return;
      }
      
      ctx.clearRect(0, 0, width, height);
      if (!prefersReducedMotion) {
        time += 1;
      }

      // Draw pre-rendered nebulae
      ctx.drawImage(nebulaCanvas, 0, 0);

      // Draw stars with twinkling
      stars.forEach(star => {
        const twinkle = prefersReducedMotion ? 0 : Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity + twinkle * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(1, opacity))})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        // Spawn shooting stars occasionally
        if (time - lastShootingStarTime > 300 + Math.random() * 400) {
          spawnShootingStar();
          lastShootingStarTime = time;
        }

        // Draw shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.7})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Small bright head
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
          ctx.fill();

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.opacity -= s.decay;

          if (s.opacity <= 0 || s.x > width + 50 || s.y > height + 50) {
            shootingStars.splice(i, 1);
          }
        }
      }

      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(render);
        isRunning = true;
      }
    };

    render();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        preRenderNebulae(width, height);

        stars.forEach(star => {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        });

        if (prefersReducedMotion || !isRunning) {
          render();
        }
      }, 200);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible && !isRunning && !prefersReducedMotion) {
        render();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none will-change-transform"
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default Starfield;
