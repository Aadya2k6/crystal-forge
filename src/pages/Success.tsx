import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRegistrationStore } from '@/stores/registrationStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { WinterBackground } from '@/components/ui/WinterBackground';
import { useEffect, useRef, MouseEvent, useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Home, Snowflake } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HolographicTicket = () => {
  const { teamId, data } = useRegistrationStore();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), { stiffness: 300, damping: 30 });
  
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
      className="relative w-full max-w-md mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative p-8 rounded-3xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: `
            linear-gradient(135deg, 
              hsl(0 0% 100% / 0.95) 0%, 
              hsl(186 100% 97% / 0.9) 50%,
              hsl(270 80% 95% / 0.9) 100%
            )
          `,
          border: '2px solid hsl(185 100% 70% / 0.5)',
          boxShadow: `
            0 25px 50px hsl(185 100% 50% / 0.2),
            0 10px 25px hsl(270 80% 50% / 0.1),
            inset 0 2px 10px hsl(0 0% 100% / 0.8)
          `,
        }}
      >
        {/* Holographic rainbow shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                105deg,
                transparent 20%,
                hsl(320 80% 75% / 0.3) 35%,
                hsl(270 80% 75% / 0.3) 42%,
                hsl(185 100% 75% / 0.3) 50%,
                hsl(45 100% 75% / 0.3) 58%,
                hsl(320 80% 75% / 0.3) 65%,
                transparent 80%
              )
            `,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />
        
        {/* Frost texture */}
        <div className="frost-texture opacity-5" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <span className="font-inter text-xs tracking-widest text-foreground/50 uppercase font-medium">
              Team Access Card
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-glow-success">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className="mb-8">
            <span className="font-inter text-xs text-foreground/50 uppercase tracking-wide">Team Name</span>
            <h3 className="font-space text-2xl text-glacier-deep font-bold">{data.teamName}</h3>
          </div>
          
          <div className="mb-8">
            <span className="font-inter text-xs text-foreground/50 uppercase tracking-wide">Team ID</span>
            <div className="flex items-center gap-3">
              <span className="font-space text-xl text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan via-holo-purple to-holo-pink font-bold tracking-wider">
                {teamId}
              </span>
              <motion.button
                onClick={copyTeamId}
                className="p-2 rounded-lg bg-ice-cyan/10 hover:bg-ice-cyan/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Copy className="w-4 h-4 text-primary" />
              </motion.button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-ice-cyan/20">
            <div>
              <span className="font-inter text-xs text-foreground/50 uppercase tracking-wide">Members</span>
              <p className="font-space text-xl text-glacier-deep font-semibold">{data.members.length}</p>
            </div>
            <div>
              <span className="font-inter text-xs text-foreground/50 uppercase tracking-wide">Level</span>
              <p className="font-space text-xl text-glacier-deep font-semibold">{data.experience}</p>
            </div>
          </div>
          
          {/* Decorative snowflake */}
          <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
            <Snowflake className="w-full h-full text-ice-cyan" strokeWidth={0.5} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SnowConfetti = () => {
  const [particles] = useState(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      size: Math.random() * 10 + 5,
      color: ['#ffffff', '#e0f7fa', '#b2ebf2', '#e1bee7', '#b39ddb'][Math.floor(Math.random() * 5)],
    }))
  );
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: '-20px',
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ 
            y: '120vh',
            opacity: [1, 1, 0],
            rotate: 360,
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

const Success = () => {
  const navigate = useNavigate();
  const { teamId, reset } = useRegistrationStore();
  
  useEffect(() => {
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
    <div className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4">
      {/* Winter themed background elements */}
      <WinterBackground />
      
      {/* Snow Confetti */}
      <SnowConfetti />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Success message */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-success to-success/80 mb-8 shadow-glow-success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="font-space text-4xl md:text-6xl text-glacier-deep font-bold mb-4">
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan to-holo-purple">Storm!</span>
          </h1>
          <p className="font-inter text-lg text-foreground/60 max-w-xl mx-auto">
            Your team has been registered successfully. Save your Team Access Card — 
            you'll need it to check in at the event.
          </p>
        </motion.div>
        
        {/* Holographic Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <HolographicTicket />
        </motion.div>
        
        {/* Next steps */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard className="p-8 max-w-md mx-auto text-center" variant="ice">
            <h3 className="font-space text-xl text-glacier-deep font-semibold mb-6">What's Next?</h3>
            <ul className="font-inter text-foreground/60 text-sm space-y-3 mb-8 text-left">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ice-cyan" />
                Check your email for confirmation details
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-holo-purple" />
                Join our Discord community
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-holo-pink" />
                Mark your calendar for Jan 20-22
              </li>
            </ul>
            
            <CrystalButton onClick={handleGoHome} variant="secondary">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </CrystalButton>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
