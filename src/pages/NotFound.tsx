import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { IceButton } from "@/components/ui/IceButton";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-8 md:p-12 text-center max-w-md" variant="glow">
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/20 border border-destructive/50 flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 20px hsl(0 84% 60% / 0.3)',
                '0 0 40px hsl(0 84% 60% / 0.5)',
                '0 0 20px hsl(0 84% 60% / 0.3)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </motion.div>
          
          <h1 className="font-orbitron text-6xl text-ice-frost mb-4">404</h1>
          <p className="font-rajdhani text-xl text-muted-foreground mb-8">
            This path has frozen over. The page you're looking for doesn't exist.
          </p>
          
          <Link to="/">
            <IceButton>
              <Home className="w-4 h-4 mr-2" />
              Return to Base
            </IceButton>
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default NotFound;
