import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import { resume } from './data';

/* ── 3D Wireframe Shapes ── */
const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

/* ── 3D Planet with Galaxy ── */
function FloatingPlanet() {
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

/* ── Solar System 3D Model ── */
function SolarSystem() {
  return (
    <div className="ss-wrap" aria-hidden="true">
      <div className="ss-bg-glow" />
      <div className="ss-system">
        <div className="ss-sun">
          <div className="ss-corona" />
          <div className="ss-corona ss-corona-2" />
        </div>
        <div className="ss-ring ss-ring-1" />
        <div className="ss-ring ss-ring-2" />
        <div className="ss-ring ss-ring-3" />
        <div className="ss-ring ss-ring-4" />
        <div className="ss-ring ss-ring-5" />
        <div className="ss-ring ss-ring-6" />
        <div className="ss-arm ss-arm-1"><div className="ss-planet ss-mercury" /></div>
        <div className="ss-arm ss-arm-2"><div className="ss-planet ss-venus" /></div>
        <div className="ss-arm ss-arm-3">
          <div className="ss-planet ss-earth">
            <div className="ss-moon-arm"><div className="ss-moon" /></div>
          </div>
        </div>
        <div className="ss-arm ss-arm-4"><div className="ss-planet ss-mars" /></div>
        <div className="ss-arm ss-arm-5"><div className="ss-planet ss-jupiter" /></div>
        <div className="ss-arm ss-arm-6">
          <div className="ss-planet ss-saturn">
            <div className="ss-saturn-ring" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
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

/* ── Floating particles ── */
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 22 + 12,
      delay: -(Math.random() * 20),
      opacity: Math.random() * 0.3 + 0.06,
    })), []
  );
  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          opacity: p.opacity,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}

