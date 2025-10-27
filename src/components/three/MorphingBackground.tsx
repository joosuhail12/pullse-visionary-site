// @ts-nocheck - @react-three/fiber doesn't support React 19 yet
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uScrollOffset;
  varying vec2 vUv;

  // Noise function for organic movement
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 st = vUv;

    // Create flowing pattern
    float t = uTime * 0.1;
    float scroll = uScrollOffset * 0.001;

    // Multiple noise layers for depth
    float n1 = noise(st * 3.0 + t);
    float n2 = noise(st * 5.0 - t * 0.5);
    float n3 = noise(st * 7.0 + t * 0.3 + scroll);

    // Combine noises
    float pattern = (n1 + n2 + n3) / 3.0;

    // Create color gradient based on position and scroll
    vec3 color1 = mix(uColor1, uColor2, st.y + sin(t) * 0.3);
    vec3 color2 = mix(uColor2, uColor3, st.x + cos(t * 0.7) * 0.3);
    vec3 finalColor = mix(color1, color2, pattern);

    // Add subtle glow
    float glow = smoothstep(0.0, 1.0, 1.0 - length(st - 0.5) * 0.5);
    finalColor += glow * 0.1;

    gl_FragColor = vec4(finalColor, 0.3);
  }
`;

interface MorphingPlaneProps {
  scrollOffset: number;
}

const MorphingPlane = ({ scrollOffset }: MorphingPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#06b6d4') }, // cyan
    uColor2: { value: new THREE.Color('#8b5cf6') }, // purple
    uColor3: { value: new THREE.Color('#3b82f6') }, // blue
    uScrollOffset: { value: 0 },
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScrollOffset.value = scrollOffset;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

interface MorphingBackgroundProps {
  scrollOffset?: number;
}

export default function MorphingBackground({ scrollOffset = 0 }: MorphingBackgroundProps) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none opacity-40 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <MorphingPlane scrollOffset={scrollOffset} />
      </Canvas>
    </div>
  );
}
