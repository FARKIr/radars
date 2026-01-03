"use client";

import { Radio } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showText = true,
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Radio className={`${sizeClasses[size]} text-destructive`} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} tracking-tight`}>
          RADARY<span className="text-destructive">.SK</span>
        </span>
      )}
    </div>
  );
}
