"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Helix() {
  const groupRef = useRef<THREE.Group>(null);
  const strandCount = 60;
  const radius = 0.5;
  const height = 4;
  const turns = 3;

  const { strand1Line, strand2Line } = useMemo(() => {
    const p1: THREE.Vector3[] = [];
    const p2: THREE.Vector3[] = [];
    for (let i = 0; i <= strandCount; i++) {
      const t = i / strandCount;
      const angle = t * turns * Math.PI * 2;
      p1.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * height,
          Math.sin(angle) * radius
        )
      );
      p2.push(
        new THREE.Vector3(
          Math.cos(angle + Math.PI) * radius,
          (t - 0.5) * height,
          Math.sin(angle + Math.PI) * radius
        )
      );
    }
    return {
      strand1Line: new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(p1),
        new THREE.LineBasicMaterial({ color: "#8b5cf6" })
      ),
      strand2Line: new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(p2),
        new THREE.LineBasicMaterial({ color: "#ec4899" })
      ),
    };
  }, []);

  const rungs = useMemo(() => {
    const r: { mid: THREE.Vector3; len: number; color: string; rotation: number }[] = [];
    const colors = ["#8b5cf6", "#ec4899", "#06b6d4", "#22c55e"];
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
      const dir = new THREE.Vector3().subVectors(end, start);
      r.push({
        mid,
        len: dir.length(),
        color: colors[Math.floor(i / 4) % colors.length],
        rotation: Math.atan2(dir.y, dir.x),
      });
    }
    return r;
  }, []);

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

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={strand1Line} />
      <primitive object={strand2Line} />

      {rungs.map((rung, i) => (
        <mesh key={`rung-${i}`} position={rung.mid}>
          <cylinderGeometry args={[0.008, 0.008, rung.len, 6]} />
          <meshStandardMaterial
            color={rung.color}
            emissive={rung.color}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      ))}

      {strand1Points.map((point, i) => (
        <mesh key={`s1-${i}`} position={point}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}

      {strand2Points.map((point, i) => (
        <mesh key={`s2-${i}`} position={point}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#ec4899"
            emissiveIntensity={2}
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
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Helix />
      </Canvas>
    </div>
  );
}
