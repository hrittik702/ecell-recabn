import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: prefersReduced ? 'auto' : 'instant' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
