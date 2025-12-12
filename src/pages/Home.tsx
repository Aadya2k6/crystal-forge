import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';
import { SnowflakeIntroAnimation } from '../components/animations/SnowflakeIntroAnimation';
import { GlassCard } from '../components/ui/GlassCard';
import { CrystalButton } from '../components/ui/CrystalButton';
import { WinterBackground } from '../components/ui/WinterBackground';
import { Snowflake, Trophy, Users, Calendar, Zap, Star, Sparkles, Crown, Heart, ChevronRight, Play, Code2, Gamepad2, Target, DollarSign, Activity, Lightbulb, Brain, Plus, Twitter, Instagram, MessageCircle, ExternalLink, Wifi } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGlowing, setIsGlowing] = useState(false);
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };

  const handleAnimationComplete = () => {
    setShowIntro(false);
  };

  // Floating Interactive Elements
  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {/* Floating Code Symbols */}
      <motion.div
        className="absolute top-20 left-[10%] w-16 h-16 text-cyan-400/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 className="w-full h-full" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-[15%] w-12 h-12 text-purple-400/30"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Target className="w-full h-full" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-[20%] w-20 h-20 text-pink-400/20"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 360],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Gamepad2 className="w-full h-full" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-[10%] w-14 h-14 text-yellow-400/30"
        animate={{
          y: [0, -30, 0],
          x: [0, -15, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Star className="w-full h-full" />
      </motion.div>
    </div>
  );

  if (showIntro) {
    return <SnowflakeIntroAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(56, 189, 248, 0.03) 0%, 
          rgba(168, 85, 247, 0.02) 50%, 
          transparent 100%)`
      }}
    >
      <WinterBackground />
      <FloatingElements />
      <Navigation />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Animated Badge */}
          <motion.div
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 8px 32px rgba(56, 189, 248, 0.2)'
            }}
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6, duration: 1 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 12px 40px rgba(56, 189, 248, 0.3)',
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Snowflake className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <span className="text-white font-space text-lg font-medium">Winter Hackathon 2024</span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Snowflake className="w-6 h-6 text-purple-400" />
            </motion.div>
          </motion.div>
          
          {/* Interactive Main Title */}
          <motion.div
            style={{ rotateX, rotateY }}
            className="mb-6"
          >
            <motion.h1 
              className="font-space text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4"
              style={{ 
                textShadow: '0 0 60px rgba(56, 189, 248, 0.5), 0 0 120px rgba(168, 85, 247, 0.3)',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
                fontFamily: '"Cinzel", "Playfair Display", "Times New Roman", serif'
              }}
              whileHover={{
                scale: 1.05,
                textShadow: '0 0 80px rgba(56, 189, 248, 0.8), 0 0 160px rgba(168, 85, 247, 0.5)'
              }}
            >
              NUMERANO CODE CHALLENGE
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-white font-inter font-light mb-12"
            style={{ 
              textShadow: '0 0 40px rgba(103, 232, 249, 0.6)',
              fontFamily: '"Poppins", "Inter", "Helvetica Neue", sans-serif'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 40px rgba(103, 232, 249, 0.6)',
                  '0 0 60px rgba(249, 168, 212, 0.6)',
                  '0 0 40px rgba(168, 85, 247, 0.6)',
                  '0 0 40px rgba(103, 232, 249, 0.6)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ❄️ Where Innovation Dances with Winter Magic ❄️
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Prize Pool Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/30 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Trophy,
                    title: "Prize Pool",
                    description: "$50,000 in prizes and scholarships",
                    buttonText: "Win Big!",
                    buttonGradient: "from-yellow-400 via-orange-400 to-amber-500",
                    iconColor: "text-yellow-400",
                    delay: 0.4
                  },
                  {
                    icon: Users,
                    title: "Team Up", 
                    description: "Form teams of 2-4 brilliant minds",
                    buttonText: "Collaborate!",
                    buttonGradient: "from-cyan-400 via-blue-400 to-indigo-500",
                    iconColor: "text-cyan-400",
                    delay: 0.5
                  },
                  {
                    icon: Calendar,
                    title: "48 Hours",
                    description: "January 20-22, 2024",
                    buttonText: "Code Fast!",
                    buttonGradient: "from-purple-400 via-pink-400 to-rose-500",
                    iconColor: "text-purple-400",
                    delay: 0.6
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay, duration: 0.6 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="text-center"
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <card.icon className={`w-16 h-16 ${card.iconColor} mx-auto`} />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-3xl font-semibold text-white mb-4" style={{
                      fontFamily: '"Inter", "Segoe UI", "system-ui", sans-serif',
                      letterSpacing: '0.025em'
                    }}>
                      {card.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/90 text-lg mb-8 leading-relaxed font-medium" style={{
                      fontFamily: '"Inter", "system-ui", "Segoe UI", sans-serif',
                      letterSpacing: '0.01em'
                    }}>
                      {card.description}
                    </p>
                    
                    {/* Gradient Button */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        px-8 py-4 rounded-full text-white font-bold text-lg
                        bg-gradient-to-r ${card.buttonGradient}
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        border border-white/20
                        backdrop-blur-sm
                      `}
                    >
                      {card.buttonText}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-cyan-400/50 rounded-full"
                />
              </div>
              
              <div className="absolute bottom-4 right-4">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-pink-400/50 rounded-full"
                />
              </div>
              
              {/* Background sparkles */}
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ice Crystal Themes Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          {/* Ice Crystal Layout Container */}
          <div className="relative flex justify-center items-center min-h-[800px] max-w-7xl mx-auto px-4">
            <style>{`
              /* Updated layout v2.0 */
              .ice-crystal {
                width: 180px;
                height: 180px;
                position: absolute;
                cursor: pointer;
                perspective: 1000px;
                transition: all 0.4s ease;
              }
              
              .ice-crystal-inner {
                width: 100%;
                height: 100%;
                position: relative;
                transform-style: preserve-3d;
                transition: transform 0.8s;
              }
              
              .ice-crystal:hover .ice-crystal-inner {
                transform: rotateY(180deg);
              }
              
              .ice-crystal-face {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                backface-visibility: hidden;
                background: linear-gradient(135deg, 
                  rgba(56, 189, 248, 0.1) 0%,
                  rgba(168, 85, 247, 0.1) 25%, 
                  rgba(249, 168, 212, 0.05) 50%,
                  rgba(56, 189, 248, 0.1) 100%);
                backdrop-filter: blur(20px);
                border: 4px solid;
                border-image: linear-gradient(135deg, 
                  rgba(34, 197, 94, 0.8) 0%,
                  rgba(59, 130, 246, 0.9) 25%,
                  rgba(168, 85, 247, 0.8) 50%,
                  rgba(236, 72, 153, 0.9) 75%,
                  rgba(34, 197, 94, 0.8) 100%
                ) 1;
                box-shadow: 
                  0 0 40px rgba(34, 197, 94, 0.6),
                  inset 0 0 30px rgba(59, 130, 246, 0.3),
                  0 0 80px rgba(168, 85, 247, 0.4);
                clip-path: polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%);
              }
              
              .ice-crystal-back {
                transform: rotateY(180deg);
                background: linear-gradient(135deg, 
                  rgba(5, 150, 105, 0.9) 0%,
                  rgba(59, 130, 246, 0.8) 30%,
                  rgba(168, 85, 247, 0.9) 60%,
                  rgba(236, 72, 153, 0.8) 100%);
                border-image: linear-gradient(135deg, 
                  rgba(236, 72, 153, 1) 0%,
                  rgba(168, 85, 247, 1) 25%,
                  rgba(59, 130, 246, 1) 50%,
                  rgba(5, 150, 105, 1) 75%,
                  rgba(236, 72, 153, 1) 100%
                ) 1;
                box-shadow: 
                  0 0 50px rgba(5, 150, 105, 0.8),
                  inset 0 0 40px rgba(168, 85, 247, 0.4),
                  0 0 100px rgba(236, 72, 153, 0.6);
              }
              
              .ice-content {
                text-align: center;
                padding: 20px;
                color: #0f172a;
                text-shadow: 0 0 15px rgba(5, 150, 105, 0.4), 0 0 30px rgba(59, 130, 246, 0.3);
              }
              
              .ice-title {
                font-size: 1.2rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
              }
              
              .ice-description {
                font-size: 0.9rem;
                line-height: 1.3;
                opacity: 0.9;
              }
              
              /* Central Themes Crystal */
              .central-crystal {
                width: 280px;
                height: 280px;
                background: linear-gradient(135deg, 
                  rgba(56, 189, 248, 0.1) 0%,
                  rgba(168, 85, 247, 0.1) 20%,
                  rgba(249, 168, 212, 0.05) 40%,
                  rgba(5, 150, 105, 0.1) 60%,
                  rgba(56, 189, 248, 0.1) 100%);
                backdrop-filter: blur(30px);
                border: 6px solid;
                border-image: linear-gradient(135deg, 
                  rgba(5, 150, 105, 1) 0%,
                  rgba(59, 130, 246, 1) 16%,
                  rgba(168, 85, 247, 1) 33%,
                  rgba(236, 72, 153, 1) 50%,
                  rgba(168, 85, 247, 1) 66%,
                  rgba(59, 130, 246, 1) 83%,
                  rgba(5, 150, 105, 1) 100%
                ) 1;
                box-shadow: 
                  0 0 60px rgba(5, 150, 105, 0.8),
                  inset 0 0 50px rgba(67, 56, 202, 0.4),
                  0 0 120px rgba(236, 72, 153, 0.6),
                  0 0 200px rgba(59, 130, 246, 0.3);
                clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 10;
              }
              
              .central-title {
                font-size: 2.5rem;
                font-weight: 900;
                color: #0f172a;
                text-shadow: 
                  0 0 20px rgba(5, 150, 105, 0.6),
                  0 0 40px rgba(59, 130, 246, 0.4),
                  0 0 60px rgba(168, 85, 247, 0.3),
                  0 0 80px rgba(236, 72, 153, 0.2);
                letter-spacing: 3px;
              }
              
              /* Positioning around central crystal */
              .crystal-ai { top: 80px; left: 50%; transform: translateX(-50%); }
              .crystal-blockchain { top: 180px; left: 80px; }
              .crystal-health { top: 180px; right: 80px; }
              .crystal-iot { bottom: 120px; left: 120px; }
              .crystal-innovation { bottom: 120px; right: 120px; }
              .crystal-extra { bottom: 50px; left: 50%; transform: translateX(-50%); }
              
              @media (max-width: 768px) {
                .ice-crystal { width: 140px; height: 140px; }
                .central-crystal { width: 220px; height: 220px; }
                .central-title { font-size: 1.8rem; }
                .crystal-ai { top: 60px; }
                .crystal-blockchain { top: 160px; left: 60px; }
                .crystal-health { top: 160px; right: 60px; }
                .crystal-iot { bottom: 100px; left: 80px; }
                .crystal-innovation { bottom: 100px; right: 80px; }
              }
            `}</style>

            {/* Central THEMES Crystal */}
            <motion.div
              className="central-crystal"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
            >
              <div className="central-title">THEMES</div>
            </motion.div>

            {/* AI/ML Crystal */}
            <motion.div
              className="ice-crystal crystal-ai"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="ice-crystal-inner">
                <div className="ice-crystal-face">
                  <div className="ice-content">
                    <Brain className="w-12 h-12 mx-auto mb-2" />
                    <div className="ice-title">AI/ML</div>
                  </div>
                </div>
                <div className="ice-crystal-face ice-crystal-back">
                  <div className="ice-content">
                    <div className="ice-title">AI/ML</div>
                    <div className="ice-description">Create intelligent systems that learn and adapt</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blockchain Crystal */}
            <motion.div
              className="ice-crystal crystal-blockchain"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <div className="ice-crystal-inner">
                <div className="ice-crystal-face">
                  <div className="ice-content">
                    <div className="text-3xl mb-2">⛓️</div>
                    <div className="ice-title">Blockchain</div>
                  </div>
                </div>
                <div className="ice-crystal-face ice-crystal-back">
                  <div className="ice-content">
                    <div className="ice-title">Blockchain</div>
                    <div className="ice-description">Build the future of decentralized technology</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Health Crystal */}
            <motion.div
              className="ice-crystal crystal-health"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="ice-crystal-inner">
                <div className="ice-crystal-face">
                  <div className="ice-content">
                    <Activity className="w-12 h-12 mx-auto mb-2" />
                    <div className="ice-title">Health</div>
                  </div>
                </div>
                <div className="ice-crystal-face ice-crystal-back">
                  <div className="ice-content">
                    <div className="ice-title">Health</div>
                    <div className="ice-description">Transform healthcare with innovative solutions</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* IoT Crystal */}
            <motion.div
              className="ice-crystal crystal-iot"
              initial={{ opacity: 0, y: 100, x: -100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <div className="ice-crystal-inner">
                <div className="ice-crystal-face">
                  <div className="ice-content">
                    <Wifi className="w-12 h-12 mx-auto mb-2" />
                    <div className="ice-title">IoT</div>
                  </div>
                </div>
                <div className="ice-crystal-face ice-crystal-back">
                  <div className="ice-content">
                    <div className="ice-title">IoT</div>
                    <div className="ice-description">Connect everything in the digital world</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Innovation Crystal */}
            <motion.div
              className="ice-crystal crystal-innovation"
              initial={{ opacity: 0, y: 100, x: 100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <div className="ice-crystal-inner">
                <div className="ice-crystal-face">
                  <div className="ice-content">
                    <Lightbulb className="w-12 h-12 mx-auto mb-2" />
                    <div className="ice-title">Innovation</div>
                  </div>
                </div>
                <div className="ice-crystal-face ice-crystal-back">
                  <div className="ice-content">
                    <div className="ice-title">Innovation</div>
                    <div className="ice-description">Innovate beyond boundaries and possibilities</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Snowball Chains Connecting Crystals */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                <linearGradient id="ice-snowball-gradient">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9"/>
                </linearGradient>
                <filter id="ice-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Snowball chains from center to each crystal */}
              {[
                { from: { x: 50, y: 50 }, to: { x: 50, y: 25 }, count: 8 }, // To AI/ML
                { from: { x: 50, y: 50 }, to: { x: 28, y: 38 }, count: 10 }, // To Blockchain
                { from: { x: 50, y: 50 }, to: { x: 72, y: 38 }, count: 10 }, // To Health
                { from: { x: 50, y: 50 }, to: { x: 32, y: 72 }, count: 10 }, // To IoT
                { from: { x: 50, y: 50 }, to: { x: 68, y: 72 }, count: 10 }, // To Innovation
              ].map((chain, chainIndex) => (
                Array.from({ length: chain.count }, (_, i) => {
                  const progress = i / (chain.count - 1);
                  const x = chain.from.x + (chain.to.x - chain.from.x) * progress;
                  const y = chain.from.y + (chain.to.y - chain.from.y) * progress;
                  
                  return (
                    <motion.circle
                      key={`chain-${chainIndex}-${i}`}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="6"
                      fill="url(#ice-snowball-gradient)"
                      filter="url(#ice-glow)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0.7, 1],
                        scale: [0, 1.4, 1, 1.2]
                      }}
                      transition={{
                        duration: 3,
                        delay: 1.8 + chainIndex * 0.2 + i * 0.08,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  );
                })
              )).flat()}
            </svg>
          </div>
        </motion.div>


        {/* Frequently Asked Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-glacier-deep mb-4"
              style={{
                fontFamily: '"Merriweather", "Georgia", "Times New Roman", serif'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Frequently Asked 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600 ml-3">
                Questions
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-foreground/60 max-w-2xl mx-auto"
              style={{
                fontFamily: '"Lato", "Helvetica Neue", "Arial", sans-serif'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              Everything you need to know about Numerano Code Challenge
            </motion.p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What's the team size limit?",
                answer: "Teams can have between 2-4 members. You can register as an individual and we'll help you find teammates, or form your team beforehand.",
                delay: 1.8
              },
              {
                question: "Is participation completely free?",
                answer: "Yes! Numerano Code Challenge is completely free to participate in. This includes meals, snacks, swag, workshops, and access to all hackathon resources.",
                delay: 1.9
              },
              {
                question: "Do I need to be a student to participate?",
                answer: "No! While students are encouraged to participate, professionals, freelancers, and anyone passionate about technology and innovation are welcome.",
                delay: 2.0
              },
              {
                question: "What should I bring to the event?",
                answer: "Bring your laptop, charger, any hardware you want to use, and a positive attitude! We'll provide food, drinks, WiFi, power outlets, and workspace.",
                delay: 2.1
              },
              {
                question: "Can I start working on my project before the event?",
                answer: "No, all coding must start after the opening ceremony. However, you can research ideas, form teams, and plan your approach beforehand.",
                delay: 2.2
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: faq.delay, duration: 0.6 }}
                className="group"
              >
                <details 
                  className="rounded-xl border-2 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                  style={{
                    listStyle: 'none',
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(168, 85, 247, 0.05), rgba(249, 168, 212, 0.03))',
                    backdropFilter: 'blur(20px)',
                    borderImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.7), rgba(56, 189, 248, 0.5), rgba(236, 72, 153, 0.7)) 1'
                  }}
                >
                  <summary 
                    className="flex justify-between items-center w-full p-6 cursor-pointer hover:bg-white/5 transition-colors duration-200"
                    style={{
                      listStyle: 'none',
                      WebkitAppearance: 'none'
                    }}
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-glacier-deep pr-4" style={{
                      fontFamily: '"Nunito Sans", "Open Sans", "Arial", sans-serif'
                    }}>
                      {faq.question}
                    </h3>
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-6 h-6 text-glacier-deep/70 transition-transform duration-300" />
                    </motion.div>
                  </summary>
                  <motion.div 
                    className="px-6 pb-6 pt-2 border-t border-white/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-glacier-deep/80 leading-relaxed text-base md:text-lg" style={{
                      fontFamily: '"Source Serif Pro", "Charter", "Georgia", serif'
                    }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                </details>
              </motion.div>
            ))}
          </div>

          {/* Global CSS for details/summary behavior */}
          <style dangerouslySetInnerHTML={{
            __html: `
              details summary::-webkit-details-marker,
              details summary::marker {
                display: none;
              }
              
              details[open] summary .plus-icon {
                transform: rotate(45deg);
              }
              
              details[open] summary + div {
                animation: fadeIn 0.3s ease-out;
              }
              
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `
          }} />
        </motion.div>

        {/* Enhanced Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="relative"
        >
          <GlassCard 
            className="p-12 text-center relative overflow-hidden border-2"
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(168, 85, 247, 0.1), rgba(249, 168, 212, 0.05))',
              backdropFilter: 'blur(30px)',
              borderImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(56, 189, 248, 0.6), rgba(236, 72, 153, 0.8)) 1'
            }}
          >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Zap className="w-20 h-20 text-yellow-400 mx-auto mb-8" style={{
                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))'
              }} />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-glacier-deep mb-6 relative z-10" style={{
              fontFamily: '"Montserrat", "Helvetica Neue", "Arial", sans-serif'
            }}>
              Ready to Coding 
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% auto' }}
              >
                challenges?
              </motion.span>
            </h2>
            
            <p className="text-cyan-100 text-xl mb-10 max-w-3xl mx-auto leading-relaxed relative z-10" style={{
              fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif'
            }}>
              Test your skills with exciting coding challenges and compete with talented developers from around the world. 
              Solve <em className="text-purple-300" style={{
                fontFamily: '"Playfair Display", "Georgia", serif'
              }}>complex algorithms</em> and showcase your programming expertise!
            </p>
            
            <div className="flex justify-center items-center relative z-10">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <CrystalButton
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-10 py-5 text-xl relative overflow-hidden group"
                  onMouseEnter={() => setIsGlowing(true)}
                  onMouseLeave={() => setIsGlowing(false)}
                  onClick={() => navigate('/register')}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: isGlowing ? '100%' : '-100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  <Play className="w-5 h-5 mr-3" />
                  Register Now
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </CrystalButton>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="relative mt-32 overflow-hidden border-t-2 border-white/30">
        {/* Glass morphism background matching other sections */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(168, 85, 247, 0.25), rgba(249, 168, 212, 0.15))',
            backdropFilter: 'blur(30px)'
          }}
        />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #38bdf8 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #a855f7 0%, transparent 50%)`,
            backgroundSize: '400px 400px'
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-8">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
            
            {/* Column 1: Brand */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <motion.h3 
                  className="text-3xl font-bold font-space mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                  style={{
                    fontFamily: '"Cinzel", "Playfair Display", serif'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  NUMERANO CODE CHALLENGE
                </motion.h3>
                <motion.div 
                  className="flex items-center gap-2 mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Snowflake className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <p className="text-glacier-deep/80 text-lg leading-relaxed max-w-md" style={{
                  fontFamily: '"Source Sans Pro", "Roboto", "Arial", sans-serif'
                }}>
                  Where innovation meets winter magic. Join us for 48 hours of coding, creativity, and community in our winter wonderland hackathon.
                </p>
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6 text-glacier-deep">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Rules & Guidelines', href: '#' },
                  { name: 'Code of Conduct', href: '#' },
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' },
                  { name: 'Contact Support', href: '#' }
                ].map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-glacier-deep/80 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="group-hover:text-cyan-400 transition-colors duration-300">
                        {link.name}
                      </span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Socials */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-6 text-glacier-deep">Connect With Us</h4>
              <div className="space-y-6">
                <p className="text-glacier-deep/80 mb-4">
                  Follow us for updates, announcements, and behind-the-scenes content!
                </p>
                <div className="flex gap-6">
                  {[
                    { 
                      icon: Twitter, 
                      href: 'https://twitter.com/crystalcode', 
                      label: 'Twitter',
                      hoverColor: 'hover:text-sky-400'
                    },
                    { 
                      icon: Instagram, 
                      href: 'https://instagram.com/crystalcode', 
                      label: 'Instagram',
                      hoverColor: 'hover:text-pink-400'
                    },
                    { 
                      icon: MessageCircle, 
                      href: 'https://discord.gg/crystalcode', 
                      label: 'Discord',
                      hoverColor: 'hover:text-indigo-400'
                    }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.hoverColor} transition-all duration-300 transform`}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-8 h-8" />
                    </motion.a>
                  ))}
                </div>
                
                {/* Newsletter Signup */}
                <div className="mt-8">
                  <h5 className="text-sm font-semibold mb-3 text-glacier-deep">Stay Updated</h5>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-glacier-deep placeholder-glacier-deep/60 focus:outline-none focus:border-cyan-400 transition-colors duration-300 backdrop-blur-sm"
                    />
                    <motion.button
                      className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Copyright Notice */}
          <motion.div 
            className="border-t border-white/20 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-glacier-deep/80 text-sm">
                © 2024 Numerano Code Challenge. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-glacier-deep/80 text-sm">Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    color: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ef4444']
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                </motion.div>
                <span className="text-glacier-deep/80 text-sm">and lots of ❄️</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Bottom Gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background: 'linear-gradient(90deg, #38bdf8, #a855f7, #ec4899, #38bdf8)',
            backgroundSize: '400% 100%',
            animation: 'gradientShift 8s ease infinite'
          }}
        />

        {/* Global CSS for footer animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes gradientShift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `
        }} />
      </footer>

    </div>
  );
};

export default Home;