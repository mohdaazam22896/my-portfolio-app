import SolarSystem from './SolarSystem';
import FloatingPlanet from './FloatingPlanet';

const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

export default function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      <SolarSystem />
      <FloatingPlanet />
      <div className="f-cube f-cube-3">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-cube f-cube-4">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-cube f-cube-5">{FACES.map(f => <div key={f} className={`f-face f-${f}`} />)}</div>
      <div className="f-ring f-ring-1" />
      <div className="f-ring f-ring-2" />
      <div className="f-ring f-ring-3" />
      <div className="f-ring f-ring-4" />
      <div className="f-ring f-ring-5" />
      <div className="f-gyro">
        <div className="f-gyro-ring f-gyro-r1" />
        <div className="f-gyro-ring f-gyro-r2" />
        <div className="f-gyro-ring f-gyro-r3" />
      </div>
    </div>
  );
}
