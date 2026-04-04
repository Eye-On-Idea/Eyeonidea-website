import { CatmullRomCurve3, Vector3 } from "three";

// 10-point gallery-scan camera path.
// The camera holds a stable position in front-left (x≈0.5, z≈4.5) and sweeps
// its gaze rightward through each service panel — a gallery walk, not a fly-through.
//
// Panel positions mirror ServiceChapters.vue (right-column clustering):
//   websites [2.0,  0.0,  0.8]   identity [1.8,  0.3,  0.4]
//   content  [2.2, -0.2,  0.0]   seo      [1.9,  0.2, -0.3]
//   email    [2.1, -0.1, -0.6]   domain   [1.7,  0.1, -1.0]
//   qa       [2.0, -0.3, -1.4]
const positionPoints = [
  new Vector3( 0.0,  0.0,  7.0),  //  0: hero — centered, far back
  new Vector3( 0.4,  0.1,  5.0),  //  1: services entry — drift right
  new Vector3( 0.5,  0.0,  4.5),  //  2: websites — settle into gallery position
  new Vector3( 0.5,  0.3,  4.5),  //  3: identity — subtle y lift
  new Vector3( 0.5, -0.2,  4.5),  //  4: content — slight y drop
  new Vector3( 0.5,  0.2,  4.5),  //  5: seo — y lift
  new Vector3( 0.5, -0.1,  4.5),  //  6: email — near center
  new Vector3( 0.5,  0.1,  4.5),  //  7: domain — slight y lift
  new Vector3( 0.5, -0.3,  4.3),  //  8: qa — slight pullback
  new Vector3( 0.0,  0.5,  6.0),  //  9: outro — pull back for values/CTA
];

const targetPoints = [
  new Vector3( 0.0,  0.0,  0.0),  //  0: hero
  new Vector3( 1.5,  0.0,  0.5),  //  1: services entry — begin sweeping right
  new Vector3( 2.0,  0.0,  0.8),  //  2: websites panel
  new Vector3( 1.8,  0.3,  0.4),  //  3: identity panel
  new Vector3( 2.2, -0.2,  0.0),  //  4: content panel
  new Vector3( 1.9,  0.2, -0.3),  //  5: seo panel
  new Vector3( 2.1, -0.1, -0.6),  //  6: email panel
  new Vector3( 1.7,  0.1, -1.0),  //  7: domain panel
  new Vector3( 2.0, -0.3, -1.4),  //  8: qa panel
  new Vector3( 0.0,  0.0,  0.0),  //  9: outro
];

const positionCurve = new CatmullRomCurve3(positionPoints, false, "catmullrom", 0.5);
const targetCurve   = new CatmullRomCurve3(targetPoints,   false, "catmullrom", 0.5);

const _pos    = new Vector3();
const _target = new Vector3();

export function useCameraPath() {
  /**
   * Returns camera position and lookAt target for a given scroll progress (0–1).
   * Reuses the same Vector3 instances — do not store references between calls.
   */
  const getCameraAtProgress = (t: number) => {
    const clamped = Math.max(0, Math.min(1, t));
    positionCurve.getPoint(clamped, _pos);
    targetCurve.getPoint(clamped, _target);
    return { position: _pos, target: _target };
  };

  return { getCameraAtProgress };
}
