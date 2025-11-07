'use client';

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, MeshTransmissionMaterial, Trail, Sparkles, Float, PerspectiveCamera, Environment, Line } from "@react-three/drei";
import * as THREE from "three";
import { Mail, MessageSquare, Phone, Users, Bot, Zap, Clock, TrendingUp, Target, ArrowRight, Activity, CheckCircle2 } from "lucide-react";
import logoIcon from "@/assets/logo-white.svg";

// Optimized particle field background with smoother animation
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 300; // Further reduced for better performance

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      const color = new THREE.Color();
      color.setHSL(0.72 + Math.random() * 0.08, 0.65, 0.45 + Math.random() * 0.25);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return {
      positions,
      colors
    };
  }, []);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Flowing particle that travels along a path
const FlowingPathParticle = ({
  points,
  delay = 0,
  color = "#7c3aed",
  speed = 1
}: {
  points: THREE.Vector3[];
  delay?: number;
  color?: string;
  speed?: number;
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  useFrame((state) => {
    const t = ((state.clock.elapsedTime * speed + delay) % 4) / 4;
    setProgress(t);

    if (particleRef.current && points.length > 0) {
      const index = Math.floor(t * (points.length - 1));
      const nextIndex = Math.min(index + 1, points.length - 1);
      const localT = (t * (points.length - 1)) - index;
      
      const currentPoint = points[index];
      const nextPoint = points[nextIndex];
      
      // Smooth interpolation with easing
      const easedT = localT * localT * (3 - 2 * localT);
      particleRef.current.position.lerpVectors(currentPoint, nextPoint, easedT);
      
      // Smoother scale transition
      const scale = 0.85 + Math.sin(t * Math.PI) * 0.35;
      particleRef.current.scale.setScalar(scale);
    }
  });

  if (progress < 0.02 || progress > 0.98) return null;

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
      <pointLight color={color} intensity={1} distance={1} />
    </mesh>
  );
};

// Black curved arrow paths like in reference image with enhanced flowy movement
const BlackArrowPath = ({
  start,
  end,
  controlOffset = [0, 0, -1.5],
  startQuestion,
  endEmoji,
  delay = 0
}: {
  start: [number, number, number];
  end: [number, number, number];
  controlOffset?: [number, number, number];
  startQuestion?: string;
  endEmoji?: string;
  delay?: number;
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midVec = new THREE.Vector3((start[0] + end[0]) / 2 + controlOffset[0], (start[1] + end[1]) / 2 + controlOffset[1], (start[2] + end[2]) / 2 + controlOffset[2]);
    const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    return curve.getPoints(50);
  }, [start, end, controlOffset]);

  // Add flowy organic movement to the entire line
  useFrame(state => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = (state.clock.elapsedTime + delay) * 1.5;
    }
    
    // Add gentle wave motion to the whole line group
    if (groupRef.current) {
      const time = state.clock.elapsedTime * 0.5 + delay;
      groupRef.current.position.y = Math.sin(time) * 0.15;
      groupRef.current.position.z = Math.cos(time * 0.7) * 0.1;
      groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }
  });
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          // Fast flowing animation for ticket movement
          float flow = fract(vUv.x - time * 0.5);
          
          // Create distinct flowing particles/tickets
          float particlePos = fract(vUv.x * 8.0 - time * 4.0);
          float particle = smoothstep(0.2, 0.3, particlePos) * smoothstep(0.8, 0.7, particlePos);
          
          // Add trailing glow effect behind particles
          float trail = smoothstep(0.0, 0.4, flow) * smoothstep(1.0, 0.6, flow);
          
          // Pulsing effect for liveliness
          float pulse = sin(time * 3.0 + vUv.x * 10.0) * 0.3 + 0.7;
          
          // Purple/Navy gradient colors
          vec3 colorPurple = vec3(0.62, 0.35, 0.85);
          vec3 colorNavy = vec3(0.35, 0.55, 0.85);
          vec3 color = mix(colorPurple, colorNavy, particlePos);
          
          // Combine particle and trail with enhanced brightness
          float alpha = (particle * 1.0 + trail * 0.4) * pulse;
          
          // Boost brightness on particles
          vec3 finalColor = color * (1.0 + particle * 2.0 + trail * 0.8);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);
  
  return <group ref={groupRef}>
      {/* Base line with subtle glow */}
      <Line points={points} color="#5b21b6" lineWidth={6} transparent opacity={0.3} />
      
      {/* Main animated flow tube - thicker for visibility */}
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 50, 0.15, 8, false]} />
        <shaderMaterial ref={materialRef} attach="material" {...shaderMaterial} />
      </mesh>
      
      {/* Outer glow tube with pulsing effect */}
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 50, 0.22, 8, false]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
      </mesh>
      
      {/* Inner bright core */}
      <Line points={points} color="#a78bfa" lineWidth={2} transparent opacity={0.8} />
      
      {/* Flowing particles showing tickets moving through */}
      <FlowingPathParticle points={points} delay={delay} color="#a78bfa" speed={0.8} />
      <FlowingPathParticle points={points} delay={delay + 1.5} color="#7c3aed" speed={0.8} />
      <FlowingPathParticle points={points} delay={delay + 3} color="#c4b5fd" speed={0.8} />
      
      {/* Start question pill */}
      {startQuestion && <Html position={[points[0].x, points[0].y, points[0].z]} center distanceFactor={10}>
          <div className="px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-800 bg-gray-100/90 whitespace-nowrap text-xs font-medium text-gray-800" style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
            {startQuestion}
          </div>
        </Html>}
      
      {/* End emoji */}
      {endEmoji && <Html position={[points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].z]} center distanceFactor={10}>
          <div style={{
        fontSize: '28px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        marginLeft: '30px'
      }}>
            {endEmoji}
          </div>
        </Html>}
    </group>;
};

