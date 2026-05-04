import { useEffect, useRef } from 'react';

const COLORS = ['#8b5cf6', '#7c3aed', '#06b6d4', '#ec4899', '#a78bfa'];
const MAX_POINTS = 20;

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const trail = [];
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY });
      if (trail.length > MAX_POINTS) trail.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const len = trail.length;
      trail.forEach((pt, i) => {
        const t = i / (len - 1 || 1);
        const alpha = t * 0.5;
        const radius = t * 5.5 + 0.5;
        const color = COLORS[Math.floor(t * (COLORS.length - 1))];
        const hex = Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color + hex;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 51 }}
    />
  );
}
