import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

interface PageLiquidBackgroundProps {
  opacity?: number;
  colors?: string[];
}

const PageLiquidBackground = ({ 
  opacity = 0.3,
  colors = ['#FF00C8', '#A805FF', '#D3A9EA']
}: PageLiquidBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none" style={{ opacity }}>
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
    </div>
  );
};

export default PageLiquidBackground;
