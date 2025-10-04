import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, MeshTransmissionMaterial, Trail, Sparkles } from "@react-three/drei";
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
    const x = -7 + progress * 7;
    const y = position[1] + Math.sin(progress * Math.PI * 2) * 1.2;
    const z = Math.cos(progress * Math.PI * 2) * 0.5;
    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.y = progress * Math.PI * 2;
    
    // Fade in and out
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.5 + opacity * 0.5);
  });

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8}>
        <div 
          className="flex items-center justify-center w-12 h-12 rounded-xl glass-strong"
          style={{ 
            opacity: progress > 0.1 && progress < 0.9 ? 1 : 0,
            backgroundColor: `${color}15`,
            borderColor: color,
            borderWidth: 2
          }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
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
    
    // Move from center to right
    const x = progress * 8;
    const y = position[1] + Math.sin(progress * Math.PI) * 0.8;
    const z = -progress * 0.5;
    groupRef.current.position.set(x, y, z);
    
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.3 + opacity * 0.7);
  });

  if (progress < 0.1 || progress > 0.9) return null;

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8}>
        <div 
          className="glass-strong px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap shadow-lg"
          style={{
            borderLeft: `3px solid ${color}`,
          }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
          <span className="text-sm font-medium">{text}</span>
        </div>
      </Html>
    </group>
  );
};

// Orbiting electrons with trails
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
    ref.current.position.y = Math.sin(t) * radius * 0.6;
    ref.current.position.z = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <Trail
      width={1}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh 
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 2 : 0.8}
          toneMapped={false}
        />
        <Html center distanceFactor={10}>
          <div 
            className="text-xs font-bold px-2 py-1 rounded glass-strong whitespace-nowrap"
            style={{ 
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none'
            }}
          >
            {label}
          </div>
        </Html>
      </mesh>
    </Trail>
  );
};

// Central Pullse orb with glow
const CenterOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle pulsing
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    setScale(pulse);
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group scale={scale}>
      {/* Outer glow rings */}
      <mesh>
        <torusGeometry args={[2.2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
      </mesh>

      {/* Main orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={0.95}
          thickness={0.8}
          roughness={0.05}
          chromaticAberration={0.08}
          anisotropy={1}
          color="#7c3aed"
          distortion={0.2}
          distortionScale={0.5}
        />
      </mesh>

      {/* Inner core */}
      <mesh scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Sparkles inside */}
      <Sparkles
        count={30}
        scale={2.5}
        size={2}
        speed={0.4}
        color="#7c3aed"
      />

      {/* Logo */}
      <Html center distanceFactor={1.5}>
        <div className="flex items-center justify-center w-20 h-20 bg-white/95 rounded-full p-4 backdrop-blur-sm shadow-2xl border-2 border-primary/20">
          <img src={logoIcon} alt="Pullse" className="w-full h-full" />
        </div>
      </Html>
    </group>
  );
};

