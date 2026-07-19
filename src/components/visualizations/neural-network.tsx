"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface Neuron {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  connections: number[];
  active: boolean;
}

function NeuronParticle({
  position,
  color,
  scale,
}: {
  position: THREE.Vector3;
  color: string;
  scale: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

function NeuralParticles({ count = 40 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const neurons = useMemo(() => {
    const ns: Neuron[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.5 + Math.random() * 0.5;
      ns.push({
        position: new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        connections: [],
        active: Math.random() > 0.6,
      });
    }

    ns.forEach((n, i) => {
      ns.forEach((m, j) => {
        if (i !== j && n.position.distanceTo(m.position) < 0.8) {
          n.connections.push(j);
        }
      });
    });

    return ns;
  }, [count]);

  const scales = useRef<number[]>(neurons.map(() => 1));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const children = groupRef.current.children;
    neurons.forEach((n, i) => {
      n.position.add(n.velocity);
      if (n.position.length() > 2.5) n.velocity.multiplyScalar(-1);

      const pulse = n.active ? Math.sin(t * 3 + i) * 0.1 + 1 : 0.8;
      scales.current[i] = pulse * 0.06;

      if (children[i]) {
        children[i].position.copy(n.position);
        children[i].scale.setScalar(scales.current[i]);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {neurons.map((n, i) => (
        <NeuronParticle
          key={i}
          position={n.position}
          color={n.active ? "#8b5cf6" : "#3b82f6"}
          scale={0.06}
        />
      ))}
    </group>
  );
}

function EnergyFlow() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function NeuralNetwork() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }} style={{ background: "#050510" }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#8b5cf6" />
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <NeuralParticles />
          <EnergyFlow />
        </Float>
      </Canvas>
    </div>
  );
}
