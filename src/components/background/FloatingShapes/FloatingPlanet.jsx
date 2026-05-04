import { useMemo } from 'react';

export default function FloatingPlanet() {
  const stars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.round((Math.random() - 0.5) * 220),
      y: Math.round((Math.random() - 0.5) * 220),
      size: +(Math.random() * 2.2 + 0.5).toFixed(1),
      delay: +(Math.random() * 4).toFixed(2),
      dur: +(Math.random() * 2 + 1.6).toFixed(2),
    })), []
  );
  return (
    <div className="f-planet-wrap" aria-hidden="true">
      <div className="f-galaxy-cloud" />
      <div className="f-nebula-streak f-nebula-1" />
      <div className="f-nebula-streak f-nebula-2" />
      <div className="f-nebula-streak f-nebula-3" />
      {stars.map(s => (
        <div key={s.id} className="f-pstar" style={{
          width: `${s.size}px`, height: `${s.size}px`,
          top: `calc(50% + ${s.y}px)`, left: `calc(50% + ${s.x}px)`,
          animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`,
        }} />
      ))}
      <div className="f-planet-orb">
        <div className="f-planet-surface" />
        <div className="f-planet-clouds" />
        <div className="f-planet-shine" />
        <div className="f-planet-shadow" />
      </div>
      <div className="f-orbit-ring f-orbit-ring-1" />
      <div className="f-orbit-ring f-orbit-ring-2" />
    </div>
  );
}
