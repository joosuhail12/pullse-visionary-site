'use client';

import { motion } from 'framer-motion';

interface FloatingShapesProps {
  variant?: 'minimal' | 'full';
}

const FloatingShapes = ({ variant = 'minimal' }: FloatingShapesProps) => {
  const shapes = [
    {
      size: 'w-32 h-32',
      color: 'bg-primary/10',
      position: 'top-20 right-10',
      delay: 0,
      duration: 8,
    },
    {
      size: 'w-24 h-24',
      color: 'bg-purple-400/10',
      position: 'top-1/3 left-10',
      delay: 1,
      duration: 10,
    },
    {
      size: 'w-40 h-40',
      color: 'bg-blue-400/10',
      position: 'bottom-20 right-1/4',
      delay: 0.5,
      duration: 12,
    },
  ];

  const fullShapes = [
    ...shapes,
    {
      size: 'w-20 h-20',
      color: 'bg-pink-400/10',
      position: 'top-1/2 right-20',
      delay: 1.5,
      duration: 9,
    },
    {
      size: 'w-36 h-36',
      color: 'bg-cyan-400/10',
      position: 'bottom-1/3 left-1/4',
      delay: 2,
      duration: 11,
    },
  ];

  const displayShapes = variant === 'full' ? fullShapes : shapes;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {displayShapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute ${shape.size} ${shape.color} ${shape.position} rounded-full blur-2xl`}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
