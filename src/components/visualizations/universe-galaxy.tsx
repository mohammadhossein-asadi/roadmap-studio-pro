"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text, Line } from "@react-three/drei";
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

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  return (
    <Line
      points={[start, end]}
      color="#8b5cf6"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}

function ConnectionLines() {
  const edges = useMemo(() => {
    const nodeMap = new Map(
      constellationData.nodes.map((n) => [n.id, n])
    );

    const result: { start: [number, number, number]; end: [number, number, number] }[] = [];
    constellationData.nodes.forEach((node) => {
      node.connections
        .filter((connId) => nodeMap.has(connId))
        .filter((connId) => node.id < connId)
        .forEach((connId) => {
          const target = nodeMap.get(connId)!;
          result.push({
            start: node.position as [number, number, number],
            end: target.position as [number, number, number],
          });
        });
    });
    return result;
  }, []);

  return (
    <>
      {edges.map((edge, i) => (
        <ConnectionLine key={i} start={edge.start} end={edge.end} />
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
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }} style={{ background: "#050510" }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
        <Stars radius={50} depth={50} count={3000} factor={3} saturation={0} fade={true} speed={0.5} />

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
