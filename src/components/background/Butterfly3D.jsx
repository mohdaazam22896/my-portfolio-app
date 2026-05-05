import { useEffect, useRef } from 'react';

const UPPER_RIGHT = "M4,20 C10,-10 50,-15 70,10 C85,25 80,45 60,50 C40,55 10,45 4,20Z";
const LOWER_RIGHT = "M4,22 C10,40 40,65 60,55 C75,48 70,30 60,30 C45,30 15,30 4,22Z";
const UPPER_LEFT  = "M-4,20 C-10,-10 -50,-15 -70,10 C-85,25 -80,45 -60,50 C-40,55 -10,45 -4,20Z";
const LOWER_LEFT  = "M-4,22 C-10,40 -40,65 -60,55 C-75,48 -70,30 -60,30 C-45,30 -15,30 -4,22Z";

export default function Butterfly3D() {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    /* ── cached DOM refs ── */
    const rWing   = wrap.querySelector('.bfly-r');
    const lWing   = wrap.querySelector('.bfly-l');
    const glowFe  = wrap.querySelector('#bfly-glow');
    /* wing upper stops (both sides share same gradient ids) */
    const urStop  = wrap.querySelector('#gUR stop:first-child');
    const ulStop  = wrap.querySelector('#gUL stop:first-child');
    /* eye circles */
    const eyes    = wrap.querySelectorAll('.bfly-eye');

    /* ── state ── */
    const s = {
      x: Math.random() * (window.innerWidth  - 120) + 60,
      y: Math.random() * (window.innerHeight - 120) + 60,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      angle: 0,
      flapT: 0,
      drift: Math.random() * Math.PI * 2,

      mx: -9999, my: -9999,

      /* idle | curious | flee | attracted */
      mode: 'idle',
      modeTimer: 0,

      fleeFromX: 0, fleeFromY: 0,
      targetX: 0,   targetY: 0,

      glow: 0,
      sparkles: [],
      raf: null,
    };

    /* ── sparkle helper ── */
    const burst = (count, cx, cy, palette, speed = 2.5) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = Math.random() * speed + 0.5;
        s.sparkles.push({
          x: cx, y: cy,
          vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.5,
          life: 1,
          size: Math.random() * 2.5 + 1,
          color: palette[Math.floor(Math.random() * palette.length)],
        });
      }
    };

    const FLEE_PALETTE   = ['#f9a8d4','#c084fc','#e879f9','#fb7185'];
    const CLICK_PALETTE  = ['#c4b5fd','#67e8f9','#a78bfa','#38bdf8'];
    const GOLD_PALETTE   = ['#fde68a','#fbbf24','#f59e0b','#fcd34d'];

    /* ── event handlers ── */
    const onMouseMove = (e) => { s.mx = e.clientX; s.my = e.clientY; };

    const onClick = (e) => {
      /* startle – flee from click point */
      if (s.mode !== 'flee') {
        s.fleeFromX = e.clientX;
        s.fleeFromY = e.clientY;
        s.mode = 'flee';
        s.modeTimer = 110;
        burst(10, s.x, s.y, CLICK_PALETTE, 3);
      }
    };

    const onDblClick = (e) => {
      /* double-click: attract butterfly to cursor, emit gold sparkles */
      s.targetX = e.clientX;
      s.targetY = e.clientY;
      s.mode = 'attracted';
      s.modeTimer = 200;
      burst(12, e.clientX, e.clientY, GOLD_PALETTE, 2.5);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click',     onClick);
    window.addEventListener('dblclick',  onDblClick);

    /* ── animation loop ── */
    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dist = Math.hypot(s.mx - s.x, s.my - s.y);

      /* ── state machine ── */
      if (s.mode === 'idle' || s.mode === 'curious') {
        if (dist < 130) {
          s.mode = 'flee';
          s.fleeFromX = s.mx;
          s.fleeFromY = s.my;
          s.modeTimer = 100;
          burst(6, s.x, s.y, FLEE_PALETTE, 2);
        } else if (dist < 260) {
          s.mode = 'curious';
          s.modeTimer = 80;
        } else if (s.mode === 'curious') {
          s.modeTimer--;
          if (s.modeTimer <= 0) s.mode = 'idle';
        }
      }

      if (s.mode === 'flee' || s.mode === 'attracted') {
        s.modeTimer--;
        if (s.modeTimer <= 0) s.mode = 'idle';
      }

      /* ── per-mode physics ── */
      let flapSpeed = 0.18;
      let maxSpd    = 1.6;
      let minSpd    = 0.4;

      if (s.mode === 'flee') {
        const fx = s.x - s.fleeFromX;
        const fy = s.y - s.fleeFromY;
        const fd = Math.hypot(fx, fy) || 1;
        s.vx += (fx / fd) * 0.42;
        s.vy += (fy / fd) * 0.42;
        flapSpeed = 0.42;
        maxSpd    = 3.5;
        minSpd    = 1.8;

        /* panic trail */
        if (Math.random() < 0.35) {
          burst(1, s.x, s.y, FLEE_PALETTE, 1);
        }
      } else if (s.mode === 'curious') {
        /* gently lean toward mouse */
        const cx = s.mx - s.x;
        const cy = s.my - s.y;
        const cd = Math.hypot(cx, cy) || 1;
        s.vx += (cx / cd) * 0.014;
        s.vy += (cy / cd) * 0.014;
        flapSpeed = 0.11;
        maxSpd    = 1.1;

        /* occasional curiosity sparkle */
        if (Math.random() < 0.015) {
          burst(2, s.x, s.y, CLICK_PALETTE, 0.8);
        }
      } else if (s.mode === 'attracted') {
        const tx = s.targetX - s.x;
        const ty = s.targetY - s.y;
        const td = Math.hypot(tx, ty) || 1;
        s.vx += (tx / td) * 0.18;
        s.vy += (ty / td) * 0.18;
        flapSpeed = 0.26;
        maxSpd    = 4.5;
        minSpd    = 0.8;

        /* circle sparkles when arrived */
        if (td < 35 && Math.random() < 0.25) {
          burst(2, s.x, s.y, GOLD_PALETTE, 1);
        }
      } else {
        /* idle gentle drift */
        s.drift += 0.012;
        s.vx += Math.cos(s.drift * 0.7) * 0.018;
        s.vy += Math.sin(s.drift)        * 0.018;
      }

      /* proportional wall repulsion – gets much stronger near edges */
      const M = 100;
      const wf = 0.7;
      if (s.x < M)      s.vx += wf * (1 - s.x / M);
      if (s.x > W - M)  s.vx -= wf * (1 - (W - s.x) / M);
      if (s.y < M)      s.vy += wf * (1 - s.y / M);
      if (s.y > H - M)  s.vy -= wf * (1 - (H - s.y) / M);

      /* speed clamp */
      const spd = Math.hypot(s.vx, s.vy);
      if (spd > maxSpd) { s.vx = (s.vx / spd) * maxSpd; s.vy = (s.vy / spd) * maxSpd; }
      if (spd < minSpd && s.mode !== 'idle') { s.vx *= 1.08; s.vy *= 1.08; }
      if (s.mode === 'idle') {
        if (spd > maxSpd) { s.vx = (s.vx / spd) * maxSpd; s.vy = (s.vy / spd) * maxSpd; }
        if (spd < minSpd) { s.vx *= 1.12; s.vy *= 1.12; }
      }

      s.x += s.vx;
      s.y += s.vy;

      /* hard clamp – absolute guarantee it never leaves the screen */
      const edge = 55;
      if (s.x < edge)     { s.x = edge;     s.vx =  Math.abs(s.vx) * 0.4; }
      if (s.x > W - edge) { s.x = W - edge; s.vx = -Math.abs(s.vx) * 0.4; }
      if (s.y < edge)     { s.y = edge;     s.vy =  Math.abs(s.vy) * 0.4; }
      if (s.y > H - edge) { s.y = H - edge; s.vy = -Math.abs(s.vy) * 0.4; }

      /* ── heading angle ── */
      const targetAngle = Math.atan2(s.vy, s.vx) * (180 / Math.PI) + 90;
      const turnRate    = s.mode === 'flee' ? 0.16 : 0.065;
      s.angle += ((targetAngle - s.angle + 540) % 360 - 180) * turnRate;

      /* ── flap ── */
      s.flapT += flapSpeed;
      const flapAngle = Math.abs(Math.sin(s.flapT)) * 70;

      /* ── glow ── */
      const glowTarget =
        s.mode === 'flee'      ? 1   :
        s.mode === 'curious'   ? 0.55 :
        s.mode === 'attracted' ? 0.7  : 0;
      s.glow += (glowTarget - s.glow) * 0.07;

      /* ── DOM updates ── */
      wrap.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.angle}deg)`;

      if (rWing) rWing.style.transform = `perspective(120px) rotateY(${-flapAngle}deg)`;
      if (lWing) lWing.style.transform = `perspective(120px) rotateY(${flapAngle}deg)`;

      /* glow filter blur amount */
      if (glowFe) glowFe.setAttribute('stdDeviation', (s.glow * 7).toFixed(2));

      /* wing tint by state */
      const wingColor =
        s.mode === 'flee'      ? '#fda4af' : // pink/red
        s.mode === 'curious'   ? '#bae6fd' : // sky blue
        s.mode === 'attracted' ? '#fde68a' : // golden
                                 '#c4b5fd';  // default violet
      if (urStop) urStop.setAttribute('stop-color', wingColor);
      if (ulStop) ulStop.setAttribute('stop-color', wingColor);

      /* eye color */
      const eyeColor =
        s.mode === 'flee'      ? 'rgba(251,113,133,0.95)' :
        s.mode === 'curious'   ? 'rgba(56,189,248,0.95)'  :
        s.mode === 'attracted' ? 'rgba(251,191,36,0.95)'  :
                                 'rgba(139,92,246,0.9)';
      eyes.forEach(e => e.setAttribute('fill', eyeColor));

      /* ── sparkles on canvas ── */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      s.sparkles = s.sparkles.filter(sp => sp.life > 0.02);

      for (const sp of s.sparkles) {
        sp.x    += sp.vx;
        sp.y    += sp.vy;
        sp.vy   += 0.045;
        sp.vx   *= 0.97;
        sp.life -= 0.028;

        const r = sp.size * sp.life;
        ctx.save();
        ctx.globalAlpha = sp.life * 0.9;
        ctx.fillStyle   = sp.color;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, r, 0, Math.PI * 2);
        ctx.fill();

        /* star cross on bigger sparkles */
        if (sp.size > 2.5 && sp.life > 0.5) {
          ctx.strokeStyle = sp.color;
          ctx.lineWidth   = 0.8;
          ctx.beginPath();
          ctx.moveTo(sp.x - r * 2, sp.y); ctx.lineTo(sp.x + r * 2, sp.y);
          ctx.moveTo(sp.x, sp.y - r * 2); ctx.lineTo(sp.x, sp.y + r * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click',     onClick);
      window.removeEventListener('dblclick',  onDblClick);
      window.removeEventListener('resize',    resize);
    };
  }, []);

  return (
    <>
      {/* sparkle trail canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 4 }}
      />

      {/* butterfly */}
      <div
        ref={wrapRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 0, height: 0,
          pointerEvents: 'none',
          zIndex: 5,
          willChange: 'transform',
        }}
      >
        <svg
          width="140" height="110"
          viewBox="-70 -20 140 110"
          style={{ overflow: 'visible', marginLeft: -70, marginTop: -45 }}
          filter="url(#bfly-glow-f)"
        >
          {/* right wings */}
          <g className="bfly-r" style={{ transformOrigin: '0px 20px' }}>
            <path d={UPPER_RIGHT} fill="url(#gUR)" opacity="0.88" />
            <path d={UPPER_RIGHT} fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="0.8" />
            <line x1="4"  y1="20" x2="55" y2="8"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
            <line x1="4"  y1="20" x2="68" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
            <line x1="25" y1="15" x2="50" y2="35" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5"/>
            <path d={LOWER_RIGHT} fill="url(#gLR)" opacity="0.80" />
            <path d={LOWER_RIGHT} fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" />
            <line x1="4" y1="25" x2="55" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
            {/* wing shimmer spot */}
            <circle cx="38" cy="20" r="5" fill="rgba(255,255,255,0.07)" />
            <circle cx="45" cy="44" r="4" fill="rgba(255,255,255,0.06)" />
          </g>

          {/* left wings */}
          <g className="bfly-l" style={{ transformOrigin: '0px 20px' }}>
            <path d={UPPER_LEFT} fill="url(#gUL)" opacity="0.88" />
            <path d={UPPER_LEFT} fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="0.8" />
            <line x1="-4"  y1="20" x2="-55" y2="8"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
            <line x1="-4"  y1="20" x2="-68" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
            <line x1="-25" y1="15" x2="-50" y2="35" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5"/>
            <path d={LOWER_LEFT} fill="url(#gLL)" opacity="0.80" />
            <path d={LOWER_LEFT} fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" />
            <line x1="-4" y1="25" x2="-55" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
            <circle cx="-38" cy="20" r="5" fill="rgba(255,255,255,0.07)" />
            <circle cx="-45" cy="44" r="4" fill="rgba(255,255,255,0.06)" />
          </g>

          {/* body */}
          <ellipse cx="0" cy="30" rx="3.5" ry="18"
            fill="url(#gBody)" stroke="rgba(139,92,246,0.7)" strokeWidth="0.6" />
          {/* head */}
          <circle cx="0" cy="10" r="4.5"
            fill="#1e1b4b" stroke="rgba(167,139,250,0.8)" strokeWidth="0.7" />
          {/* eyes */}
          <circle className="bfly-eye" cx="-1.8" cy="9.2" r="1.4" fill="rgba(139,92,246,0.9)" />
          <circle className="bfly-eye" cx=" 1.8" cy="9.2" r="1.4" fill="rgba(139,92,246,0.9)" />
          {/* eye shine */}
          <circle cx="-1.2" cy="8.7" r="0.45" fill="rgba(255,255,255,0.75)" />
          <circle cx=" 2.4" cy="8.7" r="0.45" fill="rgba(255,255,255,0.75)" />
          {/* antennae */}
          <path d="M-1.5,6 Q-8,-4 -13,-9" fill="none"
            stroke="rgba(167,139,250,0.75)" strokeWidth="0.9" strokeLinecap="round"/>
          <circle cx="-13" cy="-9" r="1.8" fill="rgba(167,139,250,0.85)" />
          <path d="M1.5,6 Q8,-4 13,-9" fill="none"
            stroke="rgba(167,139,250,0.75)" strokeWidth="0.9" strokeLinecap="round"/>
          <circle cx="13" cy="-9" r="1.8" fill="rgba(167,139,250,0.85)" />

          <defs>
            <filter id="bfly-glow-f" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur id="bfly-glow" in="SourceGraphic" stdDeviation="0" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="gUR" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#c4b5fd" stopOpacity="0.92" />
              <stop offset="45%"  stopColor="#8b5cf6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5"  />
            </radialGradient>
            <radialGradient id="gUL" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#c4b5fd" stopOpacity="0.92" />
              <stop offset="45%"  stopColor="#8b5cf6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5"  />
            </radialGradient>
            <radialGradient id="gLR" cx="40%" cy="40%" r="65%">
              <stop offset="0%"   stopColor="#67e8f9" stopOpacity="0.85" />
              <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#164e63" stopOpacity="0.45" />
            </radialGradient>
            <radialGradient id="gLL" cx="60%" cy="40%" r="65%">
              <stop offset="0%"   stopColor="#67e8f9" stopOpacity="0.85" />
              <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#164e63" stopOpacity="0.45" />
            </radialGradient>
            <linearGradient id="gBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
