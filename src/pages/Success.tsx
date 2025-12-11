import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRegistrationStore } from '@/stores/registrationStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { IceButton } from '@/components/ui/IceButton';
import { useEffect, useRef, MouseEvent } from 'react';
import { Sparkles, CheckCircle2, Copy, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HolographicTicket = () => {
  const { teamId, data } = useRegistrationStore();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const copyTeamId = () => {
    if (teamId) {
      navigator.clipboard.writeText(teamId);
      toast({
        title: "Copied!",
        description: "Team ID copied to clipboard",
      });
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-md mx-auto perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        className="relative p-8 rounded-2xl overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              hsl(185 100% 50% / 0.1) 0%, 
              hsl(220 50% 10% / 0.9) 30%,
              hsl(270 100% 50% / 0.1) 70%,
              hsl(185 100% 50% / 0.1) 100%
            )
          `,
          border: '1px solid hsl(185 100% 50% / 0.3)',
          boxShadow: `
            0 0 60px hsl(185 100% 50% / 0.3),
            inset 0 0 60px hsl(185 100% 50% / 0.1)
          `,
        }}
      >
        {/* Holographic shimmer overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                105deg,
                transparent 40%,
                hsl(185 100% 70% / 0.4) 45%,
                hsl(270 100% 70% / 0.4) 50%,
                hsl(45 100% 70% / 0.4) 55%,
                transparent 60%
              )
            `,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
        
        {/* Frost texture */}
        <div className="frost-overlay opacity-5" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="font-rajdhani text-xs tracking-widest text-ice-frost/60 uppercase">
              Team Access Card
            </span>
            <div className="w-8 h-8 rounded-full bg-ice-primary/20 border border-ice-primary/50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-ice-glow" />
            </div>
          </div>
          
          <div className="mb-6">
            <span className="font-rajdhani text-xs text-muted-foreground">Team Name</span>
            <h3 className="font-orbitron text-2xl text-ice-frost">{data.teamName}</h3>
          </div>
          
          <div className="mb-6">
            <span className="font-rajdhani text-xs text-muted-foreground">Team ID</span>
            <div className="flex items-center gap-2">
              <span className="font-orbitron text-xl text-ice-glow text-glow tracking-wider">
                {teamId}
              </span>
              <motion.button
                onClick={copyTeamId}
                className="p-1.5 rounded-lg bg-ice-primary/10 hover:bg-ice-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className="w-4 h-4 text-ice-frost/60" />
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ice-primary/20">
            <div>
              <span className="font-rajdhani text-xs text-muted-foreground">Members</span>
              <p className="font-rajdhani text-lg text-ice-frost">{data.members.length}</p>
            </div>
            <div>
              <span className="font-rajdhani text-xs text-muted-foreground">Level</span>
              <p className="font-rajdhani text-lg text-ice-frost">{data.experience}</p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-ice-frost">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Success = () => {
  const navigate = useNavigate();
  const { teamId, reset } = useRegistrationStore();
  
  useEffect(() => {
    // Redirect if no team ID (direct access)
    if (!teamId) {
      navigate('/register');
    }
  }, [teamId, navigate]);
  
  const handleGoHome = () => {
    reset();
    navigate('/');
  };
  
  if (!teamId) return null;
  
  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-12 px-4">
      {/* Celebration particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              background: `hsl(${185 + Math.random() * 30} 100% ${50 + Math.random() * 30}%)`,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ 
              y: '120vh',
              opacity: [1, 1, 0],
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Success message */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ice-primary/20 border border-ice-primary/50 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px hsl(185 100% 50% / 0.5)',
                  '0 0 60px hsl(185 100% 50% / 0.8)',
                  '0 0 20px hsl(185 100% 50% / 0.5)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full h-full rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-ice-glow" />
            </motion.div>
          </motion.div>
          
          <h1 className="font-orbitron text-4xl md:text-5xl text-ice-frost mb-4">
            <span className="text-ice-glow text-glow-intense">Welcome</span> to the Storm!
          </h1>
          <p className="font-rajdhani text-lg text-muted-foreground max-w-xl mx-auto">
            Your team has been registered successfully. Save your Team Access Card — 
            you'll need it to check in at the event.
          </p>
        </motion.div>
        
        {/* Holographic Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <HolographicTicket />
        </motion.div>
        
        {/* Next steps */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard className="p-6 max-w-md mx-auto text-center">
            <h3 className="font-orbitron text-lg text-ice-frost mb-4">What's Next?</h3>
            <ul className="font-rajdhani text-muted-foreground text-sm space-y-2 mb-6">
              <li>• Check your email for confirmation details</li>
              <li>• Join our Discord community</li>
              <li>• Mark your calendar for Jan 20-22</li>
            </ul>
            
            <IceButton onClick={handleGoHome} variant="secondary">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </IceButton>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