// Pulsing action receipts
const ActionBurst = () => {
  const [visible, setVisible] = useState(false);
  const [actionIndex, setActionIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);

  const actions = [
    { icon: DollarSign, text: "Refund processed", color: "#10b981" },
    { icon: Package, text: "Order updated", color: "#3b82f6" },
    { icon: RefreshCw, text: "Subscription changed", color: "#8b5cf6" },
    { icon: CheckCircle, text: "Ticket resolved", color: "#10b981" },
  ];

  const currentAction = actions[actionIndex];

  useFrame((state) => {
    const t = state.clock.elapsedTime % 4;
    const shouldShow = t > 2.5 && t < 3.8;
    
    if (shouldShow && !visible) {
      setActionIndex((prev) => (prev + 1) % actions.length);
    }
    
    setVisible(shouldShow);
    
    if (groupRef.current && shouldShow) {
      const progress = (t - 2.5) / 1.3;
      groupRef.current.position.y = 2 + Math.sin(progress * Math.PI) * 0.5;
      groupRef.current.scale.setScalar(Math.sin(progress * Math.PI) * 1.2);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      <Html center>
        <div 
          className="glass-strong px-6 py-3 rounded-xl flex items-center gap-3 animate-fade-in shadow-2xl border-2"
          style={{ borderColor: currentAction.color }}
        >
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${currentAction.color}20` }}
          >
            <currentAction.icon className="h-5 w-5" style={{ color: currentAction.color }} />
          </div>
          <div>
            <div className="text-sm font-bold">{currentAction.text}</div>
            <div className="text-xs text-muted-foreground">AI Agent • Just now</div>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Main scene
const Scene = () => {
  const channels = useMemo(() => [
    { icon: Mail, color: "#3b82f6", delay: 0, pos: 1.5 },
    { icon: MessageSquare, color: "#10b981", delay: 1, pos: 0 },
    { icon: AtSign, color: "#8b5cf6", delay: 2, pos: -1.5 },
    { icon: Mail, color: "#3b82f6", delay: 3, pos: 0.7 },
    { icon: MessageSquare, color: "#10b981", delay: 4, pos: -0.7 },
  ], []);

  const outcomes = useMemo(() => [
    { icon: CheckCircle, text: "Query resolved", color: "#10b981", delay: 0.5, pos: 1.2 },
    { icon: Zap, text: "Auto-response sent", color: "#f59e0b", delay: 1.5, pos: 0.3 },
    { icon: DollarSign, text: "Refund #4921", color: "#10b981", delay: 2.5, pos: -0.8 },
    { icon: CheckCircle, text: "Ticket closed", color: "#10b981", delay: 3.5, pos: 1.5 },
    { icon: Package, text: "Status updated", color: "#3b82f6", delay: 4.5, pos: -0.3 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#7c3aed" />
      <pointLight position={[-10, 10, 5]} intensity={1} color="#3b82f6" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#10b981" />
      
      <spotLight
        position={[0, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={2}
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

      {/* Center orb */}
      <CenterOrb />
      
      {/* Orbiting particles */}
      <OrbitingParticle radius={2.2} speed={0.5} label="AI Engine" color="#7c3aed" />
      <OrbitingParticle radius={2.6} speed={-0.3} label="Human Oversight" color="#f59e0b" />
      <OrbitingParticle radius={3.0} speed={0.4} label="Real-time Actions" color="#10b981" />

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
          <img src={logoIcon} alt="Pullse Node" className="w-32 h-32 mx-auto mb-6 opacity-80" />
          <div className="space-y-2 text-sm text-muted-foreground max-w-2xl">
            <p className="font-bold text-foreground text-lg">How Pullse Works</p>
            <p>Messages from all channels → AI + Human collaboration → Automated actions & resolutions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>

      {/* Enhanced Captions with visual flow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left label */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <div className="glass-strong p-4 rounded-xl max-w-[180px]">
            <div className="text-xs font-bold text-primary mb-1">CHANNELS</div>
            <div className="text-xs text-muted-foreground">
              Email, chat, social—all unified
            </div>
          </div>
        </div>

        {/* Center label */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8">
          <div className="glass-strong px-6 py-3 rounded-xl text-center">
            <div className="text-xs font-bold text-primary mb-1">PULLSE ENGINE</div>
            <div className="text-xs text-muted-foreground">
              AI + Human collaboration in real-time
            </div>
          </div>
        </div>

        {/* Right label */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="glass-strong p-4 rounded-xl max-w-[180px] text-right">
            <div className="text-xs font-bold text-primary mb-1">OUTCOMES</div>
            <div className="text-xs text-muted-foreground">
              Resolutions, actions, and happy customers
            </div>
          </div>
        </div>

        {/* Flow arrows */}
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 text-primary/30 text-4xl">→</div>
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 text-primary/30 text-4xl">→</div>
      </div>
    </div>
  );
};

export default NodeAnimation;
