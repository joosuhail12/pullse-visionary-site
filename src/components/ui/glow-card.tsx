'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // RGB format: "132, 0, 255"
  glowIntensity?: number;
  glowRadius?: number;
  hoverElevation?: boolean;
  tilt3D?: boolean;
}

export default function GlowCard({
  children,
  className = '',
  glowColor = '132, 0, 255', // Purple by default
  glowIntensity = 0.5,
  glowRadius = 200,
  hoverElevation = true,
  tilt3D = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltAngles, setTiltAngles] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setGlowPosition({ x, y });

    if (tilt3D) {
      const tiltX = ((y - 50) / 50) * 10; // -10 to 10 degrees
      const tiltY = ((x - 50) / 50) * -10; // -10 to 10 degrees
      setTiltAngles({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt3D) {
      setTiltAngles({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        //@ts-ignore
        '--glow-x': `${glowPosition.x}%`,
        '--glow-y': `${glowPosition.y}%`,
        '--glow-color': glowColor,
        '--glow-intensity': isHovered ? glowIntensity : 0,
        '--glow-radius': `${glowRadius}px`,
      }}
      animate={
        tilt3D
          ? {
              rotateX: tiltAngles.x,
              rotateY: tiltAngles.y,
              scale: isHovered ? 1.02 : 1,
            }
          : hoverElevation
          ? {
              y: isHovered ? -4 : 0,
              scale: isHovered ? 1.01 : 1,
            }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}

      {/* Border Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          padding: '2px',
          background: `radial-gradient(
            ${glowRadius}px circle at ${glowPosition.x}% ${glowPosition.y}%,
            rgba(${glowColor}, ${glowIntensity * 0.8}) 0%,
            rgba(${glowColor}, ${glowIntensity * 0.4}) 30%,
            transparent 60%
          )`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: 'exclude',
        }}
      />

      {/* Box Shadow on Hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-all duration-300"
          style={{
            boxShadow: `
              0 4px 20px rgba(${glowColor}, 0.2),
              0 0 30px rgba(${glowColor}, 0.15)
            `,
          }}
        />
      )}
    </motion.div>
  );
}
