'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  color: string;
  count?: number;
}

const Particles = ({ color, count = 100 }: ParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create vertical flowing stream pattern
      positions[i * 3] = (Math.random() - 0.5) * 3; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // z
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        // Flow upward
        positions[i * 3 + 1] += 0.02;

        // Reset to bottom when reaching top
        if (positions[i * 3 + 1] > 4) {
          positions[i * 3 + 1] = -4;
        }

        // Subtle wave motion
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      // Rotate entire particle system slowly
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface DataFlowParticlesProps {
  color?: string;
  intensity?: number;
}

export default function DataFlowParticles({ color = '#06b6d4', intensity = 1 }: DataFlowParticlesProps) {
  const particleCount = Math.floor(100 * intensity);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Particles color={color} count={particleCount} />
      </Canvas>
    </div>
  );
}
