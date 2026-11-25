'use client';

import { Suspense, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FINAL_KEY, STEP_KEYS, mobilisationSteps } from './data';

export interface SceneInputs {
  progress: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
}

const BLUE = new THREE.Color('#354B60');
const GLOW = new THREE.Color('#7394AC');
const SPARK = new THREE.Color('#F0F5F7');

/** World positions of the four stations along the journey. */
const STATIONS = [
  new THREE.Vector3(-1.5, 1.05, 0),
  new THREE.Vector3(1.6, 0.35, -3.4),
  new THREE.Vector3(-1.5, -0.35, -6.8),
  new THREE.Vector3(0.6, -1.05, -10.6),
];
const SIZES = [3.0, 3.0, 2.8, 3.7];

const smooth = (a: number, b: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Camera keyframes: intro, four stations, final wide assembled shot. */
const CAM_KEYS = [0, ...STEP_KEYS, FINAL_KEY];
const CAM_POS = [
  STATIONS[0].clone().add(new THREE.Vector3(0.6, 1.6, 8.5)),
  ...STATIONS.map((s, i) => s.clone().add(new THREE.Vector3(i % 2 ? -0.6 : 0.6, 0.9, i === 3 ? 8.2 : 6.3))),
  STATIONS[3].clone().add(new THREE.Vector3(-0.5, 2.6, 8.4)),
];
const CAM_TARGET = [
  STATIONS[0].clone(),
  ...STATIONS.map((s, i) => s.clone().add(new THREE.Vector3(0, -SIZES[i] * 0.14, 0))),
  STATIONS[3].clone().add(new THREE.Vector3(-0.1, -0.2, 0)),
];

function sampleKeys(list: THREE.Vector3[], p: number, out: THREE.Vector3) {
  for (let i = 0; i < CAM_KEYS.length - 1; i++) {
    if (p <= CAM_KEYS[i + 1] || i === CAM_KEYS.length - 2) {
      const t = smooth(CAM_KEYS[i], CAM_KEYS[i + 1], p);
      return out.copy(list[i]).lerp(list[i + 1], t);
    }
  }
  return out.copy(list[list.length - 1]);
}

/** Petroleum-blue pipeline connecting all stations, grown by scroll. */
function buildCurve() {
  const pts: THREE.Vector3[] = [];
  const base = (s: THREE.Vector3, i: number) =>
    s.clone().add(new THREE.Vector3(0, -SIZES[i] * 0.42, 0.35));
  pts.push(base(STATIONS[0], 0).add(new THREE.Vector3(-3.2, 0.2, 1.4)));
  STATIONS.forEach((s, i) => {
    pts.push(base(s, i));
    const next = STATIONS[i + 1];
    if (next) {
      const mid = base(s, i).lerp(base(next, i + 1), 0.5);
      mid.x += i % 2 ? -1.2 : 1.2;
      mid.y -= 1.1;
      pts.push(mid);
    }
  });
  pts.push(base(STATIONS[3], 3).add(new THREE.Vector3(2.6, -0.1, -0.8)));
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.35);
}

