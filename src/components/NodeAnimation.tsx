import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Html, 
  MeshTransmissionMaterial, 
  Trail, 
  Sparkles, 
  Float,
  PerspectiveCamera,
  Environment,
  Text3D
} from "@react-three/drei";
import * as THREE from "three";
import { 
  Mail, MessageSquare, Phone, Users, Bot, Zap
} from "lucide-react";
import logoIcon from "@/assets/logo-icon-purple.png";

// Particle field background
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 800;

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

// Channel icon on the left
const ChannelIcon = ({ position, icon, color, label }: { position: [number, number, number]; icon: any; color: string; label: string }) => {
  const Icon = icon;
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
          />
        </mesh>
        <Html center distanceFactor={8}>
          <div 
            className="flex flex-col items-center gap-2"
          >
            <div 
              className="glass-strong p-4 rounded-2xl"
              style={{ 
                backgroundColor: `${color}20`,
                borderColor: color,
                borderWidth: 2,
                boxShadow: `0 0 30px ${color}50`
              }}
            >
              <Icon className="h-8 w-8" style={{ color }} />
            </div>
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
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

// Happy emoji flowing from engine to outcomes
const FlowingHappiness = ({ delay, endY, happiness }: { delay: number; endY: number; happiness: { emoji: string; text: string; color: string } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.5 + delay) % 5;
    setProgress(t / 5);
    
    // Bezier curve from center engine to right outcomes
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(2, endY - 0.5, -0.5),
      new THREE.Vector3(5, endY + 1, 0),
      new THREE.Vector3(9, endY, 1)
    );
    
    const point = curve.getPoint(progress);
    groupRef.current.position.copy(point);
    groupRef.current.rotation.z = progress * Math.PI * 2;
    
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.5 + opacity * 0.8);
  });

  if (progress < 0.05 || progress > 0.95) return null;

  return (
    <group ref={groupRef}>
      <Trail
        width={3}
        length={18}
        color={happiness.color}
        attenuation={(t) => t * t}
      >
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color={happiness.color}
            emissive={happiness.color}
            emissiveIntensity={2.5}
          />
        </mesh>
      </Trail>
      <Html center distanceFactor={12}>
        <div 
          className="glass-strong px-5 py-3 rounded-xl flex items-center gap-3 whitespace-nowrap border-l-4"
          style={{ 
            borderColor: happiness.color,
            boxShadow: `0 8px 32px ${happiness.color}60`
          }}
        >
          <span className="text-2xl">{happiness.emoji}</span>
          <span className="text-sm font-bold">{happiness.text}</span>
        </div>
      </Html>
    </group>
  );
};

// Outcome indicator on the right
const OutcomeIcon = ({ position, emoji, color, label }: { position: [number, number, number]; emoji: string; color: string; label: string }) => {
  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.3}
          />
        </mesh>
        <Html center distanceFactor={8}>
          <div className="flex flex-col items-center gap-2">
            <div 
              className="glass-strong p-4 rounded-2xl text-3xl"
              style={{ 
                backgroundColor: `${color}20`,
                borderColor: color,
                borderWidth: 2,
                boxShadow: `0 0 30px ${color}60`
              }}
            >
              {emoji}
            </div>
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
          </div>
        </Html>
      </group>
    </Float>
  );
};

// Central Human Augmentation Engine
const HumanAugmentationEngine = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

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

      {/* Sparkles */}
      <Sparkles
        count={120}
        scale={7}
        size={5}
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
            <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-2 border-primary/40">
              <Bot className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold">AI</span>
            </div>
          </Html>
        </group>
      </Float>

      <Float speed={1.8} floatIntensity={0.6}>
        <group position={[0, -2.5, 2]}>
          <Html center distanceFactor={8}>
            <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-2 border-orange-500/40">
              <Users className="h-5 w-5 text-orange-500" />
              <span className="text-xs font-bold">Human</span>
            </div>
          </Html>
        </group>
      </Float>

      {/* MASSIVE Logo */}
      <Html center distanceFactor={1}>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary rounded-full scale-[2.5] opacity-40"></div>
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

