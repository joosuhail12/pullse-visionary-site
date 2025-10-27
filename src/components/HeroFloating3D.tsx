"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Box, Float } from "@react-three/drei";
import * as THREE from "three";

const FloatingGlobe = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
        <meshStandardMaterial
          color="hsl(262, 83%, 58%)"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
    </Float>
  );
};

const FloatingNetwork = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={3}>
      <Torus ref={meshRef} args={[0.6, 0.15, 16, 32]} position={position}>
        <meshStandardMaterial
          color="hsl(220, 70%, 60%)"
          transparent
          opacity={0.25}
        />
      </Torus>
    </Float>
  );
};

const FloatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
      <Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={position}>
        <meshStandardMaterial
          color="hsl(262, 83%, 58%)"
          wireframe
          transparent
          opacity={0.2}
        />
      </Box>
    </Float>
  );
};

const HeroFloating3D = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="hsl(262, 83%, 58%)" />

        {/* Floating globes */}
        <FloatingGlobe position={[-4, 2, 0]} />
        <FloatingGlobe position={[5, -1, -2]} />
        <FloatingGlobe position={[3, 3, -1]} />
        
        {/* Floating networks/toruses */}
        <FloatingNetwork position={[-3, -2, 1]} />
        <FloatingNetwork position={[4, 1, 0]} />
        
        {/* Floating cubes */}
        <FloatingCube position={[-5, -1, -1]} />
        <FloatingCube position={[2, -3, 0]} />
        <FloatingCube position={[-2, 3, -2]} />
      </Canvas>
    </div>
  );
};

export default HeroFloating3D;
