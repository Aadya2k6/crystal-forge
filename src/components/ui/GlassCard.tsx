import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  variant?: 'default' | 'glow' | 'intense';
}

export const GlassCard = ({ 
  children, 
  className,
  glowOnHover = true,
  variant = 'default',
  ...props 
}: GlassCardProps) => {
  const variants = {
    default: 'glass-card',
    glow: 'glass-card-glow',
    intense: 'glass-card-glow glow-border',
  };
  
  return (
    <motion.div
      className={cn(
        variants[variant],
        'relative overflow-hidden',
        glowOnHover && 'transition-all duration-500 hover:shadow-glow-lg',
        className
      )}
      whileHover={glowOnHover ? { 
        y: -5,
        transition: { duration: 0.3 }
      } : undefined}
      {...props}
    >
      {/* Frost texture overlay */}
      <div className="frost-overlay" />
      
      {/* Gradient shine effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, hsl(185 100% 70% / 0.1) 50%, transparent 60%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
