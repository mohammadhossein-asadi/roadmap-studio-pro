"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import constellationData from "@/data/tech-constellations.json";

function TechPlanet({
  position,
  name,
  color,
  size,
}: {
  position: [number, number, number];
  name: string;
  color: string;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={ref}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </mesh>
        <Text
          position={[0, size + 0.15, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {name}
        </Text>
      </group>
    </Float>
  );
}

function ConnectionLines() {
  const lineObjects = useMemo(() => {
    const nodeMap = new Map(
      constellationData.nodes.map((n) => [n.id, n])
    );

    const lines: THREE.Line[] = [];
    constellationData.nodes.forEach((node) => {
      node.connections
        .filter((connId) => nodeMap.has(connId))
        .filter((connId) => node.id < connId)
        .forEach((connId) => {
          const target = nodeMap.get(connId)!;
          const points = [
            new THREE.Vector3(...node.position as [number, number, number]),
            new THREE.Vector3(...target.position as [number, number, number]),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: "#8b5cf6", transparent: true, opacity: 0.3 });
          lines.push(new THREE.Line(geometry, material));
        });
    });
    return lines;
  }, []);

  return (
    <>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </>
  );
}

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export function UniverseGalaxy() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />

        <RotatingGroup>
          <ConnectionLines />
          {constellationData.nodes.map((node) => (
            <TechPlanet
              key={node.id}
              position={node.position as [number, number, number]}
              name={node.name}
              color={node.color}
              size={node.size}
            />
          ))}
        </RotatingGroup>
      </Canvas>
    </div>
  );
}
