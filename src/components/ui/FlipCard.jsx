import { useState } from 'react';

export default function FlipCard({ front, back, className = '' }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-wrap ${flipped ? 'flip-wrap--on' : ''} ${className}`}
      onClick={() => setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
    >
      {/* front – in-flow, sets height */}
      <div className="flip-face flip-face--front">{front}</div>
      {/* back – absolute overlay, revealed by rotateY(180deg) */}
      <div className="flip-face flip-face--back">{back}</div>
      <span className="flip-hint">{flipped ? '↩ flip back' : '↻ click to flip'}</span>
    </div>
  );
}
