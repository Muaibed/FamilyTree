// components/BlurBackground.tsx
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
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Background with gradient and blur */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-50" />
        
        {/* Decorative circles/blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-50 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500 opacity-50 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-pink-500 opacity-40 blur-3xl" />
      </div>
      
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