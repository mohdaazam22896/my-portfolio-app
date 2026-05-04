export default function SolarSystem() {
  return (
    <div className="ss-wrap" aria-hidden="true">
      <div className="ss-bg-glow" />
      <div className="ss-system">
        <div className="ss-sun">
          <div className="ss-corona" />
          <div className="ss-corona ss-corona-2" />
        </div>
        <div className="ss-ring ss-ring-1" />
        <div className="ss-ring ss-ring-2" />
        <div className="ss-ring ss-ring-3" />
        <div className="ss-ring ss-ring-4" />
        <div className="ss-ring ss-ring-5" />
        <div className="ss-ring ss-ring-6" />
        <div className="ss-arm ss-arm-1"><div className="ss-planet ss-mercury" /></div>
        <div className="ss-arm ss-arm-2"><div className="ss-planet ss-venus" /></div>
        <div className="ss-arm ss-arm-3">
          <div className="ss-planet ss-earth">
            <div className="ss-moon-arm"><div className="ss-moon" /></div>
          </div>
        </div>
        <div className="ss-arm ss-arm-4"><div className="ss-planet ss-mars" /></div>
        <div className="ss-arm ss-arm-5"><div className="ss-planet ss-jupiter" /></div>
        <div className="ss-arm ss-arm-6">
          <div className="ss-planet ss-saturn">
            <div className="ss-saturn-ring" />
          </div>
        </div>
      </div>
    </div>
  );
}
