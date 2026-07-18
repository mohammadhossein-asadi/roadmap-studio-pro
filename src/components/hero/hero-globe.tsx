"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function TechNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const pts: { pos: [number, number, number]; color: string; size: number }[] = [];
    const colors = ["#38bdf8", "#a855f7", "#22c55e", "#f97316", "#ec4899", "#06b6d4"];
    for (let i = 0; i < 30; i++) {
      const phi = Math.acos(-1 + (2 * i) / 30);
      const theta = Math.sqrt(30 * Math.PI) * phi;
      pts.push({
        pos: [
          2.2 * Math.cos(theta) * Math.sin(phi),
          2.2 * Math.sin(theta) * Math.sin(phi),
          2.2 * Math.cos(phi),
        ],
        color: colors[i % colors.length],
        size: 0.03 + Math.random() * 0.04,
      });
    }
    return pts;
  }, []);

  const edgeObjects = useMemo(() => {
    const lines: THREE.Line[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].pos[0] - nodes[j].pos[0];
        const dy = nodes[i].pos[1] - nodes[j].pos[1];
        const dz = nodes[i].pos[2] - nodes[j].pos[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.2) {
          const points = [
            new THREE.Vector3(...nodes[i].pos),
            new THREE.Vector3(...nodes[j].pos),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.1 });
          lines.push(new THREE.Line(geometry, material));
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
      {edgeObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

function WireGlobe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2, 2]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export function HeroGlobe() {
  return (
    <div className="relative h-[400px] w-full md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <WireGlobe />
          <TechNodes />
        </Float>
      </Canvas>
    </div>
  );
}
