import TiltCard from '../ui/TiltCard';
import SkillBar  from '../ui/SkillBar';

const categories = [
  {
    label: 'Frontend', color: '#8b5cf6',
    skills: [
      { name: 'JavaScript', level: 95 }, { name: 'ReactJS',    level: 92 },
      { name: 'TypeScript', level: 85 }, { name: 'AngularJS',  level: 78 },
      { name: 'React Native', level: 80 }, { name: 'Redux',    level: 88 },
    ],
  },
  {
    label: 'Backend', color: '#06b6d4',
    skills: [
      { name: 'NodeJs',       level: 88 }, { name: 'ExpressJS',    level: 85 },
      { name: 'GraphQL',      level: 82 }, { name: 'Apollo GraphQL', level: 78 },
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

export default function SkillsSection() {
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
