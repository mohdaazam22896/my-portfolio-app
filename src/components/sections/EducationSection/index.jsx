import { resume } from '../../../data';
import TiltCard from '../../ui/TiltCard';
import EduScoreBar from './EduScoreBar';

export default function EducationSection() {
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
