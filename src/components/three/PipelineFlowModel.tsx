'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Torus, Sphere, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface PipelineFlowModelProps {
  currentStep?: number;
  progress?: number;
}

// Main pipeline tube component
const PipelineTube = ({ currentStep = 0 }: { currentStep: number }) => {
  const tubeRef = useRef<THREE.Mesh>(null);

  // Create tube geometry
  const tubeGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.8, 0.8, 12, 32, 1, true);
  }, []);

  // Step colors
  const stepColors = [
    new THREE.Color('#ef4444'), // Red
    new THREE.Color('#8b5cf6'), // Purple
    new THREE.Color('#06b6d4'), // Cyan
    new THREE.Color('#8b5cf6'), // Purple
    new THREE.Color('#10b981'), // Green
    new THREE.Color('#f59e0b'), // Amber
    new THREE.Color('#f97316'), // Orange
    new THREE.Color('#06b6d4'), // Cyan
  ];

  useFrame((state) => {
    if (tubeRef.current) {
      // Slow rotation
      tubeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={tubeRef} geometry={tubeGeometry}>
      <MeshTransmissionMaterial
        transmission={0.9}
        thickness={0.5}
        roughness={0.1}
        chromaticAberration={0.03}
        anisotropy={0.3}
        color={stepColors[currentStep]}
        emissive={stepColors[currentStep]}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Node station component
const NodeStation = ({
  position,
  color,
  active,
  stepNumber
}: {
  position: [number, number, number];
  color: string;
  active: boolean;
  stepNumber: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      // Pulse when active
      const scale = active ? 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1 : 1;
      ringRef.current.scale.setScalar(scale);
    }

    if (glowRef.current && active) {
      // Pulsing glow
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Main ring */}
      <Torus ref={ringRef} args={[1.2, 0.15, 16, 32]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>

      {/* Glow sphere */}
      {active && (
        <Sphere ref={glowRef} args={[0.3, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </Sphere>
      )}

      {/* Step number */}
      <mesh position={[0, 0, 0.05]}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial
            color={active ? color : '#444'}
            emissive={active ? color : '#000'}
            emissiveIntensity={active ? 0.5 : 0}
          />
        </Sphere>
      </mesh>

      {/* Point light for glow */}
      <pointLight color={color} intensity={active ? 2 : 0.5} distance={3} />
    </group>
  );
};

// Flowing particles component
const FlowingParticles = ({ currentStep }: { currentStep: number }) => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 200;

  // Step colors
  const stepColors = [
    '#ef4444', '#8b5cf6', '#06b6d4', '#8b5cf6',
    '#10b981', '#f59e0b', '#f97316', '#06b6d4',
  ];

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 0.6,
          -6 + t * 12,
          (Math.random() - 0.5) * 0.6
        ),
        speed: 0.02 + Math.random() * 0.03,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        // Update position
        particle.position.y += particle.speed * (1 + currentStep * 0.2);

        // Reset to bottom when reaching top
        if (particle.position.y > 6) {
          particle.position.y = -6;
        }

        // Update instance matrix
        const matrix = new THREE.Matrix4();
        matrix.setPosition(particle.position);
        particlesRef.current!.setMatrixAt(i, matrix);
      });

      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial
        color={stepColors[currentStep]}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
};

// Main scene component
const Scene = ({ currentStep, progress }: PipelineFlowModelProps) => {
  // Calculate node positions (8 stations along vertical axis)
  const nodePositions: [number, number, number][] = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => [
      0,
      5 - (i * 1.5), // Spread from top to bottom
      0,
    ]);
  }, []);

  const stepColors = [
    '#ef4444', '#8b5cf6', '#06b6d4', '#8b5cf6',
    '#10b981', '#f59e0b', '#f97316', '#06b6d4',
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[4, 2, 6]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={1}
        color={stepColors[currentStep || 0]}
      />

      {/* Main pipeline tube */}
      <PipelineTube currentStep={currentStep || 0} />

      {/* Node stations */}
      {nodePositions.map((pos, i) => (
        <NodeStation
          key={i}
          position={pos}
          color={stepColors[i]}
          active={i === (currentStep || 0)}
          stepNumber={i + 1}
        />
      ))}

      {/* Flowing particles */}
      <FlowingParticles currentStep={currentStep || 0} />

      {/* Background grid */}
      <gridHelper args={[20, 20, '#333', '#222']} position={[0, -6, 0]} />
    </>
  );
};

export default function PipelineFlowModel({ currentStep = 0, progress = 0 }: PipelineFlowModelProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene currentStep={currentStep} progress={progress} />
      </Canvas>
    </div>
  );
}
