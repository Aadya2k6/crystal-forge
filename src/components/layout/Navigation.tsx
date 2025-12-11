import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/register', label: 'Register' },
  ];
  
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-ice-gradient border border-ice-primary/50 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-ice-glow font-orbitron font-bold text-lg">C</span>
          </motion.div>
          <span className="font-orbitron text-ice-frost font-semibold tracking-wider text-glow hidden sm:block">
            CRYSTAL CODE
          </span>
        </Link>
        
        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`
                    relative px-4 py-2 rounded-lg font-rajdhani font-medium tracking-wide
                    transition-colors duration-300
                    ${isActive ? 'text-ice-glow' : 'text-ice-frost/70 hover:text-ice-frost'}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-ice-primary/10 border border-ice-primary/30"
                      layoutId="activeNav"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};
