import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
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
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x7c3aed, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x7c3aed, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0f172a, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.TetrahedronGeometry(0.8, 0),
    ];

    const material = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.2,
    });

    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, material.clone());
      mesh.position.x = (index - 1) * 2.5;
      mesh.position.y = 0;
      scene.add(mesh);
      meshesRef.current.push(mesh);
    });

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate meshes
      meshesRef.current.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.005 + index * 0.001;
        mesh.position.y = Math.sin(Date.now() * 0.001 + index) * 0.3;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !camera) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      camera.position.x = x * 0.5;
      camera.position.y = y * 0.5;
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        if (rendererRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      meshesRef.current.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ minHeight: "600px" }}
    />
  );
};

export default ThreeScene;
