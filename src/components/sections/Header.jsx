import { resume } from '../../data';
import TypingEffect from '../ui/TypingEffect';
import ContactPill from '../ui/ContactPill';

export default function Header() {
  return (
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
  );
}
