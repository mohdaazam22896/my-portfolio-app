import { useState, useRef, useEffect } from 'react';
import './App.css';

import MouseGlow       from './components/background/MouseGlow';
import ParticleField   from './components/background/ParticleField';
import FloatingShapes  from './components/background/FloatingShapes';

import ThemeToggle     from './components/ui/ThemeToggle';

import Header          from './components/sections/Header';
import AboutSection    from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import SkillsSection   from './components/sections/SkillsSection';
import EducationSection from './components/sections/EducationSection';

const SECTIONS = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills'     },
  { id: 'education',  label: 'Education'  },
];

export default function App() {
  const [activeSection,  setActiveSection]  = useState('about');
  const [displaySection, setDisplaySection] = useState('about');
  const [leaving,        setLeaving]        = useState(false);
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

  return (
    <div className="app">
      <MouseGlow />
      <FloatingShapes />
      <ParticleField />
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />
      <div className="bg-grid"        aria-hidden="true" />
      <div className="bg-perspective" aria-hidden="true" />
      <div className="scanlines"      aria-hidden="true" />

      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <div className="container">
        <Header />

        <nav className="nav">
          {SECTIONS.map(s => (
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
            {displaySection === 'about'      && <AboutSection />}
            {displaySection === 'experience' && <ExperienceSection />}
            {displaySection === 'skills'     && <SkillsSection />}
            {displaySection === 'education'  && <EducationSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
