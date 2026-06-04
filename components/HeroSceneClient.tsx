"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

/* ---- realne obiekty: biurko dewelopera ---- */

function Laptop() {
  return (
    <group rotation={[0, -0.5, 0]} position={[0, -0.1, 0]}>
      {/* podstawa */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.12, 1.5]} />
        <meshStandardMaterial color="#3b3b43" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* klawiatura */}
      <mesh position={[0, 0.067, 0.12]}>
        <boxGeometry args={[1.95, 0.02, 1.1]} />
        <meshStandardMaterial color="#202027" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* touchpad */}
      <mesh position={[0, 0.072, 0.58]}>
        <boxGeometry args={[0.62, 0.012, 0.36]} />
        <meshStandardMaterial color="#2a2a31" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* ekran (zawias z tyłu) */}
      <group position={[0, 0.06, -0.74]} rotation={[-1.86, 0, 0]}>
        {/* obudowa ekranu */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[2.2, 1.4, 0.08]} />
          <meshStandardMaterial color="#35353d" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* wyświetlacz */}
        <mesh position={[0, 0.7, 0.05]}>
          <boxGeometry args={[2.0, 1.22, 0.01]} />
          <meshStandardMaterial
            color="#16161b"
            emissive="#e0a96d"
            emissiveIntensity={0.28}
            roughness={0.25}
          />
        </mesh>
        {/* linijki "kodu" na ekranie */}
        {[
          { y: 1.15, w: 1.3, x: -0.25 },
          { y: 1.0, w: 0.8, x: -0.5 },
          { y: 0.85, w: 1.1, x: -0.35 },
          { y: 0.7, w: 0.6, x: -0.6 },
          { y: 0.55, w: 1.0, x: -0.4 },
          { y: 0.4, w: 0.7, x: -0.55 },
          { y: 0.25, w: 1.2, x: -0.3 },
        ].map((l, i) => (
          <mesh key={i} position={[l.x, l.y, 0.057]}>
            <boxGeometry args={[l.w, 0.05, 0.005]} />
            <meshStandardMaterial
              color="#e0a96d"
              emissive="#e0a96d"
              emissiveIntensity={0.6}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Mug() {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group position={[1.85, -0.18, 0.55]} rotation={[0, 0.4, 0]}>
        {/* korpus */}
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.27, 0.55, 32]} />
          <meshStandardMaterial color="#d0905a" roughness={0.55} metalness={0.05} />
        </mesh>
        {/* kawa */}
        <mesh position={[0, 0.27, 0]}>
          <cylinderGeometry args={[0.27, 0.27, 0.02, 32]} />
          <meshStandardMaterial color="#2a1a12" roughness={0.3} />
        </mesh>
        {/* uchwyt */}
        <mesh position={[0.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.17, 0.045, 16, 32]} />
          <meshStandardMaterial color="#c4824f" roughness={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

function Books() {
  const books = [
    { y: -0.31, w: 1.0, d: 0.7, h: 0.16, color: "#3a4150", rot: 0.05 },
    { y: -0.15, w: 0.92, d: 0.66, h: 0.14, color: "#b87a49", rot: -0.08 },
    { y: -0.01, w: 0.84, d: 0.62, h: 0.13, color: "#cbb89a", rot: 0.03 },
  ];
  return (
    <group position={[-1.95, -0.05, 0.3]}>
      {books.map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]} rotation={[0, b.rot, 0]} castShadow>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color={b.color} roughness={0.8} metalness={0} />
        </mesh>
      ))}
      {/* mała roślinka na książkach */}
      <group position={[0, 0.18, 0]}>
        {/* doniczka */}
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.12, 0.22, 24]} />
          <meshStandardMaterial color="#9c5b3b" roughness={0.7} />
        </mesh>
        {/* liście */}
        {[
          [0, 0.22, 0],
          [0.1, 0.18, 0.05],
          [-0.09, 0.19, -0.04],
          [0.04, 0.16, -0.1],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} castShadow>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="#4f7a52" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Desk() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      // spokojne kołysanie zamiast pełnego obrotu
      ref.current.rotation.y = Math.sin(t * 0.25) * 0.35;
      ref.current.position.y = Math.sin(t * 0.6) * 0.04;
    }
  });

  return (
    <group ref={ref}>
      <Laptop />
      <Mug />
      <Books />
    </group>
  );
}

export default function HeroSceneClient() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      {/* ciepłe światło kluczowe */}
      <directionalLight position={[4, 6, 4]} intensity={1.4} color="#fff1e0" />
      {/* miękkie wypełnienie */}
      <directionalLight position={[-5, 3, -2]} intensity={0.5} color="#cdd6e6" />
      {/* delikatny akcent od ekranu */}
      <pointLight position={[0, 0.8, 1.5]} intensity={0.6} color="#e0a96d" />

      <Desk />

      <ContactShadows
        position={[0, -0.55, 0]}
        opacity={0.45}
        scale={9}
        blur={2.4}
        far={4}
        color="#000000"
      />
    </Canvas>
  );
}
