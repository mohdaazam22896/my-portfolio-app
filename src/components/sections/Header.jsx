import { resume } from '../../data';
import TypingEffect from '../ui/TypingEffect';
import ContactPill  from '../ui/ContactPill';
import avatarImg    from '../../26629.jpg';

export default function Header() {
  return (
    <header className="header">
      {/* ── Avatar with 3D orbit rings ── */}
      <div className="avatar-wrap">
        <div className="avatar-orbit-ring avatar-orbit-ring--1" />
        <div className="avatar-orbit-ring avatar-orbit-ring--2" />
        <div className="avatar-orbit-ring avatar-orbit-ring--3" />
        <div className="avatar-core">
          <div className="header-avatar">
            <img src={avatarImg} alt="Mohd Aazam" className="avatar-photo" />
            <div className="avatar-shine" />
          </div>
        </div>
      </div>

      <div className="header-info">
        {/* ── 3D extruded name ── */}
        <h1 className="header-name header-name--3d">{resume.name}</h1>
        <p  className="header-title"><TypingEffect text={resume.title} /></p>
        <div className="header-contacts">
          <ContactPill icon="📍" text={resume.contact.location} />
          <ContactPill icon="📞" text={resume.contact.phone} />
          <ContactPill icon="✉️" text={resume.contact.email} />
          <ContactPill icon="🔗" text="LinkedIn" href={`https://${resume.contact.linkedin}`} />
        </div>
      </div>

      {/* ── Floating 3D badge ── */}
      <div className="header-badge header-badge--3d">
        <span className="badge-dot" />
        Available for Work
      </div>
    </header>
  );
}
