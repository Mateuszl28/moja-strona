"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function DistortShape() {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#ec4899"
          emissiveIntensity={0.4}
          roughness={0.25}
          metalness={0.6}
          distort={0.45}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function SmallOrbs() {
  const colors = ["#ec4899", "#f97316", "#3b82f6"];
  return (
    <>
      {colors.map((c, i) => (
        <Float
          key={i}
          speed={2 + i * 0.5}
          rotationIntensity={0.3}
          floatIntensity={2}
          position={[
            Math.cos((i / colors.length) * Math.PI * 2) * 2.6,
            Math.sin((i / colors.length) * Math.PI * 2) * 1.2,
            -0.5,
          ]}
        >
          <mesh scale={0.18}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroSceneClient() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a855f7" />
      <directionalLight position={[-5, -3, 2]} intensity={0.8} color="#ec4899" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#f97316" />

      <DistortShape />
      <SmallOrbs />
    </Canvas>
  );
}
