import { useEffect } from 'react';

const COLORS = [
  '#8b5cf6', '#a78bfa', '#c4b5fd',   // purples
  '#06b6d4', '#22d3ee', '#67e8f9',   // cyans
  '#ec4899', '#f472b6', '#fb7185',   // pinks / reds
  '#10b981', '#34d399', '#6ee7b7',   // greens
  '#f59e0b', '#fbbf24', '#fde68a',   // ambers
  '#ef4444', '#f97316', '#e879f9',   // red, orange, fuchsia
];

const COUNT = 16;

function spawnParticle(x, y, angle, speed, color, size, shape) {
  const el = document.createElement('div');
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;
  const rotate = Math.random() * 360;

  el.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    background:${color};
    box-shadow:0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}88;
    pointer-events:none; z-index:9999;
    border-radius:${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '1px'};
    transform:translate(-50%,-50%) rotate(${rotate}deg);
  `;
  document.body.appendChild(el);

  el.animate(
    [
      {
        transform: `translate(-50%,-50%) rotate(${rotate}deg) scale(1.2)`,
        opacity: 1,
      },
      {
        transform: `translate(calc(-50% + ${dx * 0.4}px), calc(-50% + ${dy * 0.4}px)) rotate(${rotate + 180}deg) scale(1)`,
        opacity: 1,
        offset: 0.2,
      },
      {
        transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rotate + 360}deg) scale(0)`,
        opacity: 0,
      },
    ],
    {
      duration: 600 + Math.random() * 400,
      easing: 'cubic-bezier(0.15, 0.85, 0.45, 1)',
      fill: 'forwards',
    }
  ).onfinish = () => el.remove();
}

function spawnRing(x, y, color) {
  const ring = document.createElement('div');
  const size = 12 + Math.random() * 10;
  ring.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    width:${size}px; height:${size}px; border-radius:50%;
    border:2px solid ${color};
    box-shadow:0 0 8px ${color};
    pointer-events:none; z-index:9998;
    transform:translate(-50%,-50%) scale(0);
  `;
  document.body.appendChild(ring);
  ring.animate(
    [
      { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
      { transform: 'translate(-50%,-50%) scale(4)', opacity: 0 },
    ],
    { duration: 500, easing: 'ease-out', fill: 'forwards' }
  ).onfinish = () => ring.remove();
}

export default function ClickBurst() {
  useEffect(() => {
    const onClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      /* ring pulse */
      spawnRing(x, y, COLORS[Math.floor(Math.random() * COLORS.length)]);
      spawnRing(x, y, COLORS[Math.floor(Math.random() * COLORS.length)]);

      /* particles */
      for (let i = 0; i < COUNT; i++) {
        const angle  = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed  = 60 + Math.random() * 80;
        const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
        const size   = 4 + Math.random() * 7;
        const shapes = ['circle', 'square', 'circle', 'circle'];
        const shape  = shapes[Math.floor(Math.random() * shapes.length)];
        spawnParticle(x, y, angle, speed, color, size, shape);
      }

      /* center flash */
      const flash = document.createElement('div');
      flash.style.cssText = `
        position:fixed; left:${x}px; top:${y}px;
        width:18px; height:18px; border-radius:50%;
        background:white;
        box-shadow:0 0 20px white, 0 0 40px ${COLORS[0]};
        pointer-events:none; z-index:10000;
        transform:translate(-50%,-50%) scale(0);
      `;
      document.body.appendChild(flash);
      flash.animate(
        [
          { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
          { transform: 'translate(-50%,-50%) scale(1.5)', opacity: 1, offset: 0.15 },
          { transform: 'translate(-50%,-50%) scale(0)', opacity: 0 },
        ],
        { duration: 350, easing: 'ease-out', fill: 'forwards' }
      ).onfinish = () => flash.remove();
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return null;
}
