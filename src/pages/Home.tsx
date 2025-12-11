import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { DiamondPrism } from '@/components/three/DiamondPrism';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { Trophy, Scroll, Clock, Sparkles, Zap, Users, Snowflake } from 'lucide-react';

const HeroDiamond = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={1} color="#80deea" />
        <DiamondPrism position={[0, 0, 0]} scale={1.8} rotationSpeed={0.8} />
      </Suspense>
    </Canvas>
  );
};

const infoCards = [
  {
    icon: Trophy,
    title: 'Grand Prizes',
    description: '$50,000 in prizes, exclusive mentorship opportunities, and the chance to present to industry leaders.',
    color: 'from-holo-pink/30 to-holo-purple/20',
  },
  {
    icon: Scroll,
    title: 'The Rules',
    description: 'Teams of 1-4, 48 hours to build, any tech stack. Create something that pushes boundaries.',
    color: 'from-holo-cyan/30 to-holo-blue/20',
  },
  {
    icon: Clock,
    title: 'Timeline',
    description: 'Registration closes Jan 15th. Hackathon runs Jan 20-22. Finals and awards on Jan 25th.',
    color: 'from-ice-blue/30 to-ice-cyan/20',
  },
];

const features = [
  { icon: Sparkles, text: '48 Hours of Innovation' },
  { icon: Zap, text: 'Real-time Mentorship' },
  { icon: Users, text: '500+ Participants' },
];

const Home = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [shardPositions, setShardPositions] = useState<Array<{x: number, y: number, delay: number}>>([]);
  
  useEffect(() => {
    // Generate shard positions for the shatter effect
    const shards = Array.from({ length: 30 }, () => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      delay: Math.random() * 0.3,
    }));
    setShardPositions(shards);
    
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    
    const introTimer = setTimeout(() => {
      setIntroComplete(true);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(introTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Intro Overlay */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, hsl(186 100% 94%) 0%, hsl(190 80% 75%) 100%)',
          pointerEvents: introComplete ? 'none' : 'auto',
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: introComplete ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Central snowflake that shatters */}
          <motion.div
            className="w-40 h-40 flex items-center justify-center"
            animate={introComplete ? { scale: 0, opacity: 0 } : {}}
            transition={{ duration: 0.3 }}
          >
            <Snowflake 
              className="w-32 h-32 text-ice-cyan drop-shadow-lg" 
              strokeWidth={1}
            />
          </motion.div>
          
          {/* Shatter shards */}
          {introComplete && shardPositions.map((shard, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-4"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(185 100% 80%), 
                  hsl(${185 + Math.random() * 50} 80% 70%)
                )`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x: shard.x,
                y: shard.y,
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 720 - 360,
              }}
              transition={{ 
                duration: 1.2, 
                delay: shard.delay,
                ease: 'easeOut' 
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24">
        {/* Floating Diamond */}
        <motion.div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-72 h-72 md:w-96 md:h-96"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showContent ? 0.8 : 0, y: showContent ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <HeroDiamond />
        </motion.div>
        
        {/* Title */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="inline-block mb-6 px-5 py-2 rounded-full glass-ice border border-ice-cyan/30"
            initial={{ scale: 0 }}
            animate={{ scale: showContent ? 1 : 0 }}
            transition={{ delay: 0.7, type: 'spring' }}
          >
            <span className="font-inter text-primary text-sm font-medium tracking-widest uppercase">
              ❄️ Winter 2024 Edition
            </span>
          </motion.div>
          
          <h1 className="font-space text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
            <span className="block text-glacier-deep">CRYSTAL</span>
            <span className="block text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan via-holo-purple to-ice-blue">
              CODE
            </span>
          </h1>
          
          <motion.p
            className="max-w-2xl mx-auto font-inter text-lg sm:text-xl text-foreground/70 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.9 }}
          >
            Enter the frozen realm of innovation. 48 hours. Unlimited possibilities. 
            Build the future in the most immersive hackathon experience ever created.
          </motion.p>
          
          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ delay: 1.1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-ice border border-ice-cyan/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="font-inter text-sm text-foreground/80">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
            transition={{ delay: 1.4, type: 'spring' }}
          >
            <CrystalButton
              size="lg"
              onClick={() => navigate('/register')}
              className="text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Register Team
            </CrystalButton>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.8 },
            y: { repeat: Infinity, duration: 2 }
          }}
        >
          <div className="w-7 h-12 rounded-full border-2 border-primary/40 flex items-start justify-center p-2 bg-white/30 backdrop-blur-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Info Cards Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-space text-3xl md:text-5xl text-center text-glacier-deep mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan to-holo-purple">Challenge</span>?
          </motion.h2>
          
          <motion.p
            className="text-center text-foreground/60 font-inter mb-16 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Three days of innovation, collaboration, and breakthrough ideas
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard
                  className="p-8 h-full"
                  variant="diamond"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} border border-ice-cyan/30 flex items-center justify-center mb-6 shadow-glow-cyan`}>
                    <card.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="font-space text-xl text-glacier-deep font-semibold mb-4">
                    {card.title}
                  </h3>
                  
                  <p className="font-inter text-foreground/70 leading-relaxed">
                    {card.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-10 md:p-16" variant="diamond">
            <Snowflake className="w-12 h-12 mx-auto mb-6 text-ice-cyan" />
            <h2 className="font-space text-3xl md:text-4xl text-glacier-deep font-bold mb-4">
              Ready to Break the Ice?
            </h2>
            <p className="font-inter text-lg text-foreground/70 mb-8 max-w-xl mx-auto">
              Join hundreds of developers from around the world. Registration closes soon.
            </p>
            <CrystalButton size="lg" onClick={() => navigate('/register')}>
              Register Your Team
            </CrystalButton>
          </GlassCard>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-10 px-4 border-t border-ice-cyan/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-inter text-foreground/50 text-sm">
            © 2024 Crystal Code Hackathon. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Discord', 'Twitter', 'GitHub'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="font-inter text-sm text-foreground/50 hover:text-primary transition-colors"
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

export default Home;