/* ── Cursor glow ── */
function MouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current)
        ref.current.style.transform = `translate(${e.clientX - 350}px,${e.clientY - 350}px)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="mouse-glow" aria-hidden="true" style={{ transform: 'translate(-800px,-800px)' }} />;
}

/* ── 3D tilt card with specular shine ── */
function TiltCard({ children, className = '', style: s = {} }) {
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
    <div ref={ref} className={`tilt-card ${className}`}
      style={{ ...s, transform: 'perspective(600px) translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0)', transition: 'transform 0.55s ease, border-color 0.35s ease, box-shadow 0.4s ease' }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ── Animated skill bar ── */
function SkillBar({ name, level, color, index }) {
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

/* ── Theme Toggle Button ── */
function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? '☀' : '🌙'}
    </button>
  );
}

/* ── App ── */
function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [displaySection, setDisplaySection] = useState('about');
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const switchSection = (id) => {
    if (id === activeSection) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveSection(id);
    setLeaving(true);
    timerRef.current = setTimeout(() => {
      setDisplaySection(id);
      setLeaving(false);
    }, 210);
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="app">
      <MouseGlow />
      <FloatingShapes />
      <ParticleField />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-perspective" aria-hidden="true" />

      <div className="scanlines" aria-hidden="true" />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <div className="container">
        <header className="header">
          <div className="avatar-wrap">
            <div className="header-avatar">
              <div className="avatar-shine" />
              <span>MA</span>
            </div>
          </div>
          <div className="header-info">
            <h1 className="header-name">{resume.name}</h1>
            <p className="header-title"><TypingEffect text={resume.title} /></p>
            <div className="header-contacts">
              <ContactPill icon="📍" text={resume.contact.location} />
              <ContactPill icon="📞" text={resume.contact.phone} />
              <ContactPill icon="✉️" text={resume.contact.email} />
              <ContactPill icon="🔗" text="LinkedIn" href={`https://${resume.contact.linkedin}`} />
            </div>
          </div>
          <div className="header-badge">
            <span className="badge-dot" />
            Available for Work
          </div>
        </header>

        <nav className="nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`nav-btn ${activeSection === s.id ? 'nav-btn--active' : ''}`}
              onClick={() => switchSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="main">
          <div key={displaySection} className={`tab-content ${leaving ? 'tab-leaving' : ''}`}>
            {displaySection === 'about' && <AboutSection />}
            {displaySection === 'experience' && <ExperienceSection />}
            {displaySection === 'skills' && <SkillsSection />}
            {displaySection === 'education' && <EducationSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

function ContactPill({ icon, text, href }) {
  return href ? (
    <a className="contact-pill" href={href} target="_blank" rel="noreferrer">
      <span>{icon}</span><span>{text}</span>
    </a>
  ) : (
    <span className="contact-pill"><span>{icon}</span><span>{text}</span></span>
  );
}

function AboutSection() {
  return (
    <div className="section-grid section-enter">
      <TiltCard className="card card--full">
        <SectionTitle>Summary</SectionTitle>
        <ul className="summary-list">
          {resume.summary.map((point, i) => (
            <li key={i} className="summary-item">
              <span className="summary-dot" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </TiltCard>

      <TiltCard className="card">
        <SectionTitle>Achievements</SectionTitle>
        <div className="achievements-grid">
          {resume.achievements.map((a, i) => (
            <div key={i} className="achievement-card">
              <span className="achievement-icon">🏆</span>
              <span className="achievement-text">{a}</span>
            </div>
          ))}
        </div>
      </TiltCard>

      <TiltCard className="card">
        <SectionTitle>Quick Stats</SectionTitle>
        <div className="stats-grid">
          <StatBox value="7+" label="Years Exp." icon="⚡" />
          <StatBox value="3+" label="Projects" icon="🚀" />
          <StatBox value="14+" label="Technologies" icon="💻" />
          <StatBox value="4" label="Awards" icon="🏆" />
        </div>
      </TiltCard>
    </div>
  );
}

function ExperienceSection() {
  const [openProject, setOpenProject] = useState(null);
  return (
    <div className="timeline section-enter">
      {resume.experience.map((exp, ei) => (
        <div key={ei} className="timeline-item">
          <div className="timeline-marker">
            <div className={`timeline-dot ${exp.current ? 'timeline-dot--active' : ''}`} />
            {ei < resume.experience.length - 1 && <div className="timeline-line" />}
          </div>
          <div className="timeline-content">
            <TiltCard className="exp-header">
              <div>
                <h3 className="exp-role">{exp.role}</h3>
                <p className="exp-company">
                  <span className="exp-company-name">{exp.company}</span>
                  <span className="exp-sep"> · </span>
                  <span>{exp.location}</span>
                </p>
              </div>
              <span className={`exp-period ${exp.current ? 'exp-period--current' : ''}`}>
                {exp.current && <span className="period-dot" />}
                {exp.period}
              </span>
            </TiltCard>

            <div className="projects">
              {exp.projects.map((proj, pi) => {
                const key = `${ei}-${pi}`;
                const isOpen = openProject === key;
                return (
                  <div key={pi} className="project-card">
                    <button className="project-header"
                      onClick={() => setOpenProject(isOpen ? null : key)}>
                      <div className="project-name-wrap">
                        <span className="project-icon">⚡</span>
                        <span className="project-name">{proj.name}</span>
                      </div>
                      <span className={`project-chevron ${isOpen ? 'project-chevron--open' : ''}`}>›</span>
                    </button>
                    {isOpen && (
                      <div className="project-body">
                        <p className="project-desc">{proj.description}</p>
                        <div className="tech-stack">
                          {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                        </div>
                        <div className="responsibilities">
                          <h5 className="resp-title">Responsibilities</h5>
                          <ul className="resp-list">
                            {proj.responsibilities.map((r, ri) => (
                              <li key={ri} className="resp-item">
                                <span className="resp-bullet">→</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection() {
  const categories = [
    {
      label: 'Frontend', color: '#8b5cf6',
      skills: [
        { name: 'JavaScript', level: 95 }, { name: 'ReactJS', level: 92 },
        { name: 'TypeScript', level: 85 }, { name: 'AngularJS', level: 78 },
        { name: 'React Native', level: 80 }, { name: 'Redux', level: 88 },
      ],
    },
    {
      label: 'Backend', color: '#06b6d4',
      skills: [
        { name: 'NodeJs', level: 88 }, { name: 'ExpressJS', level: 85 },
        { name: 'GraphQL', level: 82 }, { name: 'Apollo GraphQL', level: 78 },
      ],
    },
    {
      label: 'Database & Cache', color: '#10b981',
      skills: [
        { name: 'MongoDB', level: 85 }, { name: 'Redis', level: 75 },
      ],
    },
    {
      label: 'Testing & Tools', color: '#f59e0b',
      skills: [
        { name: 'JEST', level: 82 }, { name: 'RTL', level: 78 }, { name: 'Git', level: 92 },
      ],
    },
  ];

  return (
    <div className="skills-section section-enter">
      {categories.map((cat, ci) => (
        <TiltCard key={cat.label} className="skill-category">
          <div className="skill-cat-header">
            <h3 className="skill-cat-title" style={{ color: cat.color }}>{cat.label}</h3>
          </div>
          <div className="skill-bars">
            {cat.skills.map((s, si) => (
              <SkillBar key={s.name} name={s.name} level={s.level}
                color={cat.color} index={ci * 6 + si} />
            ))}
          </div>
        </TiltCard>
      ))}
    </div>
  );
}

function EduScoreBar({ percentage, index }) {
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

function EducationSection() {
  return (
    <div className="edu-section">
      {resume.education.map((edu, i) => (
        <div key={i} className="edu-anim-wrap" style={{ animationDelay: `${i * 0.1 + 0.05}s` }}>
          <TiltCard className="edu-card">
            <div className="edu-glow" />
            <div className="edu-icon-wrap">
              <span className="edu-icon">🎓</span>
            </div>
            <div className="edu-body">
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institute">{edu.institute}</p>
              <p className="edu-location">📍 {edu.location}</p>
              <EduScoreBar percentage={edu.percentage} index={i} />
            </div>
            <span className="edu-period">{edu.period}</span>
          </TiltCard>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="section-title-wrap">
      <span className="section-title-line" />
      <h2 className="section-title">{children}</h2>
    </div>
  );
}

function StatBox({ value, label, icon }) {
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

function TypingEffect({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}<span className="typing-cursor">|</span></span>;
}

export default App;
