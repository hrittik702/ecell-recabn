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

    // Stars
    const STAR_COUNT = 160;
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

    // Nebula glow spots
    const nebulae = [
      { x: width * 0.15, y: height * 0.25, radius: 250, color: 'rgba(88, 28, 135, 0.04)' },
      { x: width * 0.8, y: height * 0.6, radius: 300, color: 'rgba(67, 56, 202, 0.03)' },
      { x: width * 0.5, y: height * 0.85, radius: 200, color: 'rgba(124, 58, 237, 0.025)' },
    ];

    let time = 0;
    let lastShootingStarTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Draw nebulae
      nebulae.forEach(n => {
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
      });

      // Draw stars with twinkling
      ctx.shadowBlur = 1;
      ctx.shadowColor = 'white';
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity + twinkle * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(1, opacity))})`;
        ctx.fill();
      });
      ctx.shadowBlur = 0; // Reset shadow for shooting stars

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

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Redistribute stars
      stars.forEach(star => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
      // Reposition nebulae
      nebulae[0].x = width * 0.15;
      nebulae[0].y = height * 0.25;
      nebulae[1].x = width * 0.8;
      nebulae[1].y = height * 0.6;
      nebulae[2].x = width * 0.5;
      nebulae[2].y = height * 0.85;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  );
};

export default Starfield;
