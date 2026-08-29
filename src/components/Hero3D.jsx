import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * GeometricShape: Inner 3D mesh rendering a metallic/glass abstract shape
 */
function AbstractMesh({ color = '#447244' }) {
  const meshRef = useRef(null);
  const ringRef = useRef(null);
  const outerRingRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.25;
      ringRef.current.rotation.z += delta * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.2;
      outerRingRef.current.rotation.x += delta * 0.15;
    }
  });

  const parsedColor = useMemo(() => new THREE.Color(color || '#447244'), [color]);

  return (
    <group>
      {/* Floating Core TorusKnot */}
      <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.8} floatingRange={[-0.12, 0.12]}>
        <mesh ref={meshRef} scale={1.05}>
          <torusKnotGeometry args={[0.9, 0.32, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color={parsedColor}
            emissive={parsedColor}
            emissiveIntensity={0.15}
            roughness={0.18}
            metalness={0.88}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        </mesh>

        {/* Orbiting Orbital Ring 1 */}
        <mesh ref={ringRef} scale={1.65}>
          <torusGeometry args={[1.1, 0.025, 24, 64]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.95}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Orbiting Orbital Ring 2 */}
        <mesh ref={outerRingRef} scale={1.9}>
          <torusGeometry args={[1.05, 0.018, 20, 64]} />
          <meshStandardMaterial
            color={parsedColor}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Hero3D: Responsive 3D Canvas for Hero section
 */
export default function Hero3D({ accentColor = '#447244', className = '' }) {
  return (
    <div
      className={`relative w-full h-[260px] sm:h-[320px] md:h-[380px] flex items-center justify-center select-none pointer-events-none sm:pointer-events-auto overflow-visible ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        {/* Subtle Ambient & Directional Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-6, -4, -3]} intensity={0.6} color={accentColor} />
        <pointLight position={[0, 0, 3]} intensity={0.8} color={accentColor} />

        {/* Abstract 3D Object */}
        <AbstractMesh color={accentColor} />
      </Canvas>
    </div>
  );
}
