import { useState, useEffect } from 'react';

export default function StatBox({ value, label, icon }) {
  const numericPart = parseInt(value, 10);
  const suffix = value.replace(String(numericPart), '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= numericPart) clearInterval(interval);
    }, Math.floor(1200 / numericPart));
    return () => clearInterval(interval);
  }, [numericPart]);

  return (
    <div className="stat-box">
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
