"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function Hourglass() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Animate rotation: speed up when hovered
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const speed = hovered ? 1.5 : 0.4;
      meshRef.current.rotation.y = time * speed;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[1.2, 1.2, 1.2]}
    >
      {/* Top Plate (Metal Gold) */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.12, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Bottom Plate (Metal Gold) */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.12, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Supporting Rods (Metal Gold) */}
      {[...Array(3)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 3;
        const radius = 0.85;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <cylinderGeometry args={[0.04, 0.04, 3, 16]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
          </mesh>
        );
      })}

      {/* Top Glass Bulb */}
      <mesh position={[0, 0.65, 0]}>
        <coneGeometry args={[0.7, 1.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          ior={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Bottom Glass Bulb */}
      <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.7, 1.2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          ior={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Central Connector Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Falling Sand particles / stream */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.7} />
      </mesh>

      {/* Sand inside bottom bulb */}
      <mesh position={[0, -1.05, 0]}>
        <coneGeometry args={[0.6, 0.7, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.8} />
      </mesh>

      {/* Sand inside top bulb */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 0.5, 32]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.8} />
      </mesh>
    </group>
  );
}

const count = 100;
const backgroundPositions = (() => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 15;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  return arr;
})();

function FloatingBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[backgroundPositions, 3]}
          count={count}
          array={backgroundPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#D4AF37" size={0.06} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

export default function PortalCanvas() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FDFBF7" castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#D4AF37" />
        <spotLight position={[0, 5, 0]} intensity={0.8} angle={Math.PI / 4} penumbra={1} color="#D4AF37" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Hourglass />
        </Float>
        
        <FloatingBackground />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3/4}
        />
      </Canvas>
    </div>
  );
}
