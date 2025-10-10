'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, OrbitControls, PerspectiveCamera, Icosahedron, Cylinder, Cone, Edges } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface EngineAssemblyProps {
  currentStep?: number;
  progress?: number;
}

// Central engine core - always visible
const EngineCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Sphere ref={coreRef} args={[0.6, 32, 32]}>
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
      <pointLight intensity={1} distance={5} color="#06b6d4" />
    </Sphere>
  );
};

// Shield Array Component (Step 1)
const ShieldArray = ({ assembled }: { assembled: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const panelCount = 12;

  useEffect(() => {
    if (groupRef.current) {
      if (assembled) {
        gsap.to(groupRef.current.position, {
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to(groupRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: 'back.out(1.7)',
        });
      } else {
        gsap.to(groupRef.current.position, {
          y: 5,
          duration: 0.8,
          ease: 'power2.in',
        });
        gsap.to(groupRef.current.scale, {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          duration: 0.8,
          ease: 'power2.in',
        });
      }
    }
  }, [assembled]);

  useFrame((state) => {
    if (groupRef.current && assembled) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Calculate hexagonal positions
  const panels = useMemo(() => {
    return Array.from({ length: panelCount }, (_, i) => {
      const angle = (i / panelCount) * Math.PI * 2;
      const radius = 2;
      return {
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
        rotation: [0, -angle, 0] as [number, number, number],
      };
    });
  }, []);

  return (
    <group
      ref={groupRef}
      position={assembled ? [0, 0, 0] : [0, 5, 0]}
      scale={assembled ? 1 : 0.5}
    >
      {panels.map((panel, i) => (
        <Box key={i} args={[0.4, 1.5, 0.05]} position={panel.position} rotation={panel.rotation}>
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={assembled ? 0.4 : 0.1}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={assembled ? 0.8 : 0.3}
          />
          <Edges color="#ff6b6b" />
        </Box>
      ))}
    </group>
  );
};

// Intent Processor Component (Step 2)
const IntentProcessor = ({ assembled }: { assembled: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      if (assembled) {
        gsap.to(groupRef.current.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        });
        gsap.to(groupRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: 'back.out(1.5)',
          delay: 0.2,
        });
      } else {
        gsap.to(groupRef.current.position, {
          x: -4,
          y: 2,
          z: 0,
          duration: 0.8,
          ease: 'power2.in',
        });
        gsap.to(groupRef.current.scale, {
          x: 0.6,
          y: 0.6,
          z: 0.6,
          duration: 0.8,
          ease: 'power2.in',
        });
      }
    }
  }, [assembled]);

  useFrame((state) => {
    if (groupRef.current && assembled) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.y = state.clock.elapsedTime * (0.5 + i * 0.2);
      });
    }
  });

  return (
    <group
      ref={groupRef}
      position={assembled ? [0, 0, 0] : [-4, 2, 0]}
      scale={assembled ? 1 : 0.6}
    >
      {/* 3 nested rings */}
      <Torus args={[1.2, 0.08, 16, 32]}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={assembled ? 0.6 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>
      <Torus args={[1.0, 0.06, 16, 32]}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={assembled ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>
      <Torus args={[0.8, 0.04, 16, 32]}>
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#c4b5fd"
          emissiveIntensity={assembled ? 0.4 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>
      {assembled && <pointLight intensity={0.8} distance={3} color="#8b5cf6" />}
    </group>
  );
};

// Data Core Component (Step 3)
const DataCore = ({ assembled }: { assembled: boolean }) => {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current && assembled) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Icosahedron
      ref={coreRef}
      args={[0.8, 0]}
      position={assembled ? [0, 0, 0] : [4, 2, 0]}
      scale={assembled ? 1 : 0.5}
    >
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={assembled ? 0.7 : 0.2}
        metalness={0.9}
        roughness={0.1}
        wireframe={!assembled}
        transparent
        opacity={assembled ? 1 : 0.4}
      />
      <Edges color="#22d3ee" />
      {assembled && <pointLight intensity={0.8} distance={3} color="#06b6d4" />}
    </Icosahedron>
  );
};

// Execution Module Component (Step 5)
const ExecutionModule = ({ assembled }: { assembled: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gearRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gearRef.current && assembled) {
      gearRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group
      ref={groupRef}
      position={assembled ? [0, -1.5, 0] : [0, -5, 0]}
      scale={assembled ? 1 : 0.6}
    >
      {/* Gear */}
      <Cylinder ref={gearRef} args={[0.6, 0.6, 0.3, 8]}>
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={assembled ? 0.5 : 0.2}
          metalness={0.9}
          roughness={0.3}
        />
        <Edges color="#34d399" />
      </Cylinder>
      {/* Pistons */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
        <Cylinder
          key={i}
          args={[0.1, 0.1, 0.8, 8]}
          position={[Math.cos(angle) * 0.7, 0, Math.sin(angle) * 0.7]}
          rotation={[Math.PI / 2, 0, angle]}
        >
          <meshStandardMaterial
            color="#059669"
            emissive="#059669"
            emissiveIntensity={assembled ? 0.3 : 0.1}
            metalness={0.8}
            roughness={0.4}
          />
        </Cylinder>
      ))}
      {assembled && <pointLight intensity={0.6} distance={3} color="#10b981" />}
    </group>
  );
};

// Approval Gateway Component (Step 6)
const ApprovalGateway = ({ assembled }: { assembled: boolean }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current && ring2Ref.current && assembled) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.8;
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <group position={assembled ? [0, 0, 0] : [-3, -3, 0]} scale={assembled ? 1 : 0.5}>
      <Torus ref={ring1Ref} args={[1.4, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={assembled ? 0.6 : 0.2}
          metalness={0.9}
          roughness={0.2}
        />
      </Torus>
      <Torus ref={ring2Ref} args={[1.6, 0.08, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={assembled ? 0.5 : 0.2}
          metalness={0.9}
          roughness={0.2}
        />
      </Torus>
      {assembled && <pointLight intensity={0.7} distance={3} color="#f59e0b" />}
    </group>
  );
};

// Response Generator Component (Step 8)
const ResponseGenerator = ({ assembled }: { assembled: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && assembled) {
      groupRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={assembled ? [0, 1.5, 0] : [0, -6, 0]}
      scale={assembled ? 1 : 0.5}
    >
      {/* Communication array */}
      {[0, 1, 2, 3].map((i) => (
        <Cone
          key={i}
          args={[0.15, 0.6, 8]}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.5,
            0,
            Math.sin((i / 4) * Math.PI * 2) * 0.5,
          ]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={assembled ? 0.8 : 0.2}
            metalness={0.9}
            roughness={0.1}
          />
        </Cone>
      ))}
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={assembled ? 1 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      {assembled && <pointLight intensity={1} distance={4} color="#06b6d4" />}
    </group>
  );
};

// Main scene component
const Scene = ({ currentStep = 0, progress = 0 }: EngineAssemblyProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Central Core - Always visible */}
      <EngineCore />

      {/* Component Assembly - Appears progressively */}
      <ShieldArray assembled={currentStep >= 0} />
      <IntentProcessor assembled={currentStep >= 1} />
      <DataCore assembled={currentStep >= 2} />
      <ExecutionModule assembled={currentStep >= 4} />
      <ApprovalGateway assembled={currentStep >= 5} />
      <ResponseGenerator assembled={currentStep >= 7} />

      {/* Background grid */}
      <gridHelper args={[20, 20, '#333', '#222']} position={[0, -3, 0]} />
    </>
  );
};

export default function EngineAssembly({ currentStep = 0, progress = 0 }: EngineAssemblyProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
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
