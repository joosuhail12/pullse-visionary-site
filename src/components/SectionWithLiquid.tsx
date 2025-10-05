import { lazy, Suspense, ReactNode } from "react";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));

interface SectionWithLiquidProps {
  children: ReactNode;
  className?: string;
  opacity?: number;
  colors?: string[];
}

const SectionWithLiquid = ({ 
  children, 
  className = "", 
  opacity = 0.3,
  colors = ['#FF00C8', '#A805FF', '#D3A9EA']
}: SectionWithLiquidProps) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* LiquidEther overlay */}
      <div className="absolute inset-0 -z-10" style={{ opacity }}>
        <Suspense fallback={<div className="w-full h-full" />}>
          <LiquidEther
            colors={colors}
            mouseForce={25}
            cursorSize={120}
            isViscous={false}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.3}
            autoIntensity={1.8}
            takeoverDuration={0.3}
            autoResumeDelay={4000}
            autoRampDuration={0.8}
          />
        </Suspense>
      </div>
      
      {/* Content */}
      {children}
    </section>
  );
};

export default SectionWithLiquid;
