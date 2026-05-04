import { useEffect } from 'react';

const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#a78bfa'];
const COUNT = 10;

export default function ClickBurst() {
  useEffect(() => {
    const onClick = (e) => {
      for (let i = 0; i < COUNT; i++) {
        const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.3;
        const speed = 55 + Math.random() * 55;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size = 4 + Math.random() * 5;

        const dot = document.createElement('div');
        dot.style.cssText = `
          position:fixed; left:${e.clientX}px; top:${e.clientY}px;
          width:${size}px; height:${size}px; border-radius:50%;
          background:${color}; box-shadow:0 0 8px ${color};
          pointer-events:none; z-index:9999;
          transform:translate(-50%,-50%);
        `;
        document.body.appendChild(dot);

        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        dot.animate(
          [
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 },
          ],
          { duration: 550 + Math.random() * 200, easing: 'cubic-bezier(0,0.9,0.57,1)', fill: 'forwards' }
        ).onfinish = () => dot.remove();
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return null;
}