// Main scene
const Scene = () => {
  const channels = useMemo(() => [
    { position: [-8, 2.5, 0] as [number, number, number], icon: Mail, color: "#3b82f6", label: "Email" },
    { position: [-8, 0.5, 0] as [number, number, number], icon: MessageSquare, color: "#10b981", label: "Chat" },
    { position: [-8, -1.5, 0] as [number, number, number], icon: Phone, color: "#8b5cf6", label: "Voice" },
  ], []);

  const tickets = useMemo(() => [
    { delay: 0, startY: 2.5, ticketInfo: { emoji: "📧", text: "Refund request", color: "#3b82f6" } },
    { delay: 0.8, startY: 0.5, ticketInfo: { emoji: "💬", text: "Login issue", color: "#10b981" } },
    { delay: 1.6, startY: -1.5, ticketInfo: { emoji: "📞", text: "Upgrade help", color: "#8b5cf6" } },
    { delay: 2.4, startY: 2, ticketInfo: { emoji: "📧", text: "Billing question", color: "#3b82f6" } },
    { delay: 3.2, startY: -0.5, ticketInfo: { emoji: "💬", text: "Bug report", color: "#10b981" } },
    { delay: 4, startY: 1.5, ticketInfo: { emoji: "📞", text: "Need support", color: "#8b5cf6" } },
  ], []);

  const outcomes = useMemo(() => [
    { position: [9, 2.5, 0] as [number, number, number], emoji: "😊", color: "#10b981", label: "Happy" },
    { position: [9, 0.5, 0] as [number, number, number], emoji: "⭐", color: "#fbbf24", label: "5-Star" },
    { position: [9, -1.5, 0] as [number, number, number], emoji: "❤️", color: "#ec4899", label: "Love" },
  ], []);

  const happiness = useMemo(() => [
    { delay: 0.5, endY: 2.5, happiness: { emoji: "😊", text: "Issue resolved!", color: "#10b981" } },
    { delay: 1.3, endY: 0.5, happiness: { emoji: "⭐", text: "5-star review", color: "#fbbf24" } },
    { delay: 2.1, endY: -1.5, happiness: { emoji: "❤️", text: "Customer love", color: "#ec4899" } },
    { delay: 2.9, endY: 2, happiness: { emoji: "😊", text: "Problem solved", color: "#10b981" } },
    { delay: 3.7, endY: -0.5, happiness: { emoji: "⭐", text: "Excellent service", color: "#fbbf24" } },
    { delay: 4.5, endY: 1.5, happiness: { emoji: "❤️", text: "Happy customer", color: "#ec4899" } },
  ], []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={45} />
      
      <Environment preset="city" />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 15]} intensity={3} color="#7c3aed" />
      <pointLight position={[-10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[0, -5, 10]} intensity={2} color="#10b981" />
      
      <spotLight position={[0, 10, 10]} angle={0.5} penumbra={1} intensity={4} color="#a78bfa" />

      <ParticleField />

      {/* Section 1: Channels (Left) */}
      <SectionLabel position={[-8, 4.5, 0]} title="1. CHANNELS" subtitle="Email • Chat • Voice" align="center" />
      {channels.map((channel, i) => (
        <ChannelIcon key={`channel-${i}`} {...channel} />
      ))}

      {/* Tickets flowing from channels to engine */}
      {tickets.map((ticket, i) => (
        <FlowingTicket key={`ticket-${i}`} {...ticket} />
      ))}

      {/* Section 2: Human Augmentation Engine (Center) */}
      <SectionLabel position={[0, 5.5, 0]} title="2. HUMAN AUGMENTATION ENGINE" subtitle="AI + Human collaboration" align="center" />
      <HumanAugmentationEngine />

      {/* Happiness flowing from engine to outcomes */}
      {happiness.map((happy, i) => (
        <FlowingHappiness key={`happy-${i}`} {...happy} />
      ))}

      {/* Section 3: Outcomes (Right) */}
      <SectionLabel position={[9, 4.5, 0]} title="3. OUTCOMES" subtitle="Happy customers" align="center" />
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
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">📧💬📞</div>
              <h3 className="text-xl font-bold mb-2">1. Channels</h3>
              <p className="text-sm text-muted-foreground">Email • Chat • Voice</p>
            </div>
            <div className="text-center">
              <img src={logoIcon} alt="Pullse" className="w-32 h-32 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">2. Human Augmentation Engine</h3>
              <p className="text-sm text-muted-foreground">AI + Human collaboration</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">😊⭐❤️</div>
              <h3 className="text-xl font-bold mb-2">3. Outcomes</h3>
              <p className="text-sm text-muted-foreground">Happy customers</p>
            </div>
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
