import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Html, 
  MeshTransmissionMaterial, 
  Trail, 
  Sparkles, 
  Float,
  PerspectiveCamera,
  Environment,
  Line
} from "@react-three/drei";
import * as THREE from "three";
import { 
  Mail, MessageSquare, Phone, Users, Bot, Zap, Clock, TrendingUp, Target
} from "lucide-react";
import logoIcon from "@/assets/logo-icon-purple.png";

// Optimized particle field background
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500; // Reduced for performance

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      const color = new THREE.Color();
      color.setHSL(0.7 + Math.random() * 0.1, 0.7, 0.4 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Glowing connection lines
const ConnectionLine = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const line = groupRef.current.children[0] as THREE.Line;
    if (line && line.material) {
      const material = line.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Line
        points={[start, end]}
        color={color}
        lineWidth={2}
        transparent
        opacity={0.3}
        dashed={false}
      />
    </group>
  );
};

// Particle burst effect for celebrations
const ParticleBurst = ({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) => {
  const [particles, setParticles] = useState<Array<{ position: THREE.Vector3; velocity: THREE.Vector3; life: number }>>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticles = Array.from({ length: 20 }, () => ({
        position: new THREE.Vector3(...position),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        life: 1
      }));
      setParticles(newParticles);
      
      setTimeout(() => setParticles([]), 1000);
    }, 5000 + delay * 1000);
    
    return () => clearInterval(interval);
  }, [delay, position]);

  return (
    <>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={particle.life} />
        </mesh>
      ))}
    </>
  );
};

// Channel icon with hover tooltips
const ChannelIcon = ({ position, icon, color, label, count }: { position: [number, number, number]; icon: any; color: string; label: string; count: number }) => {
  const Icon = icon;
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.5}
            transparent
            opacity={hovered ? 0.5 : 0.3}
          />
        </mesh>
        <Html center distanceFactor={8}>
          <div className="flex flex-col items-center gap-2">
            <div 
              className="glass-strong p-4 rounded-2xl transition-all duration-300"
              style={{ 
                backgroundColor: `${color}20`,
                borderColor: color,
                borderWidth: 2,
                boxShadow: hovered ? `0 0 40px ${color}80` : `0 0 30px ${color}50`,
                transform: hovered ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <Icon className="h-8 w-8" style={{ color }} />
            </div>
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
            <div className="text-xs font-semibold text-primary mt-1">
              {count} active
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Ticket flowing from channels to engine
const FlowingTicket = ({ delay, startY, ticketInfo }: { delay: number; startY: number; ticketInfo: { emoji: string; text: string; color: string } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.5 + delay) % 5;
    setProgress(t / 5);
    
    // Bezier curve from left channels to center engine
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-8, startY, 1),
      new THREE.Vector3(-4, startY + 1, 0),
      new THREE.Vector3(-1, startY - 0.5, -0.5),
      new THREE.Vector3(0, 0, 0)
    );
    
    const point = curve.getPoint(progress);
    groupRef.current.position.copy(point);
    
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.6 + opacity * 0.6);
  });

  if (progress < 0.05 || progress > 0.95) return null;

  return (
    <group ref={groupRef}>
      <Trail
        width={2.5}
        length={15}
        color={ticketInfo.color}
        attenuation={(t) => t * t * t}
      >
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={ticketInfo.color}
            emissive={ticketInfo.color}
            emissiveIntensity={2}
          />
        </mesh>
      </Trail>
      <Html center distanceFactor={12}>
        <div 
          className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap border-l-4"
          style={{ 
            borderColor: ticketInfo.color,
            boxShadow: `0 4px 24px ${ticketInfo.color}40`
          }}
        >
          <span className="text-xl">{ticketInfo.emoji}</span>
          <span className="text-xs font-semibold">{ticketInfo.text}</span>
        </div>
      </Html>
    </group>
  );
};