// Animated Gradient Flow Lines with Arrows and enhanced organic movement
const AnimatedFlowLine = ({
  start,
  end,
  color,
  direction = "forward"
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  direction?: "forward" | "backward";
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(...start), new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2 - 1), new THREE.Vector3(...end)]);
    return curve.getPoints(50);
  }, [start, end]);
  
  useFrame(state => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = direction === "forward" ? state.clock.elapsedTime : -state.clock.elapsedTime;
    }
    
    // Add smooth organic movement
    if (groupRef.current) {
      const time = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(time + start[0]) * 0.2;
      groupRef.current.position.z = Math.cos(time * 1.3 + start[1]) * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.03;
    }
  });
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        color: {
          value: new THREE.Color(color)
        }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float flow = fract(vUv.x - time * 0.3);
          float alpha = smoothstep(0.0, 0.2, flow) * smoothstep(1.0, 0.8, flow);
          gl_FragColor = vec4(color, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, [color]);
  
  return <group ref={groupRef}>
      <Line points={points} color={color} lineWidth={3} transparent opacity={0.4} />
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 50, 0.05, 8, false]} />
        <shaderMaterial ref={materialRef} attach="material" {...shaderMaterial} />
      </mesh>
      {/* Arrow indicators along the path */}
      {[0.3, 0.6, 0.9].map((t, i) => {
      const pos = points[Math.floor(t * points.length)];
      return <Html key={i} position={[pos.x, pos.y, pos.z]} center distanceFactor={15}>
            <div className="animate-pulse" style={{
          color
        }}>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Html>;
    })}
    </group>;
};

// Progress Ring around the logo
const ProgressRing = ({
  radius,
  progress,
  color
}: {
  radius: number;
  progress: number;
  color: string;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });
  return <mesh ref={ringRef} rotation={[0, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.1, 64, 1, 0, Math.PI * 2 * progress]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>;
};

// Processing Status Indicators
const ProcessingIndicator = ({
  text,
  delay
}: {
  text: string;
  delay: number;
}) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    }, 4000 + delay * 1000);
    return () => clearInterval(interval);
  }, [delay]);
  if (!visible) return null;
  return <div className="animate-fade-in glass-strong px-3 py-1.5 rounded-lg border border-primary/40 text-xs font-semibold flex items-center gap-2">
      <Activity className="h-3 w-3 animate-pulse text-primary" />
      {text}
    </div>;
};

// Particle burst effect for celebrations
const ParticleBurst = ({
  position,
  color,
  delay
}: {
  position: [number, number, number];
  color: string;
  delay: number;
}) => {
  const [particles, setParticles] = useState<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
  }>>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticles = Array.from({
        length: 20
      }, () => ({
        position: new THREE.Vector3(...position),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
        life: 1
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1000);
    }, 5000 + delay * 1000);
    return () => clearInterval(interval);
  }, [delay, position]);
  return <>
      {particles.map((particle, i) => <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={particle.life} />
        </mesh>)}
    </>;
};

// Channel icon with hover tooltips - minimal professional design
const ChannelIcon = ({
  position,
  icon,
  color,
  label,
  count
}: {
  position: [number, number, number];
  icon: any;
  color: string;
  label: string;
  count: number;
}) => {
  const Icon = icon;
  const [hovered, setHovered] = useState(false);
  return <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <Html center distanceFactor={8}>
          
        </Html>
      </group>
    </Float>;
};

