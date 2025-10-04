import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, MeshTransmissionMaterial, Trail, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { Mail, MessageSquare, AtSign, Zap, CheckCircle, DollarSign, Package, RefreshCw } from "lucide-react";
import logoIcon from "@/assets/logo-icon-purple.png";

// Floating channel icons coming from left
const ChannelIcon = ({ 
  position, 
  delay, 
  icon: Icon,
  color 
}: { 
  position: [number, number, number]; 
  delay: number;
  icon: any;
  color: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.5 + delay) % 5;
    setProgress(t / 5);
    
    // Bezier curve from left to center
    const x = -8 + progress * 8;
    const y = position[1] + Math.sin(progress * Math.PI * 2) * 1.5;
    const z = Math.cos(progress * Math.PI * 2) * 0.8;
    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.y = progress * Math.PI * 3;
    
    // Fade in and out
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.4 + opacity * 0.6);
  });

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8}>
        <div 
          className="flex items-center justify-center w-14 h-14 rounded-2xl glass-strong shadow-lg"
          style={{ 
            opacity: progress > 0.1 && progress < 0.9 ? 1 : 0,
            backgroundColor: `${color}20`,
            borderColor: color,
            borderWidth: 2,
            boxShadow: `0 0 20px ${color}40`
          }}
        >
          <Icon className="h-7 w-7" style={{ color }} />
        </div>
      </Html>
    </group>
  );
};

// Action outcomes flowing right
const OutcomeCard = ({ 
  position, 
  delay, 
  icon: Icon,
  text,
  color 
}: { 
  position: [number, number, number]; 
  delay: number;
  icon: any;
  text: string;
  color: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.5 + delay) % 5;
    setProgress(t / 5);
    
    // Move from center to right with curve
    const x = progress * 9;
    const y = position[1] + Math.sin(progress * Math.PI) * 1.2;
    const z = -progress * 0.8;
    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.y = -progress * Math.PI * 2;
    
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.3 + opacity * 0.8);
  });

  if (progress < 0.1 || progress > 0.9) return null;

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8}>
        <div 
          className="glass-strong px-5 py-2.5 rounded-xl flex items-center gap-2.5 whitespace-nowrap shadow-2xl"
          style={{
            borderLeft: `4px solid ${color}`,
            boxShadow: `0 4px 24px ${color}30`
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
          <span className="text-sm font-semibold">{text}</span>
        </div>
      </Html>
    </group>
  );
};

// Orbiting electrons with enhanced trails
const OrbitingParticle = ({ 
  radius, 
  speed, 
  label, 
  color 
}: { 
  radius: number; 
  speed: number; 
  label: string;
  color: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius * 0.7;
    ref.current.position.z = Math.sin(t * 0.5) * 0.8;
  });

  return (
    <Trail
      width={2}
      length={12}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh 
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 3 : 1.2}
          toneMapped={false}
        />
        <Html center distanceFactor={10}>
          <div 
            className="text-xs font-bold px-3 py-1.5 rounded-lg glass-strong whitespace-nowrap shadow-lg"
            style={{ 
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.9)',
              transition: 'all 0.3s',
              pointerEvents: 'none',
              borderColor: color,
              borderWidth: 2
            }}
          >
            {label}
          </div>
        </Html>
      </mesh>
    </Trail>
  );
};

