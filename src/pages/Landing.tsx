import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { FloatingCrystal } from '@/components/three/FloatingCrystal';
import { GlassCard } from '@/components/ui/GlassCard';
import { IceButton } from '@/components/ui/IceButton';
import { Trophy, Scroll, Clock, Sparkles, Zap, Users } from 'lucide-react';

const HeroCrystal = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
        <FloatingCrystal position={[0, 0, 0]} scale={1.5} rotationSpeed={1.5} />
      </Suspense>
    </Canvas>
  );
};

const infoCards = [
  {
    icon: Trophy,
    title: 'Epic Prizes',
    description: '$50,000 in prizes, exclusive mentorship opportunities, and the chance to present to industry leaders.',
    gradient: 'from-yellow-500/20 to-amber-600/10',
  },
  {
    icon: Scroll,
    title: 'The Rules',
    description: 'Teams of 1-4, 48 hours to build, any tech stack. Create something that pushes boundaries.',
    gradient: 'from-purple-500/20 to-violet-600/10',
  },
  {
    icon: Clock,
    title: 'Timeline',
    description: 'Registration closes Jan 15th. Hackathon runs Jan 20-22. Finals and awards on Jan 25th.',
    gradient: 'from-cyan-500/20 to-blue-600/10',
  },
];

const features = [
  { icon: Sparkles, text: '48 Hours of Innovation' },
  { icon: Zap, text: 'Real-time Mentorship' },
  { icon: Users, text: '500+ Participants' },
];

const Landing = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  
  useEffect(() => {
    // Start showing content after intro animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    
    const introTimer = setTimeout(() => {
      setIntroComplete(true);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Intro Overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-void-deep flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: introComplete ? 0 : 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        style={{ pointerEvents: introComplete ? 'none' : 'auto' }}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="w-32 h-32">
            <HeroCrystal />
          </div>
          
          {/* Shatter particles */}
          {introComplete && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-ice-primary"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 500,
                    y: (Math.random() - 0.5) * 500,
                    opacity: 0,
                    scale: 0,
                    rotate: Math.random() * 720,
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* Floating Crystal */}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-96 md:h-96"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showContent ? 0.3 : 0, y: showContent ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroCrystal />
        </motion.div>
        
        {/* Title */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full border border-ice-primary/30 bg-ice-primary/10"
            initial={{ scale: 0 }}
            animate={{ scale: showContent ? 1 : 0 }}
            transition={{ delay: 1, type: 'spring' }}
          >
            <span className="font-rajdhani text-ice-glow text-sm tracking-widest uppercase">
              Winter 2024 Edition
            </span>
          </motion.div>
          
          <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="block text-ice-frost">CRYSTAL</span>
            <span className="block text-glow-intense text-ice-primary">CODE</span>
            <span className="block text-ice-frost/80 text-3xl sm:text-4xl md:text-5xl mt-2">HACKATHON</span>
          </h1>
          
          <motion.p
            className="max-w-2xl mx-auto font-rajdhani text-lg sm:text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1.2 }}
          >
            Enter the frozen realm of innovation. 48 hours. Unlimited possibilities. 
            Build the future in the most immersive hackathon experience ever created.
          </motion.p>
          
          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: 1.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-void-mid/50 border border-ice-primary/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <feature.icon className="w-4 h-4 text-ice-glow" />
                <span className="font-rajdhani text-sm text-ice-frost/80">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
            transition={{ delay: 1.6, type: 'spring' }}
          >
            <IceButton
              size="lg"
              onClick={() => navigate('/register')}
              className="text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Enter the Storm
            </IceButton>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 2 },
            y: { repeat: Infinity, duration: 2 }
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-ice-primary/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-ice-glow"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Info Cards Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-orbitron text-3xl md:text-4xl text-center text-ice-frost mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why <span className="text-ice-glow text-glow">Join</span> the Challenge?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard
                  className="p-6 lg:p-8 h-full"
                  variant="glow"
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} border border-ice-primary/30 flex items-center justify-center mb-6`}>
                    <card.icon className="w-7 h-7 text-ice-glow" />
                  </div>
                  
                  <h3 className="font-orbitron text-xl text-ice-frost mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="font-rajdhani text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 md:p-12" variant="intense">
            <h2 className="font-orbitron text-2xl md:text-4xl text-ice-frost mb-4">
              Ready to <span className="text-ice-glow text-glow">Freeze</span> the Competition?
            </h2>
            <p className="font-rajdhani text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join hundreds of developers from around the world. Registration closes soon.
            </p>
            <IceButton size="lg" onClick={() => navigate('/register')}>
              Register Your Team
            </IceButton>
          </GlassCard>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-10 px-4 border-t border-ice-primary/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-orbitron text-ice-frost/60 text-sm">
            © 2024 Crystal Code Hackathon
          </span>
          <div className="flex gap-6">
            {['Discord', 'Twitter', 'GitHub'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="font-rajdhani text-sm text-ice-frost/60 hover:text-ice-glow transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
