'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Box, OrbitControls, PerspectiveCamera, Cylinder, Torus, Edges, Environment, AccumulativeShadows, RandomizedLight, SpotLight, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';

interface EngineAssemblyProps {
  currentStep?: number;
  progress?: number;
}

// Step 1: Oil Pan - Rectangular base with bolt heads
const OilPan = ({ assembled }: { assembled: boolean }) => {
  const panRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (panRef.current) {
      if (assembled) {
        gsap.to(panRef.current.position, {
          y: -2,
          duration: 2.5,
          ease: 'power1.inOut',
        });
        gsap.to(panRef.current.rotation, {
          x: 0,
          duration: 2.5,
          ease: 'power1.inOut',
        });
      } else {
        gsap.to(panRef.current.position, {
          y: -6,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  return (
    <group ref={panRef} position={[0, assembled ? -2 : -6, 0]}>
      {/* Main pan body */}
      <Box args={[3, 0.3, 2]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.7}
          envMapIntensity={1.8}
        />
      </Box>

      {/* Bolt heads at corners */}
      {[
        [-1.4, 0.15, -0.9],
        [1.4, 0.15, -0.9],
        [-1.4, 0.15, 0.9],
        [1.4, 0.15, 0.9],
      ].map((pos, i) => (
        <Cylinder key={i} args={[0.08, 0.08, 0.1, 6]} position={pos as [number, number, number]} castShadow>
          <meshStandardMaterial color="#444" metalness={0.95} roughness={0.3} envMapIntensity={2.0} />
        </Cylinder>
      ))}

      {/* Ribs for structural detail */}
      {[-0.6, 0, 0.6].map((z, i) => (
        <Box key={`rib-${i}`} args={[2.8, 0.15, 0.1]} position={[0, 0.2, z]} castShadow>
          <meshStandardMaterial color="#222" metalness={0.85} roughness={0.6} envMapIntensity={1.5} />
        </Box>
      ))}
    </group>
  );
};

// Step 2: V-shaped Engine Block with cylinder bores
const EngineBlock = ({ assembled }: { assembled: boolean }) => {
  const blockRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (blockRef.current) {
      if (assembled) {
        gsap.to(blockRef.current.position, {
          y: -1,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 0.3,
        });
      } else {
        gsap.to(blockRef.current.position, {
          y: 4,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  // 4 cylinders per bank
  const cylinderPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 4; i++) {
      const z = -1.2 + i * 0.8;
      positions.push({ side: 'left', z });
      positions.push({ side: 'right', z });
    }
    return positions;
  }, []);

  return (
    <group ref={blockRef} position={[0, assembled ? -1 : 4, 0]}>
      {/* Left bank */}
      <group rotation={[0, 0, Math.PI / 12]} position={[-0.6, 0, 0]}>
        <Box args={[0.8, 1.5, 3.5]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.7}
            envMapIntensity={2.0}
          />
          <Edges color="#555" />
        </Box>

        {/* Cylinder bores - left bank */}
        {[0, 1, 2, 3].map((i) => (
          <Cylinder
            key={`cyl-left-${i}`}
            args={[0.22, 0.22, 1.6, 16]}
            position={[0.35, 0, -1.2 + i * 0.8]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <meshStandardMaterial color="#333" metalness={0.85} roughness={0.8} envMapIntensity={1.5} />
          </Cylinder>
        ))}
      </group>

      {/* Right bank */}
      <group rotation={[0, 0, -Math.PI / 12]} position={[0.6, 0, 0]}>
        <Box args={[0.8, 1.5, 3.5]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.7}
            envMapIntensity={2.0}
          />
          <Edges color="#555" />
        </Box>

        {/* Cylinder bores - right bank */}
        {[0, 1, 2, 3].map((i) => (
          <Cylinder
            key={`cyl-right-${i}`}
            args={[0.22, 0.22, 1.6, 16]}
            position={[-0.35, 0, -1.2 + i * 0.8]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <meshStandardMaterial color="#333" metalness={0.85} roughness={0.8} envMapIntensity={1.5} />
          </Cylinder>
        ))}
      </group>

      {/* Center valley (crankcase) */}
      <Box args={[0.6, 1.8, 3.5]} position={[0, -0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.6} envMapIntensity={2.2} />
      </Box>
    </group>
  );
};

// Step 3: Crankshaft with throws
const Crankshaft = ({ assembled, running }: { assembled: boolean; running: boolean }) => {
  const shaftRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (shaftRef.current) {
      if (assembled) {
        gsap.to(shaftRef.current.position, {
          x: 0,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 0.6,
        });
      } else {
        gsap.to(shaftRef.current.position, {
          x: -5,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  useFrame((state) => {
    if (shaftRef.current && running) {
      shaftRef.current.rotation.z += 0.05;
    }
  });

  return (
    <group ref={shaftRef} position={[assembled ? 0 : -5, -1.15, 0]}>
      {/* Main shaft */}
      <Cylinder args={[0.15, 0.15, 4, 16]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#4a4a4a"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2.5}
        />
      </Cylinder>

      {/* Crank throws (4 throws for V8) */}
      {[-1.2, -0.4, 0.4, 1.2].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          {/* Throw offset */}
          <Box args={[0.25, 0.08, 0.3]} position={[0, 0.25, 0]} castShadow>
            <meshStandardMaterial color="#555" metalness={0.92} roughness={0.25} envMapIntensity={2.3} />
          </Box>
          {/* Connecting rod journal */}
          <Cylinder args={[0.12, 0.12, 0.35, 16]} position={[0, 0.25, 0]} castShadow>
            <meshStandardMaterial color="#666" metalness={0.95} roughness={0.18} envMapIntensity={2.5} />
          </Cylinder>
        </group>
      ))}
    </group>
  );
};

// Step 4: Camshaft with lobes
const Camshaft = ({ assembled, running }: { assembled: boolean; running: boolean }) => {
  const camRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (camRef.current) {
      if (assembled) {
        gsap.to(camRef.current.position, {
          z: 0,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 0.9,
        });
      } else {
        gsap.to(camRef.current.position, {
          z: 5,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  useFrame(() => {
    if (camRef.current && running) {
      camRef.current.rotation.z += 0.025; // Half speed of crankshaft
    }
  });

  return (
    <group ref={camRef} position={[0, 0.2, assembled ? 0 : 5]}>
      {/* Cam shaft */}
      <Cylinder args={[0.1, 0.1, 3.5, 16]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#555" metalness={0.93} roughness={0.2} envMapIntensity={2.4} />
      </Cylinder>

      {/* Cam lobes (16 lobes for 8 cylinders, 2 per cylinder) */}
      {Array.from({ length: 16 }, (_, i) => (
        <Box
          key={i}
          args={[0.25, 0.15, 0.15]}
          position={[0, 0, -1.6 + i * 0.2]}
          rotation={[0, 0, (i * Math.PI) / 4]}
          castShadow
        >
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.25} envMapIntensity={2.2} />
        </Box>
      ))}
    </group>
  );
};

// Step 5: Pistons with connecting rods
const Pistons = ({ assembled, running }: { assembled: boolean; running: boolean }) => {
  const pistonsRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (pistonsRef.current) {
      if (assembled) {
        gsap.to(pistonsRef.current.position, {
          y: -0.3,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 1.2,
        });
      } else {
        gsap.to(pistonsRef.current.position, {
          y: 4,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  return (
    <group ref={pistonsRef} position={[0, assembled ? -0.3 : 4, 0]}>
      {/* Left bank pistons */}
      {[0, 1, 2, 3].map((i) => {
        const z = -1.2 + i * 0.8;
        const offset = running ? Math.sin(Date.now() * 0.01 + i * Math.PI / 2) * 0.15 : 0;

        return (
          <group key={`piston-left-${i}`} position={[-0.6 + offset * 0.3, offset, z]} rotation={[0, 0, Math.PI / 12]}>
            {/* Piston */}
            <Cylinder args={[0.2, 0.2, 0.4, 16]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <meshStandardMaterial color="#888" metalness={0.95} roughness={0.12} envMapIntensity={2.6} />
            </Cylinder>
            {/* Connecting rod */}
            <Cylinder args={[0.05, 0.05, 0.6, 8]} position={[-0.3, -0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <meshStandardMaterial color="#555" metalness={0.92} roughness={0.25} envMapIntensity={2.3} />
            </Cylinder>
          </group>
        );
      })}

      {/* Right bank pistons */}
      {[0, 1, 2, 3].map((i) => {
        const z = -1.2 + i * 0.8;
        const offset = running ? Math.sin(Date.now() * 0.01 + i * Math.PI / 2 + Math.PI) * 0.15 : 0;

        return (
          <group key={`piston-right-${i}`} position={[0.6 - offset * 0.3, offset, z]} rotation={[0, 0, -Math.PI / 12]}>
            {/* Piston */}
            <Cylinder args={[0.2, 0.2, 0.4, 16]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <meshStandardMaterial color="#888" metalness={0.95} roughness={0.12} envMapIntensity={2.6} />
            </Cylinder>
            {/* Connecting rod */}
            <Cylinder args={[0.05, 0.05, 0.6, 8]} position={[0.3, -0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <meshStandardMaterial color="#555" metalness={0.92} roughness={0.25} envMapIntensity={2.3} />
            </Cylinder>
          </group>
        );
      })}
    </group>
  );
};

// Step 6: Cylinder Heads
const CylinderHeads = ({ assembled }: { assembled: boolean }) => {
  const headsRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (headsRef.current) {
      if (assembled) {
        gsap.to(headsRef.current.position, {
          y: 0.5,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 1.5,
        });
      } else {
        gsap.to(headsRef.current.position, {
          y: 5,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  return (
    <group ref={headsRef} position={[0, assembled ? 0.5 : 5, 0]}>
      {/* Left cylinder head */}
      <group rotation={[0, 0, Math.PI / 12]} position={[-0.9, 0, 0]}>
        <Box args={[0.7, 0.6, 3.5]} castShadow receiveShadow>
          <meshStandardMaterial color="#333" metalness={0.88} roughness={0.6} envMapIntensity={2.0} />
          <Edges color="#666" />
        </Box>
        {/* Valve ports */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`valve-left-${i}`} position={[0.3, 0, -1.2 + i * 0.8]}>
            <Cylinder args={[0.08, 0.08, 0.5, 8]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <meshStandardMaterial color="#444" metalness={0.9} roughness={0.35} envMapIntensity={2.1} />
            </Cylinder>
          </group>
        ))}
      </group>

      {/* Right cylinder head */}
      <group rotation={[0, 0, -Math.PI / 12]} position={[0.9, 0, 0]}>
        <Box args={[0.7, 0.6, 3.5]} castShadow receiveShadow>
          <meshStandardMaterial color="#333" metalness={0.88} roughness={0.6} envMapIntensity={2.0} />
          <Edges color="#666" />
        </Box>
        {/* Valve ports */}
        {[0, 1, 2, 3].map((i) => (
          <group key={`valve-right-${i}`} position={[-0.3, 0, -1.2 + i * 0.8]}>
            <Cylinder args={[0.08, 0.08, 0.5, 8]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <meshStandardMaterial color="#444" metalness={0.9} roughness={0.35} envMapIntensity={2.1} />
            </Cylinder>
          </group>
        ))}
      </group>
    </group>
  );
};

// Step 7: Valve Covers (Chrome)
const ValveCovers = ({ assembled }: { assembled: boolean }) => {
  const coversRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (coversRef.current) {
      if (assembled) {
        gsap.to(coversRef.current.position, {
          y: 1,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 1.8,
        });
      } else {
        gsap.to(coversRef.current.position, {
          y: 6,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  return (
    <group ref={coversRef} position={[0, assembled ? 1 : 6, 0]}>
      {/* Left valve cover */}
      <group rotation={[0, 0, Math.PI / 12]} position={[-1.1, 0, 0]}>
        <Box args={[0.6, 0.4, 3.3]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#d0d0d0"
            metalness={1.0}
            roughness={0.05}
            envMapIntensity={3.0}
          />
          <Edges color="#f0f0f0" />
        </Box>
        {/* Ribs */}
        {[-1, -0.3, 0.4, 1.1].map((z, i) => (
          <Box key={`rib-left-${i}`} args={[0.5, 0.5, 0.08]} position={[0, 0, z]} castShadow>
            <meshStandardMaterial color="#c0c0c0" metalness={1.0} roughness={0.08} envMapIntensity={2.8} />
          </Box>
        ))}
      </group>

      {/* Right valve cover */}
      <group rotation={[0, 0, -Math.PI / 12]} position={[1.1, 0, 0]}>
        <Box args={[0.6, 0.4, 3.3]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#d0d0d0"
            metalness={1.0}
            roughness={0.05}
            envMapIntensity={3.0}
          />
          <Edges color="#f0f0f0" />
        </Box>
        {/* Ribs */}
        {[-1, -0.3, 0.4, 1.1].map((z, i) => (
          <Box key={`rib-right-${i}`} args={[0.5, 0.5, 0.08]} position={[0, 0, z]} castShadow>
            <meshStandardMaterial color="#c0c0c0" metalness={1.0} roughness={0.08} envMapIntensity={2.8} />
          </Box>
        ))}
      </group>
    </group>
  );
};

// Step 8: Intake Manifold
const IntakeManifold = ({ assembled }: { assembled: boolean }) => {
  const manifoldRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (manifoldRef.current) {
      if (assembled) {
        gsap.to(manifoldRef.current.position, {
          y: 1.8,
          duration: 2.5,
          ease: 'power1.inOut',
          delay: 2.1,
        });
      } else {
        gsap.to(manifoldRef.current.position, {
          y: 7,
          duration: 1.5,
          ease: 'power1.in',
        });
      }
    }
  }, [assembled]);

  return (
    <group ref={manifoldRef} position={[0, assembled ? 1.8 : 7, 0]}>
      {/* Central plenum */}
      <Box args={[1.6, 0.5, 3]} position={[0, 0.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a5fb4"
          metalness={0.95}
          roughness={0.2}
          envMapIntensity={2.4}
          emissive="#1a5fb4"
          emissiveIntensity={0.1}
        />
        <Edges color="#3584e4" />
      </Box>

      {/* Intake runners - left bank */}
      {[0, 1, 2, 3].map((i) => (
        <Cylinder
          key={`runner-left-${i}`}
          args={[0.15, 0.12, 0.7, 8]}
          position={[-0.6, -0.15, -1.1 + i * 0.75]}
          rotation={[0, 0, -Math.PI / 6]}
          castShadow
        >
          <meshStandardMaterial
            color="#1a5fb4"
            metalness={0.95}
            roughness={0.18}
            envMapIntensity={2.5}
            emissive="#1a5fb4"
            emissiveIntensity={0.08}
          />
        </Cylinder>
      ))}

      {/* Intake runners - right bank */}
      {[0, 1, 2, 3].map((i) => (
        <Cylinder
          key={`runner-right-${i}`}
          args={[0.15, 0.12, 0.7, 8]}
          position={[0.6, -0.15, -1.1 + i * 0.75]}
          rotation={[0, 0, Math.PI / 6]}
          castShadow
        >
          <meshStandardMaterial
            color="#1a5fb4"
            metalness={0.95}
            roughness={0.18}
            envMapIntensity={2.5}
            emissive="#1a5fb4"
            emissiveIntensity={0.08}
          />
        </Cylinder>
      ))}

      {/* Throttle body */}
      <Cylinder args={[0.25, 0.3, 0.4, 16]} position={[0, 0.7, 1.2]} castShadow>
        <meshStandardMaterial
          color="#2563eb"
          metalness={0.96}
          roughness={0.15}
          envMapIntensity={2.6}
          emissive="#2563eb"
          emissiveIntensity={0.12}
        />
      </Cylinder>
    </group>
  );
};

// Main scene component
const Scene = ({ currentStep = 0, progress = 0 }: EngineAssemblyProps) => {
  const running = currentStep >= 7;
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Camera choreography based on step - optimized to showcase each part
  useEffect(() => {
    if (cameraRef.current) {
      const positions: Record<number, [number, number, number]> = {
        0: [6, 1, 6],    // Low angle for oil pan (bottom component)
        1: [5, 2.5, 5],  // Medium angle for engine block (main structure)
        2: [7, 1, 4],    // Side low angle for crankshaft (horizontal shaft)
        3: [4, 3, 5],    // Elevated angle for camshaft (upper shaft)
        4: [5, 2, 6],    // Angled view for pistons (reciprocating parts)
        5: [6, 3.5, 4],  // Upper angle for cylinder heads
        6: [5, 4, 5],    // High angle for chrome valve covers (top components)
        7: [6, 5, 6],    // Wide overview for complete engine with manifold
      };

      const targetPos = positions[currentStep] || [6, 4, 6];

      gsap.to(cameraRef.current.position, {
        x: targetPos[0],
        y: targetPos[1],
        z: targetPos[2],
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }
  }, [currentStep]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[6, 4, 6]} fov={45} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={14}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.8}
      />

      {/* HDR Environment Map for realistic reflections */}
      <Environment
        preset="warehouse"
        background={false}
        blur={0.5}
      />

      {/* Advanced Lighting System */}
      <ambientLight intensity={0.3} />

      {/* Key Light - Main overhead garage light */}
      <spotLight
        position={[5, 10, 5]}
        angle={0.5}
        penumbra={0.5}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={typeof window !== 'undefined' && window.innerWidth < 768 ? 1024 : 2048}
        shadow-mapSize-height={typeof window !== 'undefined' && window.innerWidth < 768 ? 1024 : 2048}
        shadow-bias={-0.0001}
        color="#ffffff"
      />

      {/* Fill Light - Left side */}
      <spotLight
        position={[-6, 6, 2]}
        angle={0.6}
        penumbra={0.6}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        color="#e0e5ff"
      />

      {/* Rim Light - Back highlight for edge definition */}
      <spotLight
        position={[0, 8, -8]}
        angle={0.4}
        penumbra={0.4}
        intensity={1.8}
        color="#ffffff"
      />

      {/* Subtle point lights for ambiance */}
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#4a90e2" distance={8} />
      <pointLight position={[3, 2, 3]} intensity={0.5} color="#ff8c42" distance={8} />

      {/* Engine shake effect when running */}
      <group position={running ? [0, Math.sin(Date.now() * 0.01) * 0.02, 0] : [0, 0, 0]}>
        {/* Engine Components - Assemble progressively */}
        <OilPan assembled={currentStep >= 0} />
        <EngineBlock assembled={currentStep >= 1} />
        <Crankshaft assembled={currentStep >= 2} running={running} />
        <Camshaft assembled={currentStep >= 3} running={running} />
        <Pistons assembled={currentStep >= 4} running={running} />
        <CylinderHeads assembled={currentStep >= 5} />
        <ValveCovers assembled={currentStep >= 6} />
        <IntakeManifold assembled={currentStep >= 7} />
      </group>
    </>
  );
};

export default function EngineAssembly({ currentStep = 0, progress = 0 }: EngineAssemblyProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows="soft"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
        performance={{ min: 0.5 }}
      >
        <Scene currentStep={currentStep} progress={progress} />
      </Canvas>
    </div>
  );
}
