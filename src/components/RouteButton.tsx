'use client';

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type RouteButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
};

const RouteButton = ({ href, children, variant = "default", size = "default", className }: RouteButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        router.push(href);
      }}
    >
      {children}
    </Button>
  );
};

export default RouteButton;
