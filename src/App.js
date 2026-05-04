import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import { resume } from './data';

/* ── 3D Wireframe Shapes ── */
const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      <div className="f-cube f-cube-1">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-cube f-cube-2">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-cube f-cube-3">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-ring f-ring-1" />
      <div className="f-ring f-ring-2" />
      <div className="f-ring f-ring-3" />
    </div>
  );
}

/* ── Floating particles ── */
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
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
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div className="mouse-glow" aria-hidden="true"
      style={{ transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)` }}
    />
  );
}

/* ── 3D tilt card with specular shine ── */
function TiltCard({ children, className = '', style: s = {} }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, on: false });

  const onMove = (e) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const { top, left, height, width } = ref.current.getBoundingClientRect();
      const rx = ((e.clientY - top) / height - 0.5) * 9;
      const ry = -((e.clientX - left) / width - 0.5) * 9;
      const sx = ((e.clientX - left) / width) * 100;
      const sy = ((e.clientY - top) / height) * 100;
      ref.current.style.setProperty('--shine-x', `${sx}%`);
      ref.current.style.setProperty('--shine-y', `${sy}%`);
      setTilt({ rx, ry, on: true });
    });
  };
  const onLeave = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setTilt({ rx: 0, ry: 0, on: false });
  };
  return (
    <div ref={ref} className={`tilt-card ${className}`}
      style={{
        ...s,
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.on ? 'transform 0.06s ease' : 'transform 0.55s ease',
      }}
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
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

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
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="main">
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'experience' && <ExperienceSection />}
          {activeSection === 'skills' && <SkillsSection />}
          {activeSection === 'education' && <EducationSection />}
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

function EducationSection() {
  return (
    <div className="edu-section section-enter">
      {resume.education.map((edu, i) => (
        <TiltCard key={i} className="edu-card">
          <div className="edu-glow" />
          <div className="edu-icon-wrap">
            <span className="edu-icon">🎓</span>
          </div>
          <div className="edu-body">
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-institute">{edu.institute}</p>
            <p className="edu-location">📍 {edu.location}</p>
          </div>
          <span className="edu-period">{edu.period}</span>
        </TiltCard>
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
