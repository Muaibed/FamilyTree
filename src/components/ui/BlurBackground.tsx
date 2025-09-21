import React, { ReactNode } from 'react';

interface BlurBackgroundProps {
  children: ReactNode;
  className?: string;
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen w-full overflow-clip ${className}`}>
      {/* Background with gradient and blur */}
      <div className="bg-blue-300 w-[1000px] h-[1000px] rounded-full absolute -z-1 top-1/2 left-1/2 -translate-x-1/10 -translate-y-1/4 opacity-5 blur-2xl"></div>
      <div className="bg-primary w-[1000px] h-[1000px] rounded-full absolute -z-1 top-1/2 left-1/2 -translate-x-5/6 -translate-y-1/4 opacity-5 blur-2xl"></div>

      <div className="bg-blue-300 w-[1000px] h-[1000px] rounded-full absolute -z-1 top-1/2 right-1/2 -translate-x-1/10 -translate-y-2/3 opacity-5 blur-2xl"></div>
      <div className="bg-primary w-[1000px] h-[1000px] rounded-full absolute -z-1 top-1/2 right-1/2 translate-x-11/12 -translate-y-2/3 opacity-5 blur-2xl"></div>
      
      {/* Content container with glass effect */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`backdrop-blur-md bg-white/10 rounded-xl border border-white/20 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export { BlurBackground, GlassCard };