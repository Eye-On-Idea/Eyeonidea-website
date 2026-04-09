import { CatmullRomCurve3, Vector3 } from "three";

const positionPoints = [
  new Vector3( 0.0,  0.0,  7.0),
  new Vector3( 0.4,  0.1,  5.0),
  new Vector3( 0.5,  0.0,  4.5),
  new Vector3( 0.5,  0.3,  4.5),
  new Vector3( 0.5, -0.2,  4.5),
  new Vector3( 0.5,  0.2,  4.5),
  new Vector3( 0.5, -0.1,  4.5),
  new Vector3( 0.5,  0.1,  4.5),
  new Vector3( 0.5, -0.3,  4.3),
  new Vector3( 0.0,  0.5,  6.0),
];

const targetPoints = [
  new Vector3( 0.0,  0.0,  0.0),
  new Vector3( 1.5,  0.0,  0.5),
  new Vector3( 2.0,  0.0,  0.8),
  new Vector3( 1.8,  0.3,  0.4),
  new Vector3( 2.2, -0.2,  0.0),
  new Vector3( 1.9,  0.2, -0.3),
  new Vector3( 2.1, -0.1, -0.6),
  new Vector3( 1.7,  0.1, -1.0),
  new Vector3( 2.0, -0.3, -1.4),
  new Vector3( 0.0,  0.0,  0.0),
];

const positionCurve = new CatmullRomCurve3(positionPoints, false, "catmullrom", 0.5);
const targetCurve   = new CatmullRomCurve3(targetPoints,   false, "catmullrom", 0.5);

const _pos    = new Vector3();
const _target = new Vector3();

export function useCameraPath() {

  const getCameraAtProgress = (t: number) => {
    const clamped = Math.max(0, Math.min(1, t));
    positionCurve.getPoint(clamped, _pos);
    targetCurve.getPoint(clamped, _target);
    return { position: _pos, target: _target };
  };

  return { getCameraAtProgress };
}
