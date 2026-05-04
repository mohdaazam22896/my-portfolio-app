import { useState, useEffect } from 'react';

export default function SkillBar({ name, level, color, index }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(level), index * 75 + 200);
    return () => clearTimeout(t);
  }, [level, index]);
  return (
    <div className="skill-bar">
      <div className="skill-bar-label">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{
          width: `${w}%`,
          background: `linear-gradient(90deg, ${color}44, ${color})`,
          boxShadow: `0 0 14px ${color}88, inset 0 1px 0 rgba(255,255,255,0.3)`,
        }} />
      </div>
    </div>
  );
}