// Request pill component showing questions flowing through
const RequestPill = ({
  delay,
  question,
  color
}: {
  delay: number;
  question: string;
  color: string;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  useFrame(state => {
    if (!groupRef.current) return;
    const rawT = (state.clock.elapsedTime * 0.15 + delay) % 12;
    let t = rawT;

    // Pause at engine for processing
    if (rawT > 5 && rawT < 6.5) {
      t = 5 + (rawT - 5) * 0.2;
      setIsProcessing(true);
    } else {
      setIsProcessing(false);
    }
    setProgress(t / 12);

    // Path from left to right
    const startX = -9;
    const endX = 10;
    const xPos = startX + (endX - startX) * progress;

    // Gentle wave
    const yWave = Math.sin(progress * Math.PI * 2) * 1.5;
    const yPos = yWave;
    const zDepth = Math.sin(progress * Math.PI) * -1.5;
    groupRef.current.position.set(xPos, yPos, zDepth);
    const scale = isProcessing ? 1.2 : 1;
    groupRef.current.scale.setScalar(scale);
  });
  if (progress < 0.02 || progress > 0.98) return null;
  return <group ref={groupRef}>
      <Html center distanceFactor={10}>
        <div className={`px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${isProcessing ? 'animate-pulse' : ''}`} style={{
        backgroundColor: `${color}15`,
        borderColor: color,
        boxShadow: isProcessing ? `0 0 20px ${color}80` : `0 0 10px ${color}40`
      }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{
          backgroundColor: color
        }} />
          <span className="text-xs font-medium" style={{
          color
        }}>
            {question}
          </span>
        </div>
      </Html>
    </group>;
};

// Enhanced ticket component with cooler colors, depth, and processing states
const FlowingTicket = ({
  delay,
  startY,
  ticketInfo,
  onProcess
}: {
  delay: number;
  startY: number;
  ticketInfo: {
    emoji: string;
    text: string;
    subtitle: string;
    color: string;
    priority: 'low' | 'medium' | 'high';
  };
  onProcess?: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasTriggeredProcess, setHasTriggeredProcess] = useState(false);
  useFrame(state => {
    if (!groupRef.current) return;
    const rawT = (state.clock.elapsedTime * 0.2 + delay) % 10;
    let t = rawT;

    // Pause at engine for processing (around t=4.5-5.5)
    if (rawT > 4.5 && rawT < 5.5) {
      t = 4.5 + (rawT - 4.5) * 0.3; // Slow down dramatically
      if (!isProcessing) {
        setIsProcessing(true);
        if (!hasTriggeredProcess && onProcess) {
          setHasTriggeredProcess(true);
          onProcess();
        }
      }
    } else {
      if (isProcessing) setIsProcessing(false);
      if (rawT < 4.5) setHasTriggeredProcess(false);
    }
    setProgress(t / 10);

    // Sine wave pattern from channels (left) to outcomes (right)
    const startX = -8;
    const endX = 9;
    const xPos = startX + (endX - startX) * progress;

    // Sine wave for Y position with amplitude variation
    const frequency = 3; // Number of waves
    const amplitude = 2; // Height of waves
    const yWave = Math.sin(progress * Math.PI * frequency) * amplitude;
    const yPos = startY + yWave;

    // Z depth variation - go through the globe (negative Z at center)
    const zDepth = Math.sin(progress * Math.PI) * -2; // Dips to -2 at center

    groupRef.current.position.set(xPos, yPos, zDepth);

    // Scale based on progress and state
    const baseScale = 0.8 + Math.abs(Math.sin(progress * Math.PI)) * 0.8;
    const scale = isProcessing ? baseScale * 1.3 : baseScale;
    groupRef.current.scale.setScalar(scale);
  });
  if (progress < 0.05 || progress > 0.95) return null;
  const priorityColors = {
    low: '#10b981',
    medium: '#fbbf24',
    high: '#ef4444'
  };
  return <group ref={groupRef}>
      {/* Add subtle shadow/glow for depth */}
      <mesh position={[0, -0.2, -0.1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
      <Trail width={4} length={20} color={ticketInfo.color} attenuation={t => t * t * t}>
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color={ticketInfo.color} emissive={ticketInfo.color} emissiveIntensity={isProcessing ? 4 : 2} />
        </mesh>
      </Trail>
      {isProcessing && <Sparkles count={15} scale={1.5} size={2} speed={1.5} color="#fbbf24" />}
      <Html center distanceFactor={8}>
        <div className={`rounded transition-all duration-300 ${isProcessing ? 'scale-110' : ''}`} style={{
        width: '10px',
        height: '14px',
        backgroundColor: ticketInfo.color,
        boxShadow: isProcessing ? `0 0 20px ${ticketInfo.color}` : `0 0 8px ${ticketInfo.color}80`,
        filter: isProcessing ? 'brightness(1.3)' : 'none'
      }}></div>
      </Html>
    </group>;
};

// Enhanced happiness with warm colors, depth, and celebration
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
  };
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);
  const [shouldCelebrate, setShouldCelebrate] = useState(false);
  useFrame(state => {
    if (!groupRef.current) return;
    const t = (state.clock.elapsedTime * 0.25 + delay) % 8;
    setProgress(t / 8);

    // Trigger celebration near the end
    if (progress > 0.82 && progress < 0.87 && !shouldCelebrate) {
      setShouldCelebrate(true);
      setTimeout(() => setShouldCelebrate(false), 800);
    }

    // Enhanced Bezier curve with z-depth
    const curve = new THREE.CubicBezierCurve3(new THREE.Vector3(0, 0, -1), new THREE.Vector3(3, endY - 1, -2), new THREE.Vector3(6, endY + 2, 0), new THREE.Vector3(9, endY, 3));
    const point = curve.getPoint(progress);
    groupRef.current.position.copy(point);
    groupRef.current.rotation.z = progress * Math.PI * 2;

    // Grow dramatically as it travels
    const baseScale = 0.3 + progress * 1;
    const scale = shouldCelebrate ? baseScale * 1.8 : baseScale;
    groupRef.current.scale.setScalar(scale);
  });
  if (progress < 0.05 || progress > 0.95) return null;

  // Brighter, warmer colors for success
  const warmColor = happiness.color;
  return <group ref={groupRef}>
      {/* Shadow for depth */}
      <mesh position={[0, -0.3, -0.2]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
      <Trail width={3} length={8} color={warmColor} attenuation={t => t * t}>
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color={warmColor} emissive={warmColor} emissiveIntensity={shouldCelebrate ? 6 : 3.5} />
        </mesh>
      </Trail>
      {shouldCelebrate && <>
          <Sparkles count={50} scale={3} size={4} speed={2.5} color={warmColor} />
          <pointLight position={[0, 0, 0]} intensity={3} color={warmColor} distance={3} />
        </>}
      <Html center distanceFactor={12}>
        <div className={`glass-strong px-5 py-3 rounded-xl flex items-center gap-3 whitespace-nowrap border-l-4 transition-all duration-300 ${shouldCelebrate ? 'scale-150 animate-pulse' : ''}`} style={{
        borderColor: warmColor,
        boxShadow: shouldCelebrate ? `0 16px 64px ${warmColor}100, 0 0 80px ${warmColor}80` : `0 8px 32px ${warmColor}60`,
        background: shouldCelebrate ? `radial-gradient(circle, ${warmColor}30, transparent)` : undefined
      }}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{happiness.emoji}</span>
              <span className="text-sm font-bold">{happiness.text}</span>
              {shouldCelebrate && <CheckCircle2 className="h-4 w-4 text-green-400 animate-bounce" />}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              {happiness.metric}
            </span>
          </div>
        </div>
      </Html>
    </group>;
};

// Outcome indicator with minimal professional design
const OutcomeIcon = ({
  position,
  emoji,
  color,
  label,
  count
}: {
  position: [number, number, number];
  emoji: string;
  color: string;
  label: string;
  count: number;
}) => {
  const [hovered, setHovered] = useState(false);
  return <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <Html center distanceFactor={8}>
          
        </Html>
      </group>
    </Float>;
};

// Enhanced Central Engine with dynamic processing indicators
const HumanAugmentationEngine = ({
  activeTicketType
}: {
  activeTicketType?: string;
}) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const [ticketsProcessed, setTicketsProcessed] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState("0.8s");
  const [progress, setProgress] = useState(0);
  const [aiActive, setAiActive] = useState(false);
  const [humanActive, setHumanActive] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTicketsProcessed(prev => prev + 1);
      const times = ["0.3s", "0.5s", "0.8s", "1.2s"];
      setAvgResponseTime(times[Math.floor(Math.random() * times.length)]);
      setProgress(Math.random());

      // Randomly activate AI or Human
      setAiActive(Math.random() > 0.5);
      setHumanActive(Math.random() > 0.3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  useFrame(state => {
    if (outerRef.current) {
      outerRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      innerRef.current.scale.setScalar(pulse);
    }
  });
  return <group>
      {/* Outer glass shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[3.2, 64, 64]} />
        <MeshTransmissionMaterial transmission={0.99} thickness={1.8} roughness={0.02} chromaticAberration={0.15} anisotropy={1} color="#7c3aed" distortion={0.5} distortionScale={1} temporalDistortion={0.2} />
      </mesh>

      {/* Inner glowing core */}
      <mesh ref={innerRef} scale={0.6}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={2} wireframe transparent opacity={0.5} />
      </mesh>

      {/* Enhanced Sparkles */}
      <Sparkles count={150} scale={7} size={6} speed={0.6} color="#7c3aed" />

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

      {/* Progress Rings */}
      <ProgressRing radius={3.5} progress={progress} color="#7c3aed" />
      <ProgressRing radius={3.7} progress={1 - progress} color="#a78bfa" />

      {/* Dynamic AI + Human indicators */}
      <Float speed={2} floatIntensity={0.5}>
        <group position={[0, 2.8, 2]}>
          <Html center distanceFactor={8}>
            <div className={`glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-2 transition-all duration-300 ${aiActive ? 'border-primary bg-primary/20 scale-110 shadow-lg shadow-primary/50' : 'border-primary/40'}`}>
              <Bot className={`h-5 w-5 ${aiActive ? 'text-primary animate-pulse' : 'text-primary/60'}`} />
              <span className="text-xs font-bold">AI Agent</span>
              {aiActive && <Zap className="h-3 w-3 text-yellow-400 animate-pulse" />}
            </div>
          </Html>
        </group>
      </Float>

      <Float speed={1.8} floatIntensity={0.6}>
        <group position={[0, -2.8, 2]}>
          <Html center distanceFactor={8}>
            <div className={`glass-strong px-4 py-2 rounded-xl flex items-center gap-2 border-2 transition-all duration-300 ${humanActive ? 'border-orange-500 bg-orange-500/20 scale-110 shadow-lg shadow-orange-500/50' : 'border-orange-500/40'}`}>
              <Users className={`h-5 w-5 ${humanActive ? 'text-orange-500 animate-pulse' : 'text-orange-500/60'}`} />
              <span className="text-xs font-bold">Human Expert</span>
              {humanActive && <Activity className="h-3 w-3 text-orange-400 animate-pulse" />}
            </div>
          </Html>
        </group>
      </Float>
      
      {/* Processing Status around the logo */}
      <Float speed={1.4} floatIntensity={0.3}>
        <group position={[-4.2, 1.5, 1.5]}>
          <Html center distanceFactor={12}>
            <ProcessingIndicator text="Analyzing..." delay={0} />
          </Html>
        </group>
      </Float>

      <Float speed={1.3} floatIntensity={0.3}>
        <group position={[4.2, -1.5, 1.5]}>
          <Html center distanceFactor={12}>
            <ProcessingIndicator text="Routing..." delay={1} />
          </Html>
        </group>
      </Float>

      <Float speed={1.5} floatIntensity={0.3}>
        <group position={[0, -4, 1.5]}>
          <Html center distanceFactor={12}>
            <ProcessingIndicator text="Resolving..." delay={2} />
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
          
          <div className="relative flex items-center justify-center w-[1000px] h-[1000px] bg-primary rounded-full p-[53px] shadow-2xl border-4 border-primary/50">
            <img src={logoIcon} alt="Pullse" className="w-full h-full drop-shadow-2xl" />
          </div>
        </div>
      </Html>
    </group>;
};

// Section labels
const SectionLabel = ({
  position,
  title,
  subtitle,
  align = "center"
}: {
  position: [number, number, number];
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
}) => {
  return <group position={position}>
      <Html center distanceFactor={10}>
        
      </Html>
    </group>;
};

// Enhanced main scene with all visual improvements
const Scene = () => {
  const [processingTicket, setProcessingTicket] = useState<string | undefined>();

  // Sample request questions flowing through - reduced for clarity
  const requestQuestions = useMemo(() => [{
    question: "How do I reset my password?",
    color: "#3b82f6",
    delay: 0
  }, {
    question: "Can I upgrade my plan?",
    color: "#8b5cf6",
    delay: 3
  }], []);
  const channels = useMemo(() => [{
    position: [-8, 1.5, 0] as [number, number, number],
    icon: Mail,
    color: "#60a5fa",
    label: "Email",
    count: 12
  }, {
    position: [-8, -1.5, 0] as [number, number, number],
    icon: MessageSquare,
    color: "#34d399",
    label: "Chat",
    count: 8
  }], []);
  const tickets = useMemo(() => [
  // Wave 1 - Email burst
  {
    delay: 0,
    startY: 1.5,
    ticketInfo: {
      emoji: "📧",
      text: "Refund request",
      subtitle: "Order #45821",
      color: "#3b82f6",
      priority: "high" as const
    }
  }, {
    delay: 0.4,
    startY: 1.5,
    ticketInfo: {
      emoji: "📧",
      text: "Order update",
      subtitle: "Shipping status",
      color: "#3b82f6",
      priority: "medium" as const
    }
  }, {
    delay: 1.0,
    startY: 1.5,
    ticketInfo: {
      emoji: "📧",
      text: "Delivery issue",
      subtitle: "Track package",
      color: "#3b82f6",
      priority: "high" as const
    }
  },
  // Wave 2 - Chat burst
  {
    delay: 1.6,
    startY: -1.5,
    ticketInfo: {
      emoji: "💬",
      text: "Login issue",
      subtitle: "Password reset",
      color: "#10b981",
      priority: "high" as const
    }
  }, {
    delay: 2.0,
    startY: -1.5,
    ticketInfo: {
      emoji: "💬",
      text: "Technical support",
      subtitle: "Setup help",
      color: "#10b981",
      priority: "high" as const
    }
  }, {
    delay: 2.6,
    startY: -1.5,
    ticketInfo: {
      emoji: "💬",
      text: "Bug report",
      subtitle: "UI glitch",
      color: "#10b981",
      priority: "medium" as const
    }
  },
  // Wave 3 - Mixed burst
  {
    delay: 3.0,
    startY: 1.5,
    ticketInfo: {
      emoji: "📧",
      text: "Subscription",
      subtitle: "Cancel plan",
      color: "#3b82f6",
      priority: "high" as const
    }
  }, {
    delay: 3.4,
    startY: -1.5,
    ticketInfo: {
      emoji: "💬",
      text: "Demo request",
      subtitle: "Sales inquiry",
      color: "#10b981",
      priority: "medium" as const
    }
  }, {
    delay: 3.8,
    startY: 1.5,
    ticketInfo: {
      emoji: "📧",
      text: "Data export",
      subtitle: "GDPR request",
      color: "#3b82f6",
      priority: "high" as const
    }
  },
  // Wave 4 - Final burst
  {
    delay: 4.5,
    startY: -1.5,
    ticketInfo: {
      emoji: "💬",
      text: "Urgent issue",
      subtitle: "Service down",
      color: "#10b981",
      priority: "high" as const
    }
  }, {
    delay: 5.1,
    startY: 1.5,
    ticketInfo: {
      emoji: "📧",
      text: "Change address",
      subtitle: "Shipping update",
      color: "#3b82f6",
      priority: "medium" as const
    }
  }], []);
  const outcomes = useMemo(() => [{
    position: [9, 1.5, 0] as [number, number, number],
    emoji: "😊",
    color: "#10b981",
    label: "Satisfied",
    count: 847
  }, {
    position: [9, -1.5, 0] as [number, number, number],
    emoji: "⭐",
    color: "#fbbf24",
    label: "5-Star",
    count: 412
  }], []);
  const happiness = useMemo(() => [
  // Outcomes from Wave 1
  {
    delay: 1.2,
    endY: 1.5,
    happiness: {
      emoji: "😊",
      text: "Refund processed",
      metric: "Resolved in 45s",
      color: "#10b981"
    }
  }, {
    delay: 1.6,
    endY: 1.5,
    happiness: {
      emoji: "⭐",
      text: "Order updated",
      metric: "First contact",
      color: "#fbbf24"
    }
  }, {
    delay: 2.2,
    endY: 1.5,
    happiness: {
      emoji: "😊",
      text: "Package tracked",
      metric: "Real-time",
      color: "#10b981"
    }
  },
  // Outcomes from Wave 2
  {
    delay: 2.8,
    endY: -1.5,
    happiness: {
      emoji: "⭐",
      text: "Login restored",
      metric: "Quick resolution",
      color: "#fbbf24"
    }
  }, {
    delay: 3.2,
    endY: -1.5,
    happiness: {
      emoji: "😊",
      text: "Support excellent",
      metric: "Highly rated",
      color: "#10b981"
    }
  }, {
    delay: 3.8,
    endY: -1.5,
    happiness: {
      emoji: "⭐",
      text: "Bug fixed",
      metric: "Same day",
      color: "#fbbf24"
    }
  },
  // Outcomes from Wave 3
  {
    delay: 4.2,
    endY: 1.5,
    happiness: {
      emoji: "😊",
      text: "Plan cancelled",
      metric: "No hassle",
      color: "#10b981"
    }
  }, {
    delay: 4.8,
    endY: -1.5,
    happiness: {
      emoji: "⭐",
      text: "Demo booked",
      metric: "Tomorrow",
      color: "#fbbf24"
    }
  }, {
    delay: 5.0,
    endY: 1.5,
    happiness: {
      emoji: "😊",
      text: "Data exported",
      metric: "Complete",
      color: "#10b981"
    }
  },
  // Outcomes from Wave 4
  {
    delay: 5.7,
    endY: -1.5,
    happiness: {
      emoji: "⭐",
      text: "Service up",
      metric: "5min downtime",
      color: "#fbbf24"
    }
  }, {
    delay: 6.3,
    endY: 1.5,
    happiness: {
      emoji: "😊",
      text: "Address changed",
      metric: "Updated",
      color: "#10b981"
    }
  }], []);
  return <>
      <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={42} near={0.1} far={100} />
      
      {/* Optimized environment with lower quality for performance */}
      <Environment preset="city" background={false} />
      
      {/* Simplified lighting setup for better performance */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 15]} intensity={2.5} color="hsl(262, 83%, 58%)" castShadow={false} />
      <pointLight position={[-10, 10, 10]} intensity={1.8} color="hsl(190, 95%, 42%)" castShadow={false} />
      <pointLight position={[0, -5, 10]} intensity={1.8} color="hsl(152, 69%, 45%)" castShadow={false} />
      
      <spotLight 
        position={[0, 10, 10]} 
        angle={0.5} 
        penumbra={1} 
        intensity={3.5} 
        color="hsl(262, 83%, 70%)" 
        castShadow={false}
        decay={2}
      />

      <ParticleField />
      
      {/* Optimized fog for depth perception */}
      <fog attach="fog" args={['hsl(220, 47%, 11%)', 12, 40]} />

      {/* Multiple curved black arrow paths flowing into center - reduced for clarity */}
      {/* Top group - with question pills */}
      <BlackArrowPath start={[-10, 3.5, 0]} end={[-2, 0.8, 0]} controlOffset={[-2, 1.5, -1.5]} startQuestion="Need refund help" delay={0} />
      <BlackArrowPath start={[-10, 2, 0]} end={[-2.5, 0.3, 0]} controlOffset={[-2.5, 0.8, -1]} startQuestion="Order status?" delay={1} />
      
      {/* Center group */}
      <BlackArrowPath start={[-10, 0, 0]} end={[-2.5, 0, 0]} controlOffset={[-2, -0.2, -2]} startQuestion="Can't login" delay={2.5} />
      
      {/* Bottom group */}
      <BlackArrowPath start={[-10, -2, 0]} end={[-2.5, -0.5, 0]} controlOffset={[-2.5, -0.8, -1]} startQuestion="Wrong charge" delay={4.5} />
      <BlackArrowPath start={[-10, -3.5, 0]} end={[-2, -0.9, 0]} controlOffset={[-2, -1.5, -1.5]} startQuestion="Product broken" delay={5.5} />
      
      {/* Curved black arrows from center to outcome emojis on the right - reduced quantity */}
      {/* Upper outcomes */}
      <BlackArrowPath start={[2.5, 0.8, 0]} end={[8.5, 3.5, 0]} controlOffset={[2, 2, -1.5]} endEmoji="😊" delay={7} />
      <BlackArrowPath start={[2.5, 0.3, 0]} end={[8.5, 2, 0]} controlOffset={[2, 1, -1]} endEmoji="⭐" delay={8} />
      
      {/* Center outcomes */}
      <BlackArrowPath start={[2.5, 0, 0]} end={[9, 0, 0]} controlOffset={[2, 0.2, -2]} endEmoji="😊" delay={9.5} />
      
      {/* Lower outcomes */}
      <BlackArrowPath start={[2.5, -0.5, 0]} end={[8.5, -2, 0]} controlOffset={[2, -1, -1]} endEmoji="⭐" delay={11.5} />
      <BlackArrowPath start={[2.5, -0.8, 0]} end={[8.5, -3.5, 0]} controlOffset={[2, -2, -1.5]} endEmoji="😊" delay={12.5} />

      {/* Section 1: Channels (Left) */}
      <SectionLabel position={[-8, 4.5, 0]} title="1. CHANNELS" subtitle="Multi-channel support" align="center" />
      {channels.map((channel, i) => <ChannelIcon key={`channel-${i}`} {...channel} />)}

      {/* Request pills with questions */}
      {requestQuestions.map((req, index) => <RequestPill key={`request-${index}`} delay={req.delay} question={req.question} color={req.color} />)}

      {/* Tickets flowing from channels to engine */}
      {tickets.map((ticket, i) => <FlowingTicket key={`ticket-${i}`} {...ticket} onProcess={() => setProcessingTicket(ticket.ticketInfo.text)} />)}

      {/* Section 2: Human Augmentation Engine (Center) */}
      <SectionLabel position={[0, 5.8, 0]} title="2. HUMAN AUGMENTATION ENGINE" subtitle="AI + Human collaboration" align="center" />
      <HumanAugmentationEngine activeTicketType={processingTicket} />

      {/* Happiness flowing from engine to outcomes */}
      {happiness.map((happy, i) => <FlowingHappiness key={`happy-${i}`} {...happy} />)}

      {/* Section 3: Outcomes (Right) */}
      <SectionLabel position={[9, 4.5, 0]} title="3. OUTCOMES" subtitle="Delighted customers" align="center" />
      {outcomes.map((outcome, i) => <OutcomeIcon key={`outcome-${i}`} {...outcome} />)}
    </>;
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
    return <div className="w-full py-12">
        <div className="glass-strong rounded-3xl p-12 border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">📧💬📞</div>
              <h3 className="text-xl font-bold mb-2 text-foreground">1. Channels</h3>
              <p className="text-sm text-muted-foreground">Multi-channel support</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-xs px-3 py-1.5 rounded-full glass border border-accent-teal/20 text-foreground">12 Email</span>
                <span className="text-xs px-3 py-1.5 rounded-full glass border border-accent-teal/20 text-foreground">8 Chat</span>
                <span className="text-xs px-3 py-1.5 rounded-full glass border border-accent-teal/20 text-foreground">5 Voice</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full"></div>
                <img src={logoIcon} alt="Pullse" className="w-32 h-32 mx-auto mb-4 relative z-10 drop-shadow-lg" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">2. Human Augmentation Engine</h3>
              <p className="text-sm text-muted-foreground">AI + Human collaboration</p>
              <div className="space-y-2 mt-4">
                <div className="text-xs px-4 py-2 rounded-lg glass border border-primary/20 flex items-center justify-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span className="text-foreground">0.8s avg response</span>
                </div>
                <div className="text-xs px-4 py-2 rounded-lg glass border border-primary/20 flex items-center justify-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span className="text-foreground">98.5% satisfaction</span>
                </div>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">😊⭐❤️</div>
              <h3 className="text-xl font-bold mb-2 text-foreground">3. Outcomes</h3>
              <p className="text-sm text-muted-foreground">Delighted customers</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-xs px-3 py-1.5 rounded-full glass border border-accent-green/20 text-foreground">+847 Satisfied</span>
                <span className="text-xs px-3 py-1.5 rounded-full glass border border-accent-green/20 text-foreground">+412 5-Star</span>
                <span className="text-xs px-3 py-1.5 rounded-full glass border border-accent-green/20 text-foreground">+289 Delighted</span>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-primary/10">
            <p className="text-center text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Customer requests flow through our AI-powered engine, where human expertise and artificial intelligence collaborate to deliver exceptional experiences.
            </p>
          </div>
        </div>
      </div>;
  }
  return <div className="w-full py-12">
      {/* Pill at the top with subtle animation */}
      <div className="flex justify-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <Activity className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            The Pullse Difference
          </span>
        </div>
      </div>
      
      {/* Enhanced container with improved glassmorphism */}
      <div className="relative w-full h-[700px] rounded-[2rem] overflow-hidden glass-strong shadow-2xl hover:shadow-primary/10 transition-shadow duration-500">
        {/* Multi-layered animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-teal/5 animate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent-orange/3 to-transparent opacity-50"></div>
        
        {/* Refined grid overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center center'
        }}></div>
        
        {/* Optimized canvas with performance settings */}
        <Canvas 
          dpr={[1, 1.5]} 
          performance={{ min: 0.5, max: 1 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          frameloop="always"
        >
          <Scene />
        </Canvas>
        
        {/* Enhanced bottom section with better visual hierarchy */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background/95 via-background/60 to-transparent backdrop-blur-xl border-t border-primary/10">
          <div className="grid grid-cols-3 gap-6 h-full items-center px-8 md:px-12">
            {/* Phase 1: Channels */}
            <div className="flex items-center gap-3 group cursor-default hover-scale">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-teal/10 to-accent-teal/5 border border-accent-teal/20 group-hover:from-accent-teal/20 group-hover:to-accent-teal/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent-teal/20">
                <Mail className="h-4 w-4 text-accent-teal" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">Unified Communication</div>
                <div className="text-xs text-muted-foreground truncate">All channels, one place</div>
              </div>
            </div>
            
            {/* Phase 2: Engine */}
            <div className="flex items-center gap-3 justify-center group cursor-default hover-scale">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">Smart Synergy</div>
                <div className="text-xs text-muted-foreground truncate">AI + Human excellence</div>
              </div>
            </div>
            
            {/* Phase 3: Outcomes */}
            <div className="flex items-center gap-3 justify-end group cursor-default hover-scale">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-green/10 to-accent-green/5 border border-accent-green/20 group-hover:from-accent-green/20 group-hover:to-accent-green/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent-green/20">
                <CheckCircle2 className="h-4 w-4 text-accent-green" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">Excellent Outcomes</div>
                <div className="text-xs text-muted-foreground truncate">Faster resolutions</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Refined corner accents with smoother blur */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] animate-float-slow pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-teal/5 rounded-full blur-[120px] animate-float-slower pointer-events-none"></div>
      </div>
    </div>;
};
export default NodeAnimation;
