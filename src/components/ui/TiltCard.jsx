import { useRef } from 'react';

export default function TiltCard({ children, className = '', style: s = {} }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const active = useRef(false);

  const onMove = (e) => {
    const cx = e.clientX, cy = e.clientY;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const { top, left, height, width } = ref.current.getBoundingClientRect();
      const mx = (cx - left) / width - 0.5;
      const my = (cy - top) / height - 0.5;
      ref.current.style.setProperty('--shine-x', `${(mx + 0.5) * 100}%`);
      ref.current.style.setProperty('--shine-y', `${(my + 0.5) * 100}%`);
      if (!active.current) {
        ref.current.style.transition = 'transform 0.07s ease, border-color 0.25s ease, box-shadow 0.25s ease';
        active.current = true;
      }
      ref.current.style.transform =
        `perspective(600px) translateX(${mx * 12}px) translateY(${my * 12}px) translateZ(10px) rotateX(${my * 22}deg) rotateY(${-mx * 22}deg)`;
    });
  };

  const onLeave = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    active.current = false;
    if (ref.current) {
      ref.current.style.transition = 'transform 0.55s ease, border-color 0.35s ease, box-shadow 0.4s ease';
      ref.current.style.transform = 'perspective(600px) translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        ...s,
        transform: 'perspective(600px) translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0)',
        transition: 'transform 0.55s ease, border-color 0.35s ease, box-shadow 0.4s ease',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
