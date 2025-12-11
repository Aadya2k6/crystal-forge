import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CrystalButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLoading?: boolean;
}

export const CrystalButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading = false,
  disabled,
  ...props
}: CrystalButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'btn-crystal',
    secondary: 'btn-crystal-secondary',
    ghost: `
      bg-transparent border-2 border-ice-cyan/30 text-primary
      hover:bg-ice-cyan/10 hover:border-ice-cyan/50
      transition-all duration-300
    `,
  };
  
  return (
    <motion.button
      className={cn(
        'relative font-space font-semibold tracking-wide',
        'rounded-xl overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : children}
      </span>
    </motion.button>
  );
};
