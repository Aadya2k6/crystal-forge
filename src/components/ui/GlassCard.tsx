import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: 'ice' | 'diamond' | 'frost';
  hover3D?: boolean;
}

export const GlassCard = ({ 
  children, 
  className,
  variant = 'ice',
  hover3D = true,
  ...props 
}: GlassCardProps) => {
  const variants = {
    ice: 'glass-ice',
    diamond: 'glass-diamond',
    frost: 'glass-ice opacity-90',
  };
  
  return (
    <motion.div
      className={cn(
        variants[variant],
        'relative overflow-hidden',
        className
      )}
      whileHover={hover3D ? { 
        y: -8,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.3 }
      } : undefined}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {/* Frost texture */}
      <div className="frost-texture" />
      
      {/* Top highlight */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(0 0% 100%), transparent)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
