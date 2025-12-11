import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Snowflake, Home, UserPlus, Search, Shield } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/register', label: 'Register', icon: UserPlus },
    { path: '/status', label: 'Status', icon: Search },
    { path: '/admin', label: 'Admin', icon: Shield },
  ];
  
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-ice px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-ice-cyan to-holo-blue flex items-center justify-center shadow-glow-cyan"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Snowflake className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-space text-lg font-bold text-glacier-deep tracking-wide hidden sm:block">
              CRYSTAL CODE
            </span>
          </Link>
          
          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={cn(
                      'relative px-4 py-2 rounded-xl font-inter font-medium text-sm',
                      'transition-colors duration-300 flex items-center gap-2',
                      isActive 
                        ? 'text-primary' 
                        : 'text-foreground/60 hover:text-foreground'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:block">{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-ice-cyan/10 border border-ice-cyan/30"
                        layoutId="activeNav"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
