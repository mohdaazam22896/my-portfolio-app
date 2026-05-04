export default function ContactPill({ icon, text, href }) {
  return href ? (
    <a className="contact-pill" href={href} target="_blank" rel="noreferrer">
      <span>{icon}</span><span>{text}</span>
    </a>
  ) : (
    <span className="contact-pill"><span>{icon}</span><span>{text}</span></span>
  );
}
