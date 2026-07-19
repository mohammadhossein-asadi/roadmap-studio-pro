"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// Site palette: violet, indigo, cyan, purple
const STRAND_1_COLOR = "#8b5cf6"; // violet-500
const STRAND_2_COLOR = "#6366f1"; // indigo-500
const RUNG_COLORS = ["#8b5cf6", "#6366f1", "#06b6d4", "#a855f7"]; // violet, indigo, cyan, purple

function Strand({ points, color }: { points: THREE.Vector3[]; color: string }) {
  return (
    <Line
      points={points}
      color={color}
      lineWidth={2.5}
    />
  );
}

function Helix() {
  const groupRef = useRef<THREE.Group>(null);
  const strandCount = 60;
  const radius = 0.5;
  const height = 4;
  const turns = 3;

  const strand1Points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= strandCount; i++) {
      const t = i / strandCount;
      const angle = t * turns * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * height,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, []);

  const strand2Points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= strandCount; i++) {
      const t = i / strandCount;
      const angle = t * turns * Math.PI * 2 + Math.PI;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * height,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, []);

  const rungs = useMemo(() => {
    const r: { mid: THREE.Vector3; len: number; color: string; quaternion: THREE.Quaternion }[] = [];
    const up = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    for (let i = 0; i < strandCount; i += 4) {
      const t = i / strandCount;
      const angle = t * turns * Math.PI * 2;
      const start = new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * height,
        Math.sin(angle) * radius
      );
      const end = new THREE.Vector3(
        Math.cos(angle + Math.PI) * radius,
        (t - 0.5) * height,
        Math.sin(angle + Math.PI) * radius
      );
      const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
      dir.subVectors(end, start).normalize();
      quat.setFromUnitVectors(up, dir);

      r.push({
        mid,
        len: start.distanceTo(end),
        color: RUNG_COLORS[Math.floor(i / 4) % RUNG_COLORS.length],
        quaternion: quat.clone(),
      });
    }
    return r;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Strand points={strand1Points} color={STRAND_1_COLOR} />
      <Strand points={strand2Points} color={STRAND_2_COLOR} />

      {rungs.map((rung, i) => {
        const euler = new THREE.Euler().setFromQuaternion(rung.quaternion);
        return (
          <mesh key={`rung-${i}`} position={rung.mid} rotation={euler}>
            <cylinderGeometry args={[0.01, 0.01, rung.len, 8]} />
            <meshStandardMaterial
              color={rung.color}
              emissive={rung.color}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {strand1Points.map((point, i) => (
        <mesh key={`s1-${i}`} position={point}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial
            color={STRAND_1_COLOR}
            emissive={STRAND_1_COLOR}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      ))}

      {strand2Points.map((point, i) => (
        <mesh key={`s2-${i}`} position={point}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial
            color={STRAND_2_COLOR}
            emissive={STRAND_2_COLOR}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function DnaHelix() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} style={{ background: "#050510" }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#8b5cf6" />
        <pointLight position={[-5, -3, 3]} intensity={1} color="#6366f1" />
        <Helix />
      </Canvas>
    </div>
  );
}