// Massive central Pullse orb with enhanced visuals
const CenterOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle pulsing
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    setScale(pulse);
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <group scale={scale}>
      {/* Multiple outer glow rings */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <torusGeometry args={[3.2, 0.08, 16, 100]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.6, 0.06, 16, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <torusGeometry args={[4.0, 0.05, 16, 100]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.2} />
        </mesh>
      </Float>

      {/* Main glass orb - larger */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={0.98}
          thickness={1.2}
          roughness={0.03}
          chromaticAberration={0.1}
          anisotropy={1}
          color="#7c3aed"
          distortion={0.3}
          distortionScale={0.6}
          temporalDistortion={0.1}
        />
      </mesh>

      {/* Inner glowing core */}
      <Float speed={3} rotationIntensity={1} floatIntensity={0.3}>
        <mesh scale={0.8}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      {/* Enhanced sparkles */}
      <Sparkles
        count={50}
        scale={4}
        size={3}
        speed={0.5}
        color="#7c3aed"
      />

      {/* BIGGER Logo */}
      <Html center distanceFactor={1.2}>
        <div className="relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150"></div>
          
          {/* Logo container - much larger */}
          <div className="relative flex items-center justify-center w-32 h-32 bg-white rounded-full p-6 shadow-2xl border-4 border-primary/30">
            <img src={logoIcon} alt="Pullse" className="w-full h-full drop-shadow-lg" />
          </div>
        </div>
      </Html>
    </group>
  );
};

// Enhanced action burst with multiple effects
const ActionBurst = () => {
  const [visible, setVisible] = useState(false);
  const [actionIndex, setActionIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);

  const actions = [
    { icon: DollarSign, text: "Refund #4931 ✓", color: "#10b981", subtitle: "Processed automatically" },
    { icon: Package, text: "Order #8742 updated", color: "#3b82f6", subtitle: "Shipping info sent" },
    { icon: RefreshCw, text: "Plan upgraded", color: "#8b5cf6", subtitle: "Customer notified" },
    { icon: CheckCircle, text: "Issue resolved", color: "#10b981", subtitle: "CSAT survey sent" },
  ];

  const currentAction = actions[actionIndex];

  useFrame((state) => {
    const t = state.clock.elapsedTime % 4.5;
    const shouldShow = t > 2.8 && t < 4.2;
    
    if (shouldShow && !visible) {
      setActionIndex((prev) => (prev + 1) % actions.length);
    }
    
    setVisible(shouldShow);
    
    if (groupRef.current && shouldShow) {
      const progress = (t - 2.8) / 1.4;
      groupRef.current.position.y = 2.5 + Math.sin(progress * Math.PI) * 0.8;
      groupRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.3);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 2.5, 0]}>
      <Html center>
        <div 
          className="glass-strong px-8 py-4 rounded-2xl flex items-center gap-4 animate-fade-in shadow-2xl border-2"
          style={{ 
            borderColor: currentAction.color,
            boxShadow: `0 8px 32px ${currentAction.color}50`
          }}
        >
          <div 
            className="p-3 rounded-xl"
            style={{ 
              backgroundColor: `${currentAction.color}25`,
              boxShadow: `0 0 20px ${currentAction.color}40`
            }}
          >
            <currentAction.icon className="h-6 w-6" style={{ color: currentAction.color }} />
          </div>
          <div>
            <div className="text-base font-bold">{currentAction.text}</div>
            <div className="text-xs text-muted-foreground">{currentAction.subtitle}</div>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Main scene
const Scene = () => {
  const channels = useMemo(() => [
    { icon: Mail, color: "#3b82f6", delay: 0, pos: 2 },
    { icon: MessageSquare, color: "#10b981", delay: 0.8, pos: 0.5 },
    { icon: AtSign, color: "#8b5cf6", delay: 1.6, pos: -1.5 },
    { icon: Mail, color: "#f59e0b", delay: 2.4, pos: 1 },
    { icon: MessageSquare, color: "#ec4899", delay: 3.2, pos: -0.5 },
    { icon: AtSign, color: "#3b82f6", delay: 4, pos: 1.8 },
  ], []);

  const outcomes = useMemo(() => [
    { icon: CheckCircle, text: "Query resolved ✓", color: "#10b981", delay: 0.3, pos: 1.8 },
    { icon: Zap, text: "Auto-response", color: "#f59e0b", delay: 1.1, pos: 0.5 },
    { icon: DollarSign, text: "Refund processed", color: "#10b981", delay: 1.9, pos: -1.2 },
    { icon: Package, text: "Status updated", color: "#3b82f6", delay: 2.7, pos: 2 },
    { icon: CheckCircle, text: "Ticket closed", color: "#10b981", delay: 3.5, pos: -0.3 },
    { icon: RefreshCw, text: "Plan changed", color: "#8b5cf6", delay: 4.3, pos: 1.2 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#7c3aed" />
      <pointLight position={[-10, 10, 5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[0, -10, 5]} intensity={1.5} color="#10b981" />
      
      <spotLight
        position={[0, 8, 8]}
        angle={0.6}
        penumbra={1}
        intensity={3}
        color="#7c3aed"
        castShadow
      />

      {/* Input channels */}
      {channels.map((channel, i) => (
        <ChannelIcon
          key={`channel-${i}`}
          position={[0, channel.pos, 0]}
          delay={channel.delay}
          icon={channel.icon}
          color={channel.color}
        />
      ))}

      {/* Center orb with bigger logo */}
      <CenterOrb />
      
      {/* Orbiting particles */}
      <OrbitingParticle radius={3.2} speed={0.4} label="AI Engine" color="#7c3aed" />
      <OrbitingParticle radius={3.8} speed={-0.25} label="Human" color="#f59e0b" />

      {/* Outcomes */}
      {outcomes.map((outcome, i) => (
        <OutcomeCard
          key={`outcome-${i}`}
          position={[0, outcome.pos, 0]}
          delay={outcome.delay}
          icon={outcome.icon}
          text={outcome.text}
          color={outcome.color}
        />
      ))}

      {/* Action burst */}
      <ActionBurst />
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
      <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl">
        <div className="text-center">
          <img src={logoIcon} alt="Pullse Node" className="w-40 h-40 mx-auto mb-8 opacity-90" />
          <div className="grid grid-cols-3 gap-8 text-sm text-center max-w-5xl">
            <div>
              <strong className="text-foreground block mb-2">One inbox.</strong>
              <span className="text-muted-foreground">Every message in one place.</span>
            </div>
            <div>
              <strong className="text-foreground block mb-2">AI + human, together.</strong>
              <span className="text-muted-foreground">Bots handle routine; AI Agents take approved actions; humans own edge cases.</span>
            </div>
            <div>
              <strong className="text-foreground block mb-2">Better outcomes.</strong>
              <span className="text-muted-foreground">More first-contact resolutions, less busywork, visibility on what changed.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="w-full h-[500px] relative bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Original 3-column text at bottom */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="glass-strong p-6 rounded-xl">
          <strong className="text-foreground block text-lg mb-2">One inbox.</strong>
          <span className="text-muted-foreground text-sm">Every message in one place.</span>
        </div>
        <div className="glass-strong p-6 rounded-xl">
          <strong className="text-foreground block text-lg mb-2">AI + human, together.</strong>
          <span className="text-muted-foreground text-sm">Bots handle routine; AI Agents take approved actions; humans own edge cases.</span>
        </div>
        <div className="glass-strong p-6 rounded-xl">
          <strong className="text-foreground block text-lg mb-2">Better outcomes.</strong>
          <span className="text-muted-foreground text-sm">More first-contact resolutions, less busywork, visibility on what changed.</span>
        </div>
      </div>
    </div>
  );
};

export default NodeAnimation;
