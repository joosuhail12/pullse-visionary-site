import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Html, 
  MeshTransmissionMaterial, 
  Trail, 
  Sparkles, 
  Float,
  PerspectiveCamera,
  Environment
} from "@react-three/drei";
import * as THREE from "three";
import { 
  Mail, MessageSquare, AtSign, Zap, CheckCircle, DollarSign, Package, RefreshCw, Users, Bot,
  FileText, AlertCircle, HelpCircle, Smile, Star, ThumbsUp, Heart, TrendingUp
} from "lucide-react";
import logoIcon from "@/assets/logo-icon-purple.png";

// Particle field background
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      // Purple-blue gradient colors
      const color = new THREE.Color();
      color.setHSL(0.7 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
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
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Incoming tickets/issues from left
const IncomingTicket = ({ position, delay, ticket }: { position: [number, number, number]; delay: number; ticket: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.4 + delay) % 6;
    setProgress(t / 6);
    
    // Bezier curve from left to center
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-12, position[1], 2),
      new THREE.Vector3(-7, position[1] + 2.5, 0),
      new THREE.Vector3(-3, position[1] - 1.5, -1),
      new THREE.Vector3(0, 0, 0)
    );
    
    const point = curve.getPoint(progress);
    groupRef.current.position.copy(point);
    
    const tangent = curve.getTangent(progress);
    groupRef.current.lookAt(
      point.x + tangent.x,
      point.y + tangent.y,
      point.z + tangent.z
    );
    
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.5 + opacity * 0.9);
  });

  if (progress < 0.05 || progress > 0.95) return null;

  return (
    <group ref={groupRef}>
      <Trail
        width={3.5}
        length={18}
        color={ticket.color}
        attenuation={(t) => t * t * t}
      >
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color={ticket.color}
            emissive={ticket.color}
            emissiveIntensity={2.2}
          />
        </mesh>
      </Trail>
      <Html center distanceFactor={15}>
        <div 
          className="glass-strong px-5 py-3 rounded-xl flex items-center gap-3 whitespace-nowrap shadow-2xl border-l-4"
          style={{ 
            backgroundColor: `${ticket.color}20`,
            borderColor: ticket.color,
            boxShadow: `0 8px 32px ${ticket.color}50`
          }}
        >
          <ticket.icon className="h-6 w-6" style={{ color: ticket.color }} />
          <div>
            <div className="text-sm font-bold">{ticket.text}</div>
            <div className="text-xs text-muted-foreground">{ticket.subtitle}</div>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Happy customer experiences going out to the right
const HappyExperience = ({ position, delay, experience }: { position: [number, number, number]; delay: number; experience: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.4 + delay) % 6;
    setProgress(t / 6);
    
    // Smooth bezier curve to the right
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3.5, position[1] + 1, -1),
      new THREE.Vector3(7, position[1] + 2, 0),
      new THREE.Vector3(12, position[1], 2)
    );
    
    const point = curve.getPoint(progress);
    groupRef.current.position.copy(point);
    
    const tangent = curve.getTangent(progress);
    groupRef.current.lookAt(
      point.x + tangent.x,
      point.y + tangent.y,
      point.z + tangent.z
    );
    
    const opacity = Math.sin(progress * Math.PI);
    groupRef.current.scale.setScalar(0.4 + opacity * 1);
  });

  if (progress < 0.05 || progress > 0.95) return null;

  return (
    <group ref={groupRef}>
      <Trail
        width={3}
        length={15}
        color={experience.color}
        attenuation={(t) => t * t}
      >
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={experience.color}
            emissive={experience.color}
            emissiveIntensity={2.8}
          />
        </mesh>
      </Trail>
      <Html center distanceFactor={12}>
        <div 
          className="glass-strong px-6 py-3 rounded-xl flex items-center gap-3 whitespace-nowrap shadow-2xl border-l-4"
          style={{
            backgroundColor: `${experience.color}15`,
            borderColor: experience.color,
            boxShadow: `0 8px 40px ${experience.color}60`
          }}
        >
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${experience.color}30` }}
          >
            <experience.icon className="h-5 w-5" style={{ color: experience.color }} />
          </div>
          <div>
            <div className="text-sm font-bold">{experience.text}</div>
            <div className="text-xs text-muted-foreground">{experience.subtitle}</div>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Orbital rings with AI/Human indicators
const OrbitalRing = ({ 
  radius, 
  speed, 
  icon: Icon, 
  label, 
  color 
}: { 
  radius: number; 
  speed: number; 
  icon: any;
  label: string;
  color: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !particleRef.current) return;
    const t = state.clock.elapsedTime * speed;
    
    particleRef.current.position.x = Math.cos(t) * radius;
    particleRef.current.position.y = Math.sin(t) * radius * 0.8;
    particleRef.current.position.z = Math.sin(t * 0.5) * 1;
    
    groupRef.current.rotation.z = t * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Ring path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      
      {/* Orbiting particle */}
      <Trail
        width={2}
        length={20}
        color={color}
        attenuation={(t) => t * t * t}
      >
        <mesh ref={particleRef}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={3}
          />
        </mesh>
      </Trail>
      
      {/* Label */}
      <Html
        position={[
          Math.cos(0) * (radius + 1),
          Math.sin(0) * (radius + 1) * 0.8,
          0
        ]}
        center
        distanceFactor={12}
      >
        <div className="glass-strong px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl border-2" style={{ borderColor: color }}>
          <Icon className="h-4 w-4" style={{ color }} />
          <span className="text-xs font-bold">{label}</span>
        </div>
      </Html>
    </group>
  );
};

// Massive central orb with multiple layers
const CentralHub = () => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      outerRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      innerRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Outer glass shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={0.99}
          thickness={1.5}
          roughness={0.02}
          chromaticAberration={0.12}
          anisotropy={1}
          color="#7c3aed"
          distortion={0.4}
          distortionScale={0.8}
          temporalDistortion={0.2}
        />
      </mesh>

      {/* Middle energy layer */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={innerRef} scale={0.75}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={1.2}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>

      {/* Glowing core */}
      <mesh ref={coreRef} scale={0.5}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Volumetric sparkles */}
      <Sparkles
        count={100}
        scale={6}
        size={4}
        speed={0.6}
        color="#7c3aed"
      />

      {/* Rotating rings */}
      <Float speed={1.5} rotationIntensity={0.3}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4}>
        <mesh rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[4.5, 0.08, 16, 100]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.25} />
        </mesh>
      </Float>

      {/* MASSIVE Logo */}
      <Html center distanceFactor={1}>
        <div className="relative">
          {/* Multi-layer glow */}
          <div className="absolute inset-0 blur-3xl bg-primary rounded-full scale-[2] opacity-40"></div>
          <div className="absolute inset-0 blur-2xl bg-primary/60 rounded-full scale-150"></div>
          
          {/* Logo container */}
          <div className="relative flex items-center justify-center w-40 h-40 bg-white rounded-full p-8 shadow-2xl border-4 border-primary/40 backdrop-blur-sm">
            <img src={logoIcon} alt="Pullse" className="w-full h-full drop-shadow-2xl animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </Html>
    </group>
  );
};

// Floating action notifications
const ActionNotification = () => {
  const [visible, setVisible] = useState(false);
  const [actionIndex, setActionIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);

  const actions = [
    { icon: DollarSign, text: "Refund processed", amount: "$149.99", color: "#10b981" },
    { icon: Package, text: "Shipping updated", info: "Order #8742", color: "#3b82f6" },
    { icon: RefreshCw, text: "Plan upgraded", info: "Pro → Enterprise", color: "#8b5cf6" },
    { icon: CheckCircle, text: "Issue resolved", info: "CSAT: 5⭐", color: "#10b981" },
  ];

  const current = actions[actionIndex];

  useFrame((state) => {
    const t = state.clock.elapsedTime % 5;
    const shouldShow = t > 3.2 && t < 4.8;
    
    if (shouldShow && !visible) {
      setActionIndex((prev) => (prev + 1) % actions.length);
    }
    
    setVisible(shouldShow);
    
    if (groupRef.current && shouldShow) {
      const progress = (t - 3.2) / 1.6;
      const y = 3.5 + Math.sin(progress * Math.PI) * 1.2;
      const scale = Math.sin(progress * Math.PI) * 1.4;
      groupRef.current.position.y = y;
      groupRef.current.scale.setScalar(scale);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <Html center>
        <div 
          className="glass-strong px-8 py-5 rounded-2xl shadow-2xl border-2 animate-fade-in"
          style={{ 
            borderColor: current.color,
            boxShadow: `0 12px 48px ${current.color}50, 0 0 0 1px ${current.color}30`
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-4 rounded-xl"
              style={{ 
                backgroundColor: `${current.color}30`,
                boxShadow: `0 0 30px ${current.color}50`
              }}
            >
              <current.icon className="h-8 w-8" style={{ color: current.color }} />
            </div>
            <div>
              <div className="text-lg font-bold mb-1">{current.text}</div>
              <div className="text-sm text-muted-foreground">{current.amount || current.info}</div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Camera controller for dynamic movement
const CameraController = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Main scene
const Scene = () => {
  const incomingTickets = useMemo(() => [
    { ticket: { icon: FileText, text: "Ticket #4821", subtitle: "Refund request", color: "#f59e0b" }, delay: 0, position: [0, 2.5, 0] as [number, number, number] },
    { ticket: { icon: AlertCircle, text: "Issue reported", subtitle: "Login problem", color: "#ef4444" }, delay: 1, position: [0, 0.8, 0] as [number, number, number] },
    { ticket: { icon: HelpCircle, text: "Question #3904", subtitle: "How to upgrade?", color: "#3b82f6" }, delay: 2, position: [0, -1.2, 0] as [number, number, number] },
    { ticket: { icon: FileText, text: "Ticket #4822", subtitle: "Shipping delay", color: "#f59e0b" }, delay: 3, position: [0, 1.8, 0] as [number, number, number] },
    { ticket: { icon: AlertCircle, text: "Bug report", subtitle: "Payment failed", color: "#ef4444" }, delay: 4, position: [0, -0.5, 0] as [number, number, number] },
    { ticket: { icon: HelpCircle, text: "Support #9102", subtitle: "Need help", color: "#3b82f6" }, delay: 5, position: [0, 2, 0] as [number, number, number] },
  ], []);

  const happyExperiences = useMemo(() => [
    { experience: { icon: Smile, text: "Happy Customer", subtitle: "Issue resolved ✓", color: "#10b981" }, delay: 0.6, position: [0, 2.2, 0] as [number, number, number] },
    { experience: { icon: Star, text: "5-Star Review", subtitle: "Excellent service!", color: "#fbbf24" }, delay: 1.6, position: [0, 0.5, 0] as [number, number, number] },
    { experience: { icon: ThumbsUp, text: "Problem Solved", subtitle: "Quick response", color: "#10b981" }, delay: 2.6, position: [0, -1.5, 0] as [number, number, number] },
    { experience: { icon: Heart, text: "Customer Love", subtitle: "CSAT: 98%", color: "#ec4899" }, delay: 3.6, position: [0, 1.5, 0] as [number, number, number] },
    { experience: { icon: TrendingUp, text: "Upgraded Plan", subtitle: "Satisfied customer", color: "#8b5cf6" }, delay: 4.6, position: [0, -0.8, 0] as [number, number, number] },
    { experience: { icon: Smile, text: "Delighted User", subtitle: "Fast resolution", color: "#10b981" }, delay: 5.6, position: [0, 2, 0] as [number, number, number] },
  ], []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
      <CameraController />
      
      <Environment preset="city" />
      
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 15]} intensity={3} color="#7c3aed" />
      <pointLight position={[-10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[0, -10, 10]} intensity={2} color="#10b981" />
      
      <spotLight
        position={[0, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={4}
        color="#a78bfa"
      />

      {/* Background particles */}
      <ParticleField />

      {/* Incoming tickets from left */}
      {incomingTickets.map((item, i) => (
        <IncomingTicket key={`ticket-${i}`} {...item} />
      ))}

      {/* Central hub */}
      <CentralHub />

      {/* Orbital indicators */}
      <OrbitalRing radius={4.5} speed={0.3} icon={Bot} label="AI Engine" color="#7c3aed" />
      <OrbitalRing radius={5.5} speed={-0.2} icon={Users} label="Human" color="#f59e0b" />

      {/* Happy experiences going out to the right */}
      {happyExperiences.map((item, i) => (
        <HappyExperience key={`experience-${i}`} {...item} />
      ))}

      {/* Action notifications */}
      <ActionNotification />
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
        <div className="glass-strong rounded-3xl p-12 text-center">
          <img src={logoIcon} alt="Pullse" className="w-48 h-48 mx-auto mb-8 opacity-90" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6">
              <strong className="text-foreground block text-xl mb-3">One inbox.</strong>
              <span className="text-muted-foreground">Every message in one place.</span>
            </div>
            <div className="p-6">
              <strong className="text-foreground block text-xl mb-3">AI + human, together.</strong>
              <span className="text-muted-foreground">Bots handle routine; AI Agents take approved actions; humans own edge cases.</span>
            </div>
            <div className="p-6">
              <strong className="text-foreground block text-xl mb-3">Better outcomes.</strong>
              <span className="text-muted-foreground">More first-contact resolutions, less busywork, visibility on what changed.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      {/* Main 3D Canvas */}
      <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <Canvas
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
        
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-background/10"></div>
      </div>

      {/* Bottom explanation cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-transform">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <strong className="text-foreground block text-xl mb-3">One inbox.</strong>
          <span className="text-muted-foreground">Every message in one place.</span>
        </div>
        
        <div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-transform">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <strong className="text-foreground block text-xl mb-3">AI + human, together.</strong>
          <span className="text-muted-foreground">Bots handle routine; AI Agents take approved actions; humans own edge cases.</span>
        </div>
        
        <div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-transform">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <strong className="text-foreground block text-xl mb-3">Better outcomes.</strong>
          <span className="text-muted-foreground">More first-contact resolutions, less busywork, visibility on what changed.</span>
        </div>
      </div>
    </div>
  );
};

export default NodeAnimation;
