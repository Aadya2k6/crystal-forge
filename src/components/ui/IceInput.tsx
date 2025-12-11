import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface IceInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const IceInput = forwardRef<HTMLInputElement, IceInputProps>(({
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
            'block mb-2 font-rajdhani text-sm tracking-wide transition-colors',
            isFocused ? 'text-ice-glow' : 'text-muted-foreground'
          )}
          animate={{ color: isFocused ? 'hsl(185 100% 70%)' : 'hsl(200 30% 60%)' }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'input-ice',
            error && 'border-destructive focus:border-destructive focus:shadow-none',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* Glow effect on focus */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: '0 0 20px hsl(185 100% 50% / 0.3), inset 0 0 10px hsl(185 100% 50% / 0.1)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Ice crack ripple effect */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4"
              style={{
                background: 'radial-gradient(circle, hsl(185 100% 70% / 0.3) 0%, transparent 70%)',
              }}
              initial={{ scale: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        )}
      </div>
      
      {error && (
        <motion.p
          className="mt-1 text-sm text-destructive"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

IceInput.displayName = 'IceInput';
