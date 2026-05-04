import { resume } from '../../data';
import TiltCard from '../ui/TiltCard';
import SectionTitle from '../ui/SectionTitle';
import StatBox from '../ui/StatBox';

export default function AboutSection() {
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
