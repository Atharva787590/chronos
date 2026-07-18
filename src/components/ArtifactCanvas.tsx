"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

interface ArtifactProps {
  type: "laurel" | "astrolabe" | "core" | "coin";
}

function ArtifactModel({ type }: ArtifactProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Rotation animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const multiplier = hovered ? 2.5 : 1.0;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15 * multiplier;
    }

    if (type === "laurel") {
      // Laurel rotation: gentle tilt
      if (groupRef.current) {
        groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      }
    } else if (type === "astrolabe") {
      // Astrolabe rings: spin concentric rings at different speeds/axes
      if (ringRef1.current) ringRef1.current.rotation.z = time * 0.4 * multiplier;
      if (ringRef2.current) ringRef2.current.rotation.x = time * 0.6 * multiplier;
      if (ringRef3.current) ringRef3.current.rotation.y = -time * 0.3 * multiplier;
    } else if (type === "core") {
      // Core rotation: rapid spin
      if (groupRef.current) {
        groupRef.current.rotation.x = time * 0.5 * multiplier;
        groupRef.current.rotation.z = time * 0.3 * multiplier;
      }
    } else if (type === "coin") {
      // Coin rotation: spin on its y axis and tilt on x axis
      if (groupRef.current) {
        groupRef.current.rotation.y = time * 0.3 * multiplier;
        groupRef.current.rotation.x = 0.4 + Math.sin(time * 0.5) * 0.1;
      }
    }
  });

  if (type === "laurel") {
    return (
      <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Double-layered Laurel Wreath using Toruses and spheres */}
        <mesh>
          <torusGeometry args={[1.2, 0.08, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[1.1, 0.05, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Laurel "leaves" distributed around the ring */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 16;
          const r = 1.2;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          
          return (
            <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
              {/* Leaf shape 1 */}
              <mesh position={[0, 0.15, 0]} scale={[0.1, 0.2, 0.05]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Leaf shape 2 */}
              <mesh position={[0.08, 0.08, 0]} scale={[0.08, 0.16, 0.04]} rotation={[0, 0, -Math.PI / 4]}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          );
        })}

        {/* Central Crown Jewel */}
        <mesh position={[0, 1.2, 0.1]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>
    );
  }

  if (type === "astrolabe") {
    return (
      <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Outer Frame (Bronze/Gold) */}
        <mesh>
          <cylinderGeometry args={[1.4, 1.4, 0.08, 32]} />
          <meshStandardMaterial color="#AA8B2C" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Outer Ring */}
        <mesh>
          <torusGeometry args={[1.4, 0.06, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Concentric Ring 1 */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[1.1, 0.04, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
        
        {/* Concentric Ring 2 */}
        <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.8, 0.03, 16, 100]} />
          <meshStandardMaterial color="#FDFBF7" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Concentric Ring 3 */}
        <mesh ref={ringRef3} rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[0.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#AA8B2C" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Central Dial Pin */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} />
        </mesh>
        {/* Compass Pointer Hand */}
        <mesh position={[0, 0, 0.15]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.8, 0.06, 0.02]} />
          <meshStandardMaterial color="#FDFBF7" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    );
  }

  if (type === "core") {
    return (
      <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Inner Glowing Crystal */}
        <mesh>
          <dodecahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={1.8}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Wireframe overlay for technical look */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <dodecahedronGeometry args={[0.5]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.6} />
        </mesh>

        {/* Surrounding cage ring (vertical) */}
        <mesh>
          <torusGeometry args={[0.9, 0.04, 16, 100]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Surrounding cage ring (horizontal) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.92, 0.03, 16, 100]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Floating orbit modules (small boxes) */}
        {[...Array(4)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 4;
          const r = 1.1;
          const x = Math.cos(angle) * r;
          const z = Math.sin(angle) * r;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#0891b2"
                emissiveIntensity={1}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })}
      </group>
    );
  }

  if (type === "coin") {
    return (
      <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Main Coin Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.08, 32]} />
          <meshStandardMaterial color="#D97706" metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Raised Rim Front */}
        <mesh position={[0, 0, 0.045]}>
          <torusGeometry args={[0.95, 0.03, 16, 100]} />
          <meshStandardMaterial color="#EA580C" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Raised Rim Back */}
        <mesh position={[0, 0, -0.045]}>
          <torusGeometry args={[0.95, 0.03, 16, 100]} />
          <meshStandardMaterial color="#EA580C" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Dharma Chakra Center Hub */}
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Dharma Chakra Spokes (8 spokes) */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI) / 4;
          return (
            <mesh
              key={i}
              position={[0, 0, 0.04]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.04, 0.8, 0.02]} />
              <meshStandardMaterial color="#EA580C" metalness={0.9} roughness={0.2} />
            </mesh>
          );
        })}

        {/* Ashoka Lion Silhouette Representation Center */}
        <mesh position={[0, 0, 0.055]}>
          <octahedronGeometry args={[0.1]} />
          <meshStandardMaterial color="#FAF8F5" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  return null;
}

export default function ArtifactCanvas({ type }: ArtifactProps) {
  return (
    <div className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} color="#FDFBF7" />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#D4AF37" />
        
        {/* Selective lighting to enhance cyberpunk and ancient gold glow */}
        {type === "core" && (
          <pointLight position={[0, 0, 0]} intensity={2.5} color="#22d3ee" distance={4} />
        )}
        {type === "coin" && (
          <pointLight position={[0, 0, 0.8]} intensity={1.8} color="#EA580C" distance={3} />
        )}

        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
          <ArtifactModel type={type} />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