function Pipeline({ progress, curve }: { progress: MutableRefObject<number>; curve: THREE.CatmullRomCurve3 }) {
  const TUBE_SEG = 420;
  const RADIAL = 14;
  const outer = useMemo(() => new THREE.TubeGeometry(curve, TUBE_SEG, 0.06, RADIAL, false), [curve]);
  const total = outer.index ? outer.index.count : 0;
  const drawn = useRef(0);

  const PARTICLES = 46;
  const particles = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const flangeTs = useMemo(() => {
    const ts: number[] = [];
    for (let i = 1; i < 18; i++) ts.push(i / 18);
    return ts;
  }, []);
  const flanges = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = flanges.current;
    if (!mesh) return;
    const up = new THREE.Vector3(0, 0, 1);
    flangeTs.forEach((t, i) => {
      const p = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      dummy.position.copy(p);
      dummy.quaternion.setFromUnitVectors(up, tan);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [curve, dummy, flangeTs]);

  useFrame((state) => {
    const target = THREE.MathUtils.clamp(progress.current / (STEP_KEYS[3] + 0.04), 0, 1);
    drawn.current = THREE.MathUtils.lerp(drawn.current, target, 0.12);
    const d = drawn.current;
    outer.setDrawRange(0, Math.floor((total * d) / (RADIAL * 6)) * RADIAL * 6);

    const fl = flanges.current;
    if (fl) fl.count = flangeTs.filter((t) => t < d).length;

    const mesh = particles.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < PARTICLES; i++) {
      const t = (i / PARTICLES + time * 0.045) % 1;
      if (t > d - 0.004) {
        dummy.scale.setScalar(0);
      } else {
        dummy.position.copy(curve.getPointAt(t));
        dummy.scale.setScalar(0.75 + Math.sin(time * 6 + i) * 0.25);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={outer}>
        <meshStandardMaterial color={BLUE} metalness={0.35} roughness={0.32} />
      </mesh>
      <instancedMesh ref={flanges} args={[undefined, undefined, flangeTs.length]}>
        <cylinderGeometry args={[0.09, 0.09, 0.045, 20]} />
        <meshStandardMaterial color="#B8D0DE" metalness={0.6} roughness={0.3} />
      </instancedMesh>
      <instancedMesh ref={particles} args={[undefined, undefined, PARTICLES]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={SPARK} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/** Station node: glowing ring under each asset that lights up when reached. */
function StationNode({ index, progress }: { index: number; progress: MutableRefObject<number> }) {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const pos = STATIONS[index].clone().add(new THREE.Vector3(0, -SIZES[index] * 0.42, 0.35));
  useFrame((state) => {
    const a = smooth(STEP_KEYS[index] - 0.08, STEP_KEYS[index], progress.current);
    if (ring.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.08;
      ring.current.scale.setScalar((0.4 + a * 0.6) * pulse);
    }
    if (mat.current) mat.current.opacity = a * 0.6;
  });
  return (
    <mesh ref={ring} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.17, 0.23, 48]} />
      <meshBasicMaterial ref={mat} color={GLOW} transparent toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** One transparent isometric render, animated in with rotation, depth and elevation. */
function AssetPlane({
  index,
  texture,
  inputs,
}: {
  index: number;
  texture: THREE.Texture;
  inputs: SceneInputs;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const size = SIZES[index];
  const dir = index % 2 ? 1 : -1;

  useFrame((state) => {
    const g = group.current;
    if (!g || !mat.current) return;
    const p = inputs.progress.current;
    const a = smooth(STEP_KEYS[index] - 0.17, STEP_KEYS[index] - 0.01, p);
    const fin = smooth(STEP_KEYS[3] + 0.05, FINAL_KEY, p);
    const t = state.clock.elapsedTime;

    const isRefinery = index === 3;
    const finScale = isRefinery ? 1 + fin * 0.12 : 1 - fin * 0.2;
    // Once the camera moves on, earlier stations recede so the current one leads.
    const passed = isRefinery ? 0 : smooth(STEP_KEYS[index] + 0.07, STEP_KEYS[index] + 0.17, p);

    g.position.set(
      STATIONS[index].x,
      STATIONS[index].y - (1 - a) * 1.1 + Math.sin(t * 0.9 + index) * 0.035 * a,
      STATIONS[index].z - (1 - a) * 1.4
    );
    g.rotation.set(
      (1 - a) * 0.5,
      (1 - a) * 0.75 * dir + inputs.pointer.current.x * 0.07,
      (1 - a) * 0.12 * dir
    );
    g.scale.setScalar((0.55 + a * 0.45) * finScale);
    mat.current.opacity = a * (isRefinery ? 1 : (1 - passed * 0.85) * (1 - fin * 0.92));
  });

  return (
    <group ref={group}>
      <mesh renderOrder={index}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          ref={mat}
          map={texture}
          transparent
          alphaTest={0.02}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Rig({ inputs }: { inputs: SceneInputs }) {
  const { camera } = useThree();
  const smoothP = useRef(0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const ptr = useRef({ x: 0, y: 0 });

  useFrame(() => {
    smoothP.current = THREE.MathUtils.lerp(smoothP.current, inputs.progress.current, 0.1);
    ptr.current.x = THREE.MathUtils.lerp(ptr.current.x, inputs.pointer.current.x, 0.06);
    ptr.current.y = THREE.MathUtils.lerp(ptr.current.y, inputs.pointer.current.y, 0.06);
    sampleKeys(CAM_POS, smoothP.current, pos);
    sampleKeys(CAM_TARGET, smoothP.current, target);
    pos.x += ptr.current.x * 0.45;
    pos.y += ptr.current.y * 0.28;
    camera.position.copy(pos);
    camera.lookAt(target);
  });
  return null;
}

function World({ inputs }: { inputs: SceneInputs }) {
  const textures = useLoader(
    THREE.TextureLoader,
    mobilisationSteps.map((s) => s.texture)
  );
  const { gl } = useThree();
  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      t.generateMipmaps = true;
    });
  }, [textures, gl]);
  const curve = useMemo(() => buildCurve(), []);

  return (
    <>
      <Pipeline progress={inputs.progress} curve={curve} />
      {STATIONS.map((_, i) => (
        <StationNode key={`node-${i}`} index={i} progress={inputs.progress} />
      ))}
      {textures.map((tex, i) => (
        <AssetPlane key={`asset-${i}`} index={i} texture={tex} inputs={inputs} />
      ))}
    </>
  );
}

export default function MobilisationScene({
  inputs,
  running,
  onReady,
}: {
  inputs: SceneInputs;
  running: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ fov: 36, near: 0.1, far: 60, position: [0, 2, 9] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[-4, 8, 6]} intensity={1.6} />
      <directionalLight position={[5, 2, -4]} intensity={0.6} color="#B8D0DE" />
      <Rig inputs={inputs} />
      <Suspense fallback={null}>
        <World inputs={inputs} />
      </Suspense>
    </Canvas>
  );
}
