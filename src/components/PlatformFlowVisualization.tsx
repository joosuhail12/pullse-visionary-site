'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PlatformFlowVisualizationProps {
  activeStep: number;
  onStepChange?: (step: number) => void;
}

const PlatformFlowVisualization: React.FC<PlatformFlowVisualizationProps> = ({
  activeStep,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const particleSystemsRef = useRef<THREE.Points[]>([]);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetCameraRef = useRef({ x: 0, y: 0, z: 8 });

  // Node configurations with colors matching the design
  const nodeConfigs = [
    { color: 0x3b82f6, emissive: 0x60a5fa, position: [0, 2, 0] }, // Blue - Connect
    { color: 0x8b5cf6, emissive: 0xa78bfa, position: [-2, 0.5, 0] }, // Purple - Route
    { color: 0x10b981, emissive: 0x34d399, position: [0, -1, 0] }, // Green - Automate
    { color: 0xf59e0b, emissive: 0xfbbf24, position: [2, 0.5, 0] }, // Amber - Assist
    { color: 0x06b6d4, emissive: 0x22d3ee, position: [0, 2.5, -1] }, // Cyan - Measure
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 5, 15);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Create nodes (spheres)
    nodeConfigs.forEach((config, index) => {
      // Main sphere
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: config.color,
        emissive: config.emissive,
        emissiveIntensity: 0.4,
        shininess: 100,
        transparent: true,
        opacity: 0.9,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        config.position[0],
        config.position[1],
        config.position[2]
      );
      scene.add(sphere);
      nodesRef.current.push(sphere);

      // Pulsing ring around node
      const ringGeometry = new THREE.TorusGeometry(0.5, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(sphere.position);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      ringsRef.current.push(ring);
    });

    // Create connections (lines between nodes)
    const connections = [
      [0, 1], // Connect -> Route
      [1, 2], // Route -> Automate
      [2, 3], // Automate -> Assist
      [3, 4], // Assist -> Measure
      [0, 4], // Connect -> Measure (loop back)
    ];

    connections.forEach(([startIdx, endIdx]) => {
      const start = nodesRef.current[startIdx].position;
      const end = nodesRef.current[endIdx].position;

      const points = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        const z = start.z + (end.z - start.z) * t;
        points.push(new THREE.Vector3(x, y, z));
      }

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4b5563,
        transparent: true,
        opacity: 0.2,
        linewidth: 1,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    });

    // Create particle systems for each connection
    connections.forEach(([startIdx, endIdx]) => {
      const particleCount = 100;
      const particles = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const startNode = nodesRef.current[startIdx];
      const endNode = nodesRef.current[endIdx];
      const startColor = new THREE.Color(nodeConfigs[startIdx].color);
      const endColor = new THREE.Color(nodeConfigs[endIdx].color);

      for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const x = startNode.position.x + (endNode.position.x - startNode.position.x) * t;
        const y = startNode.position.y + (endNode.position.y - startNode.position.y) * t;
        const z = startNode.position.z + (endNode.position.z - startNode.position.z) * t;

        particles[i * 3] = x;
        particles[i * 3 + 1] = y;
        particles[i * 3 + 2] = z;

        // Interpolate colors
        const color = new THREE.Color().lerpColors(startColor, endColor, t);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleSystem);
      particleSystemsRef.current.push(particleSystem);
    });

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate nodes slowly
      nodesRef.current.forEach((node, index) => {
        node.rotation.y = elapsedTime * 0.2 + index * 0.5;

        // Pulsing effect for active node
        if (index === activeStep) {
          const scale = 1 + Math.sin(elapsedTime * 3) * 0.1;
          node.scale.set(scale, scale, scale);

          // Increase emissive intensity for active node
          if (node.material instanceof THREE.MeshPhongMaterial) {
            node.material.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 2) * 0.2;
          }
        } else {
          node.scale.set(1, 1, 1);
          if (node.material instanceof THREE.MeshPhongMaterial) {
            node.material.emissiveIntensity = 0.3;
          }
        }
      });

      // Animate rings
      ringsRef.current.forEach((ring, index) => {
        ring.rotation.z = elapsedTime * 0.5;

        if (index === activeStep) {
          const scale = 1 + Math.sin(elapsedTime * 3) * 0.15;
          ring.scale.set(scale, scale, 1);
          if (ring.material instanceof THREE.MeshBasicMaterial) {
            ring.material.opacity = 0.5 + Math.sin(elapsedTime * 2) * 0.2;
          }
        } else {
          ring.scale.set(1, 1, 1);
          if (ring.material instanceof THREE.MeshBasicMaterial) {
            ring.material.opacity = 0.2;
          }
        }
      });

      // Animate particles flowing along paths
      particleSystemsRef.current.forEach((particleSystem) => {
        const positions = particleSystem.geometry.attributes.position.array as Float32Array;
        const particleCount = positions.length / 3;

        for (let i = 0; i < particleCount; i++) {
          // Move particles along the path
          const offset = (elapsedTime * 0.5 + i / particleCount) % 1;
          // This creates a flowing effect by shifting particles
          positions[i * 3 + 1] += Math.sin(elapsedTime * 2 + i * 0.1) * 0.001;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
      });

      // Smooth camera movement towards target
      camera.position.x += (targetCameraRef.current.x - camera.position.x) * 0.05;
      camera.position.y += (targetCameraRef.current.y - camera.position.y) * 0.05;
      camera.position.z += (targetCameraRef.current.z - camera.position.z) * 0.05;

      // Camera looks at center
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction for parallax
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Apply parallax to camera target
      targetCameraRef.current.x = mouseRef.current.x * 0.5;
      targetCameraRef.current.y = mouseRef.current.y * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      nodesRef.current.forEach((node) => {
        node.geometry.dispose();
        if (node.material instanceof THREE.Material) {
          node.material.dispose();
        }
      });

      ringsRef.current.forEach((ring) => {
        ring.geometry.dispose();
        if (ring.material instanceof THREE.Material) {
          ring.material.dispose();
        }
      });

      particleSystemsRef.current.forEach((system) => {
        system.geometry.dispose();
        if (system.material instanceof THREE.Material) {
          system.material.dispose();
        }
      });

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [activeStep]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default PlatformFlowVisualization;
