import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface FrostInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FrostInput = forwardRef<HTMLInputElement, FrostInputProps>(({
  label,
  error,
  className,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      {label && (
        <motion.label
          className={cn(
            'block mb-2 font-inter text-sm font-medium tracking-wide transition-colors',
            isFocused ? 'text-primary' : 'text-foreground/70'
          )}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'input-frost',
            error && 'border-destructive focus:border-destructive',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Focus glow ring */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            boxShadow: isFocused 
              ? '0 0 0 4px hsl(185 100% 50% / 0.15), 0 0 20px hsl(185 100% 50% / 0.1)' 
              : 'none'
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Water flow effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(185 100% 50%), transparent)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </div>
      
      {error && (
        <motion.p
          className="mt-2 text-sm text-destructive font-inter"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

FrostInput.displayName = 'FrostInput';