// Enhanced happiness with celebration and metrics
const FlowingHappiness = ({ 
  delay, 
  endY, 
  happiness 
}: { 
  delay: number; 
  endY: number; 
  happiness: { 
    emoji: string; 
    text: string; 
    metric: string;
    color: string;
  } 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [shouldCelebrate, setShouldCelebrate] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.5 + delay) % 5;
    setProgress(t / 5);
    
    // Trigger celebration near the end
    if (progress > 0.85 && progress < 0.9 && !shouldCelebrate) {
      setShouldCelebrate(true);
      setTimeout(() => setShouldCelebrate(false), 500);
    }
    
    // Enhanced Bezier curve from engine to outcomes
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, endY - 1, -1),
      new THREE.Vector3(6, endY + 2, 1),
      new THREE.Vector3(9, endY, 2)
    );
    
    const point = curve.getPoint(progress);
    groupRef.current.position.copy(point);
    groupRef.current.rotation.z = progress * Math.PI * 2;
    
    const opacity = Math.sin(progress * Math.PI);
    const scale = shouldCelebrate ? 1.5 : (0.5 + opacity * 0.8);
    groupRef.current.scale.setScalar(scale);
  });

  if (progress < 0.05 || progress > 0.95) return null;

  return (
    <group ref={groupRef}>
      <Trail
        width={shouldCelebrate ? 4 : 3}
        length={shouldCelebrate ? 25 : 18}
        color={happiness.color}
        attenuation={(t) => t * t}
      >
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color={happiness.color}
            emissive={happiness.color}
            emissiveIntensity={shouldCelebrate ? 4 : 2.5}
          />
        </mesh>
      </Trail>
      {shouldCelebrate && (
        <Sparkles
          count={30}
          scale={2}
          size={3}
          speed={2}
          color={happiness.color}
        />
      )}
      <Html center distanceFactor={12}>
        <div 
          className={`glass-strong px-5 py-3 rounded-xl flex items-center gap-3 whitespace-nowrap border-l-4 transition-all duration-300 ${shouldCelebrate ? 'scale-125' : ''}`}
          style={{ 
            borderColor: happiness.color,
            boxShadow: shouldCelebrate 
              ? `0 12px 48px ${happiness.color}90` 
              : `0 8px 32px ${happiness.color}60`
          }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{happiness.emoji}</span>
              <span className="text-sm font-bold">{happiness.text}</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              {happiness.metric}
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Outcome indicator with celebration effects
const OutcomeIcon = ({ position, emoji, color, label, count }: { 
  position: [number, number, number]; 
  emoji: string; 
  color: string; 
  label: string;
  count: number;
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.2 : 0.6}
            transparent
            opacity={hovered ? 0.5 : 0.3}
          />
        </mesh>
        <ParticleBurst position={position} color={color} delay={Math.random() * 2} />
        <Html center distanceFactor={8}>
          <div className="flex flex-col items-center gap-2">
            <div 
              className="glass-strong p-4 rounded-2xl text-3xl transition-all duration-300"
              style={{ 
                backgroundColor: `${color}20`,
                borderColor: color,
                borderWidth: 2,
                boxShadow: hovered ? `0 0 50px ${color}90` : `0 0 30px ${color}60`,
                transform: hovered ? 'scale(1.15)' : 'scale(1)'
              }}
            >
              {emoji}
            </div>
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
            <div className="text-xs font-semibold text-primary mt-1">
              +{count} today
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Enhanced Central Engine with statistics and AI actions
const HumanAugmentationEngine = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const [ticketsProcessed, setTicketsProcessed] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState("0.8s");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTicketsProcessed(prev => prev + 1);
      const times = ["0.3s", "0.5s", "0.8s", "1.2s"];
      setAvgResponseTime(times[Math.floor(Math.random() * times.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Outer glass shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[3.2, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={0.99}
          thickness={1.8}
          roughness={0.02}
          chromaticAberration={0.15}
          anisotropy={1}
          color="#7c3aed"
          distortion={0.5}
          distortionScale={1}
          temporalDistortion={0.2}
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh ref={innerRef} scale={0.6}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={2}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Enhanced Sparkles */}
      <Sparkles
        count={150}
        scale={7}
        size={6}
        speed={0.6}
        color="#7c3aed"
      />

      {/* Orbital rings */}
      <Float speed={1.5} rotationIntensity={0.3}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[4.2, 0.12, 16, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4}>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[4.8, 0.1, 16, 100]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* AI + Human indicators */}
      <Float speed={2} floatIntensity={0.5}>
        <group position={[0, 2.5, 2]}>
          <Html center distanceFactor={8}>
            <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-2 border-primary/40 hover:border-primary/80 transition-all">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold">AI Agent</span>
            </div>
          </Html>
        </group>
      </Float>

      <Float speed={1.8} floatIntensity={0.6}>
        <group position={[0, -2.5, 2]}>
          <Html center distanceFactor={8}>
            <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-2 border-orange-500/40 hover:border-orange-500/80 transition-all">
              <Users className="h-5 w-5 text-orange-500" />
              <span className="text-xs font-bold">Human Expert</span>
            </div>
          </Html>
        </group>
      </Float>

      {/* Real-time statistics */}
      <Float speed={1.5} floatIntensity={0.4}>
        <group position={[-3.5, 0, 2]}>
          <Html center distanceFactor={10}>
            <div className="glass-strong px-3 py-2 rounded-lg border border-primary/30">
              <div className="flex items-center gap-2 text-[10px]">
                <Clock className="h-3 w-3 text-primary" />
                <div>
                  <div className="font-bold text-foreground">{avgResponseTime}</div>
                  <div className="text-muted-foreground">Avg Response</div>
                </div>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      <Float speed={1.7} floatIntensity={0.4}>
        <group position={[3.5, 0, 2]}>
          <Html center distanceFactor={10}>
            <div className="glass-strong px-3 py-2 rounded-lg border border-primary/30">
              <div className="flex items-center gap-2 text-[10px]">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <div>
                  <div className="font-bold text-foreground">{ticketsProcessed}</div>
                  <div className="text-muted-foreground">Resolved</div>
                </div>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      <Float speed={1.6} floatIntensity={0.4}>
        <group position={[0, 3.8, 2]}>
          <Html center distanceFactor={10}>
            <div className="glass-strong px-3 py-2 rounded-lg border border-primary/30">
              <div className="flex items-center gap-2 text-[10px]">
                <Target className="h-3 w-3 text-purple-400" />
                <div>
                  <div className="font-bold text-foreground">98.5%</div>
                  <div className="text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
          </Html>
        </group>
      </Float>

      {/* MASSIVE Logo */}
      <Html center distanceFactor={1}>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary rounded-full scale-[2.5] opacity-40 animate-pulse"></div>
          <div className="absolute inset-0 blur-2xl bg-primary/60 rounded-full scale-[1.8]"></div>
          
          <div className="relative flex items-center justify-center w-44 h-44 bg-white rounded-full p-9 shadow-2xl border-4 border-primary/50">
            <img src={logoIcon} alt="Pullse" className="w-full h-full drop-shadow-2xl" />
          </div>
        </div>
      </Html>
    </group>
  );
};

// Section labels
const SectionLabel = ({ position, title, subtitle, align = "center" }: { position: [number, number, number]; title: string; subtitle: string; align?: "left" | "center" | "right" }) => {
  return (
    <group position={position}>
      <Html center distanceFactor={10}>
        <div 
          className="glass-strong px-8 py-4 rounded-2xl shadow-2xl border-2 border-primary/30"
          style={{ textAlign: align }}
        >
          <div className="text-base font-bold text-foreground mb-1">{title}</div>
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        </div>
      </Html>
    </group>
  );
};

// Enhanced main scene with all improvements
const Scene = () => {
  const channels = useMemo(() => [
    { position: [-8, 2.5, 0] as [number, number, number], icon: Mail, color: "#3b82f6", label: "Email", count: 12 },
    { position: [-8, 0.5, 0] as [number, number, number], icon: MessageSquare, color: "#10b981", label: "Chat", count: 8 },
    { position: [-8, -1.5, 0] as [number, number, number], icon: Phone, color: "#8b5cf6", label: "Voice", count: 5 },
  ], []);

  const tickets = useMemo(() => [
    { 
      delay: 0, 
      startY: 2.5, 
      ticketInfo: { 
        emoji: "📧", 
        text: "Refund request", 
        subtitle: "Order #45821",
        color: "#3b82f6",
        priority: "high" as const
      } 
    },
    { 
      delay: 1.2, 
      startY: 0.5, 
      ticketInfo: { 
        emoji: "💬", 
        text: "Login issue", 
        subtitle: "Password reset",
        color: "#10b981",
        priority: "medium" as const
      } 
    },
    { 
      delay: 2.4, 
      startY: -1.5, 
      ticketInfo: { 
        emoji: "📞", 
        text: "Upgrade plan", 
        subtitle: "Enterprise tier",
        color: "#8b5cf6",
        priority: "low" as const
      } 
    },
    { 
      delay: 3.6, 
      startY: 2, 
      ticketInfo: { 
        emoji: "📧", 
        text: "Billing error", 
        subtitle: "Duplicate charge",
        color: "#3b82f6",
        priority: "high" as const
      } 
    },
    { 
      delay: 4.8, 
      startY: -0.5, 
      ticketInfo: { 
        emoji: "💬", 
        text: "Feature request", 
        subtitle: "API integration",
        color: "#10b981",
        priority: "low" as const
      } 
    },
  ], []);

  const outcomes = useMemo(() => [
    { position: [9, 2.5, 0] as [number, number, number], emoji: "😊", color: "#10b981", label: "Satisfied", count: 847 },
    { position: [9, 0.5, 0] as [number, number, number], emoji: "⭐", color: "#fbbf24", label: "5-Star", count: 412 },
    { position: [9, -1.5, 0] as [number, number, number], emoji: "❤️", color: "#ec4899", label: "Delighted", count: 289 },
  ], []);

  const happiness = useMemo(() => [
    { 
      delay: 0.8, 
      endY: 2.5, 
      happiness: { 
        emoji: "😊", 
        text: "Refund processed", 
        metric: "Resolved in 45 seconds",
        color: "#10b981" 
      } 
    },
    { 
      delay: 2, 
      endY: 0.5, 
      happiness: { 
        emoji: "⭐", 
        text: "5-star review", 
        metric: "98% satisfaction score",
        color: "#fbbf24" 
      } 
    },
    { 
      delay: 3.2, 
      endY: -1.5, 
      happiness: { 
        emoji: "❤️", 
        text: "Plan upgraded", 
        metric: "Customer retained",
        color: "#ec4899" 
      } 
    },
    { 
      delay: 4.4, 
      endY: 2, 
      happiness: { 
        emoji: "😊", 
        text: "Issue resolved", 
        metric: "First contact resolution",
        color: "#10b981" 
      } 
    },
    { 
      delay: 5.6, 
      endY: -0.5, 
      happiness: { 
        emoji: "⭐", 
        text: "Feature delivered", 
        metric: "Under 24 hours",
        color: "#fbbf24" 
      } 
    },
  ], []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
      
      <Environment preset="city" />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 15]} intensity={3} color="#7c3aed" />
      <pointLight position={[-10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[0, -5, 10]} intensity={2} color="#10b981" />
      
      <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={4} color="#a78bfa" />

      <ParticleField />

      {/* Connection lines between sections */}
      <ConnectionLine start={[-6, 0, 0]} end={[-2, 0, 0]} color="#6366f1" />
      <ConnectionLine start={[2, 0, 0]} end={[7, 0, 0]} color="#10b981" />

      {/* Section 1: Channels (Left) */}
      <SectionLabel position={[-8, 4.5, 0]} title="1. CHANNELS" subtitle="Multi-channel support" align="center" />
      {channels.map((channel, i) => (
        <ChannelIcon key={`channel-${i}`} {...channel} />
      ))}

      {/* Tickets flowing from channels to engine */}
      {tickets.map((ticket, i) => (
        <FlowingTicket key={`ticket-${i}`} {...ticket} />
      ))}

      {/* Section 2: Human Augmentation Engine (Center) */}
      <SectionLabel position={[0, 5.8, 0]} title="2. HUMAN AUGMENTATION ENGINE" subtitle="AI + Human collaboration" align="center" />
      <HumanAugmentationEngine />

      {/* Happiness flowing from engine to outcomes */}
      {happiness.map((happy, i) => (
        <FlowingHappiness key={`happy-${i}`} {...happy} />
      ))}

      {/* Section 3: Outcomes (Right) */}
      <SectionLabel position={[9, 4.5, 0]} title="3. OUTCOMES" subtitle="Delighted customers" align="center" />
      {outcomes.map((outcome, i) => (
        <OutcomeIcon key={`outcome-${i}`} {...outcome} />
      ))}
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
      <div className="w-full py-12">
        <div className="glass-strong rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 animate-fade-in">📧💬📞</div>
              <h3 className="text-xl font-bold mb-2">1. Channels</h3>
              <p className="text-sm text-muted-foreground">Multi-channel support</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-xs px-3 py-1 rounded-full glass">12 Email</span>
                <span className="text-xs px-3 py-1 rounded-full glass">8 Chat</span>
                <span className="text-xs px-3 py-1 rounded-full glass">5 Voice</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full animate-pulse"></div>
                <img src={logoIcon} alt="Pullse" className="w-32 h-32 mx-auto mb-4 relative z-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Human Augmentation Engine</h3>
              <p className="text-sm text-muted-foreground">AI + Human collaboration</p>
              <div className="space-y-2 mt-4">
                <div className="text-xs px-3 py-2 rounded-lg glass flex items-center justify-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>0.8s avg response</span>
                </div>
                <div className="text-xs px-3 py-2 rounded-lg glass flex items-center justify-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  <span>98.5% satisfaction</span>
                </div>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>😊⭐❤️</div>
              <h3 className="text-xl font-bold mb-2">3. Outcomes</h3>
              <p className="text-sm text-muted-foreground">Delighted customers</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-xs px-3 py-1 rounded-full glass">+847 Satisfied</span>
                <span className="text-xs px-3 py-1 rounded-full glass">+412 5-Star</span>
                <span className="text-xs px-3 py-1 rounded-full glass">+289 Delighted</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary/20">
            <p className="text-center text-sm text-muted-foreground">
              Customer requests flow through our AI-powered engine, where human expertise and artificial intelligence collaborate to deliver exceptional experiences.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="relative w-full h-[650px] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <Canvas dpr={[1, 2]} performance={{ min: 0.5 }} gl={{ antialias: true, alpha: true }}>
          <Scene />
        </Canvas>
        
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-background/10"></div>
      </div>

      {/* Bottom explanation */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">📧💬📞</div>
          <strong className="text-foreground block text-xl mb-3">One inbox.</strong>
          <span className="text-muted-foreground">Every message in one place.</span>
        </div>
        
        <div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <Users className="h-8 w-8 text-orange-500" />
          </div>
          <strong className="text-foreground block text-xl mb-3">AI + human, together.</strong>
          <span className="text-muted-foreground">Bots handle routine; AI Agents take approved actions; humans own edge cases.</span>
        </div>
        
        <div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">😊⭐❤️</div>
          <strong className="text-foreground block text-xl mb-3">Better outcomes.</strong>
          <span className="text-muted-foreground">More first-contact resolutions, less busywork, visibility on what changed.</span>
        </div>
      </div>
    </div>
  );
};

export default NodeAnimation;
