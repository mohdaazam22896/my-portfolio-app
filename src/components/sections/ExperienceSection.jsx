import { useState } from 'react';
import { resume } from '../../data';
import TiltCard from '../ui/TiltCard';

export default function ExperienceSection() {
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
