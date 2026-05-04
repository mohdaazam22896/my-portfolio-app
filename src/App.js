import React, { useState } from 'react';
import './App.css';
import { resume } from './data';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="app">
      {/* Background blobs */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-avatar">
            <span>MA</span>
          </div>
          <div className="header-info">
            <h1 className="header-name">{resume.name}</h1>
            <p className="header-title">{resume.title}</p>
            <div className="header-contacts">
              <ContactPill icon="📍" text={resume.contact.location} />
              <ContactPill icon="📞" text={resume.contact.phone} />
              <ContactPill icon="✉️" text={resume.contact.email} />
              <ContactPill icon="🔗" text="LinkedIn" href={`https://${resume.contact.linkedin}`} />
            </div>
          </div>
          <div className="header-badge">
            <span className="badge-dot" />
            Available
          </div>
        </header>

        {/* Nav */}
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

        {/* Content */}
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
      <span>{icon}</span>
      <span>{text}</span>
    </a>
  ) : (
    <span className="contact-pill">
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  );
}

function AboutSection() {
  return (
    <div className="section-grid">
      {/* Summary */}
      <div className="card card--full">
        <SectionTitle>Summary</SectionTitle>
        <ul className="summary-list">
          {resume.summary.map((point, i) => (
            <li key={i} className="summary-item">
              <span className="summary-dot" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Achievements */}
      <div className="card">
        <SectionTitle>Achievements</SectionTitle>
        <div className="achievements-grid">
          {resume.achievements.map((a, i) => (
            <div key={i} className="achievement-card">
              <span className="achievement-icon">🏆</span>
              <span className="achievement-text">{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="card">
        <SectionTitle>Quick Stats</SectionTitle>
        <div className="stats-grid">
          <StatBox value="7+" label="Years Experience" />
          <StatBox value="3+" label="Projects Delivered" />
          <StatBox value="14+" label="Technologies" />
          <StatBox value="4" label="Achievements" />
        </div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  const [openProject, setOpenProject] = useState(null);

  return (
    <div className="timeline">
      {resume.experience.map((exp, ei) => (
        <div key={ei} className="timeline-item">
          <div className="timeline-marker">
            <div className={`timeline-dot ${exp.current ? 'timeline-dot--active' : ''}`} />
            {ei < resume.experience.length - 1 && <div className="timeline-line" />}
          </div>
          <div className="timeline-content">
            <div className="exp-header">
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
            </div>

            <div className="projects">
              {exp.projects.map((proj, pi) => {
                const key = `${ei}-${pi}`;
                const isOpen = openProject === key;
                return (
                  <div key={pi} className="project-card">
                    <button
                      className="project-header"
                      onClick={() => setOpenProject(isOpen ? null : key)}
                    >
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
                          {proj.tech.map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                          ))}
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
    { label: 'Frontend', skills: ['JavaScript', 'TypeScript', 'ReactJS', 'AngularJS', 'React Native', 'Redux'], color: '#7c3aed' },
    { label: 'Backend', skills: ['NodeJs', 'ExpressJS', 'GraphQL', 'Apollo GraphQL'], color: '#0891b2' },
    { label: 'Database & Cache', skills: ['MongoDB', 'Redis'], color: '#059669' },
    { label: 'Testing & Tools', skills: ['JEST', 'RTL', 'Git'], color: '#d97706' },
  ];

  return (
    <div className="skills-section">
      {categories.map((cat) => (
        <div key={cat.label} className="skill-category">
          <h3 className="skill-cat-title" style={{ color: cat.color }}>{cat.label}</h3>
          <div className="skill-pills">
            {cat.skills.map((skill) => (
              <SkillPill key={skill} skill={skill} color={cat.color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillPill({ skill, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="skill-pill"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? color : 'transparent',
        background: hovered ? `${color}22` : '#1e1e35',
        color: hovered ? color : '#94a3b8',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {skill}
    </div>
  );
}

function EducationSection() {
  return (
    <div className="edu-section">
      {resume.education.map((edu, i) => (
        <div key={i} className="edu-card">
          <div className="edu-icon">🎓</div>
          <div className="edu-body">
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-institute">{edu.institute}</p>
            <p className="edu-location">{edu.location}</p>
          </div>
          <span className="edu-period">{edu.period}</span>
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

function StatBox({ value, label }) {
  return (
    <div className="stat-box">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default App;
