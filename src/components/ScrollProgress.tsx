import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const scrollableDistance = documentHeight - windowHeight;
      
      if (scrollableDistance > 0) {
        // Cap the percentage between 0 and 100
        const percentage = Math.min(100, Math.max(0, (scrollY / scrollableDistance) * 100));
        setScrollPercentage(percentage);
      } else {
        setScrollPercentage(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-black/50 backdrop-blur-sm">
      <div 
        className="h-full bg-[#E60000] shadow-[0_0_10px_rgba(230,0,0,0.7)] rounded-r-full"
        style={{ width: `${scrollPercentage}%` }}
      ></div>
    </div>
  );
}
