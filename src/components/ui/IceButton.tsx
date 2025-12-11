import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface IceButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLoading?: boolean;
}

export const IceButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading = false,
  disabled,
  ...props
}: IceButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'btn-ice',
    secondary: `
      bg-secondary/50 border border-ice-primary/30 text-ice-glow
      hover:bg-secondary/70 hover:border-ice-primary/50
      hover:shadow-glow
    `,
    ghost: `
      bg-transparent border border-ice-primary/20 text-ice-frost
      hover:bg-ice-primary/10 hover:border-ice-primary/40
    `,
  };
  
  return (
    <motion.button
      className={cn(
        'relative font-orbitron font-semibold tracking-wider uppercase',
        'rounded-lg overflow-hidden transition-all duration-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(185 100% 90% / 0.3) 50%, transparent 100%)',
        }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-ice-frost/30 border-t-ice-frost rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : children}
      </span>
    </motion.button>
  );
};
