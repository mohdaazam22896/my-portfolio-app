import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current)
        ref.current.style.transform = `translate(${e.clientX - 350}px,${e.clientY - 350}px)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="mouse-glow" aria-hidden="true" style={{ transform: 'translate(-800px,-800px)' }} />;
}
