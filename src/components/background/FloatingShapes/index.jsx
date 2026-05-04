import { useEffect, useRef } from 'react';
import SolarSystem from './SolarSystem';
import FloatingPlanet from './FloatingPlanet';

const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

export default function FloatingShapes() {
  const wrapRef = useRef(null);
  let cx = 0, cy = 0, tx = 0, ty = 0, raf;

  useEffect(() => {
    const onMove = (e) => {
      tx = (e.clientX - window.innerWidth  / 2) / window.innerWidth  * 18;
      ty = (e.clientY - window.innerHeight / 2) / window.innerHeight * 12;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (wrapRef.current)
        wrapRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className="floating-shapes" aria-hidden="true">
      <SolarSystem />
      <FloatingPlanet />
      <div className="f-cube f-cube-3">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-cube f-cube-4">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-cube f-cube-5">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-ring f-ring-1" />
      <div className="f-ring f-ring-2" />
      <div className="f-ring f-ring-3" />
      <div className="f-ring f-ring-4" />
      <div className="f-ring f-ring-5" />
      <div className="f-gyro">
        <div className="f-gyro-ring f-gyro-r1" />
        <div className="f-gyro-ring f-gyro-r2" />
        <div className="f-gyro-ring f-gyro-r3" />
      </div>
    </div>
  );
}
