export default function SectionTitle({ children }) {
  return (
    <div className="section-title-wrap">
      <span className="section-title-line" />
      <h2 className="section-title">{children}</h2>
    </div>
  );
}
