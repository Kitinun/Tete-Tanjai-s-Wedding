import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Sparkle = {
  id: number;
  x: number;
  y: number;
};

export default function InteractiveSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback((x: number, y: number) => {
    const id = Date.now() + Math.random();
    setSparkles((current) => [...current, { id, x, y }]);

    // Remove the sparkle after 1 second
    setTimeout(() => {
      setSparkles((current) => current.filter((s) => s.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 50; // Add sparkle at most every 50ms to prevent performance issues

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      let x, y;
      if ('touches' in e) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }

      // Add randomness to position
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      addSparkle(x + offsetX, y + offsetY);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [addSparkle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[101]">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y }}
            animate={{ 
              opacity: 0, 
              scale: Math.random() * 0.8 + 0.5, 
              y: sparkle.y - 100,
              x: sparkle.x + (Math.random() - 0.5) * 50
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 0C12 0 12 9 24 12C24 12 12 12 12 24C12 24 12 15 0 12C0 12 12 12 12 0Z"
                fill="#f9f5e3"
                className="drop-shadow-md"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
