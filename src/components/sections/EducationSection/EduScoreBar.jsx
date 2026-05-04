import { useState, useEffect } from 'react';

export default function EduScoreBar({ percentage, index }) {
  const numeric = parseFloat(percentage);
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(numeric), index * 120 + 350);
    return () => clearTimeout(t);
  }, [numeric, index]);
  return (
    <div className="edu-score">
      <div className="edu-score-label">
        <span className="edu-score-text">Score</span>
        <span className="edu-score-pct">{percentage}</span>
      </div>
      <div className="edu-score-track">
        <div className="edu-score-fill" style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}
