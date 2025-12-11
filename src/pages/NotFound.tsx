import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { CrystalButton } from "@/components/ui/CrystalButton";
import { Home, AlertTriangle, Snowflake } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Decorative snowflakes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <Snowflake className="w-full h-full text-ice-cyan" strokeWidth={0.5} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 opacity-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <Snowflake className="w-full h-full text-holo-purple" strokeWidth={0.5} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-10 md:p-14 text-center max-w-md" variant="diamond">
          <motion.div
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-glow-warning"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <AlertTriangle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="font-space text-7xl text-glacier-deep font-bold mb-4">404</h1>
          <p className="font-inter text-xl text-foreground/70 mb-8">
            This path has frozen over. The page you're looking for doesn't exist.
          </p>
          
          <Link to="/">
            <CrystalButton>
              <Home className="w-4 h-4 mr-2" />
              Return to Base
            </CrystalButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default NotFound;
