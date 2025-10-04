import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, MeshTransmissionMaterial, Instances, Instance, Line } from "@react-three/drei";
import * as THREE from "three";
import logoIcon from "@/assets/logo-icon-purple.png";

// Envelope/Chat glyph component
const InputGlyph = ({ position, delay }: { position: [number, number, number]; delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime + delay) % 4;
    setProgress(t / 4);
    
    // Move along spline from left to center
    const x = -6 + progress * 6;
    const y = position[1] + Math.sin(progress * Math.PI) * 0.5;
    ref.current.position.set(x, y, 0);
    ref.current.rotation.y = progress * Math.PI * 2;
  });

  return (
    <mesh ref={ref} scale={0.15}>
      <boxGeometry args={[1, 0.7, 0.1]} />
      <meshStandardMaterial color="#7c3aed" opacity={0.8} transparent />
    </mesh>
  );
};

// Output glyph (checkmark)
const OutputGlyph = ({ position, delay }: { position: [number, number, number]; delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime + delay) % 4;
    setProgress(t / 4);
    
    // Move from center to right
    const x = progress * 6;
    const y = position[1] + Math.sin(progress * Math.PI) * 0.3;
    ref.current.position.set(x, y, 0);
    ref.current.rotation.z = progress * Math.PI;
  });

  return (
    <mesh ref={ref} scale={0.2}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
    </mesh>
  );
};

// Orbiting electron
const Electron = ({ radius, speed, label }: { radius: number; speed: number; label: string }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius * 0.5;
    ref.current.position.z = Math.sin(t) * 0.3;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.8} />
    </mesh>
  );
};

// Main orb with logo
const CenterOrb = () => {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshTransmissionMaterial
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={0.05}
          anisotropy={1}
          color="#7c3aed"
        />
      </mesh>
      
      <Html center distanceFactor={1.5}>
        <div className="flex items-center justify-center w-16 h-16 bg-white/90 rounded-full p-3 backdrop-blur-sm">
          <img src={logoIcon} alt="Pullse" className="w-full h-full" />
        </div>
      </Html>
    </group>
  );
};

// Action receipt popup
const ActionReceipt = () => {
  const [visible, setVisible] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime % 6;
    const shouldShow = t > 4 && t < 5.5;
    setVisible(shouldShow);
    
    if (groupRef.current && shouldShow) {
      const progress = (t - 4) / 1.5;
      groupRef.current.position.y = 1.5 + progress * 0.5;
      groupRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 0.8);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      <Html center>
        <div className="glass-strong px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap animate-fade-in">
          Refund #4931 ✓
        </div>
      </Html>
    </group>
  );
};

// Main scene
const Scene = () => {
  const inputGlyphs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [0, (i % 3) - 1, 0] as [number, number, number],
      delay: i * 0.3,
    }));
  }, []);

  const outputGlyphs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [0, (i % 3) - 1, 0] as [number, number, number],
      delay: i * 0.3,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#0f172a" />

      {/* Input glyphs */}
      {inputGlyphs.map((glyph, i) => (
        <InputGlyph key={`input-${i}`} {...glyph} />
      ))}

      {/* Center orb with electrons */}
      <CenterOrb />
      <Electron radius={1.8} speed={0.5} label="AI" />
      <Electron radius={2.2} speed={-0.3} label="Human" />

      {/* Output glyphs */}
      {outputGlyphs.map((glyph, i) => (
        <OutputGlyph key={`output-${i}`} {...glyph} />
      ))}

      {/* Action receipt */}
      <ActionReceipt />
    </>
  );
};

const NodeAnimation = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <img src={logoIcon} alt="Pullse Node" className="w-32 h-32 opacity-50" />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>

      {/* Captions */}
      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-4 px-4 pb-4 text-xs text-center text-muted-foreground">
        <div>
          <strong className="text-foreground">One inbox.</strong> Every message in one place.
        </div>
        <div>
          <strong className="text-foreground">AI + human, together.</strong> Bots handle routine.
        </div>
        <div>
          <strong className="text-foreground">Better outcomes.</strong> More first-contact resolutions.
        </div>
      </div>
    </div>
  );
};

export default NodeAnimation;
