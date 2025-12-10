import React from 'react';

interface AuroraProps {
  colorStops?: string[];
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

// Pure CSS Aurora background - simpler alternative to WebGL version
const Aurora: React.FC<AuroraProps> = ({
  colorStops = ['#3b82f6', '#8b5cf6', '#ec4899'],
  className = '',
  blur = '3xl'
}) => {
  const blurClasses = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-3xl'
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${colorStops[0]} 0%, transparent 50%)`
        }}
      />

      {/* Animated orbs */}
      <div
        className={`absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full ${blurClasses[blur]} animate-aurora-1`}
        style={{ background: colorStops[0], opacity: 0.4 }}
      />
      <div
        className={`absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full ${blurClasses[blur]} animate-aurora-2`}
        style={{ background: colorStops[1], opacity: 0.3 }}
      />
      <div
        className={`absolute -bottom-[30%] left-[10%] w-[50%] h-[50%] rounded-full ${blurClasses[blur]} animate-aurora-3`}
        style={{ background: colorStops[2], opacity: 0.3 }}
      />
    </div>
  );
};

export default Aurora;
