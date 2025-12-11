import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/layout/Navigation';
import { SnowflakeIntroAnimation } from '../components/animations/SnowflakeIntroAnimation';
import { GlassCard } from '../components/ui/GlassCard';
import { CrystalButton } from '../components/ui/CrystalButton';
import { WinterBackground } from '../components/ui/WinterBackground';
import { Snowflake, Trophy, Users, Calendar, Zap } from 'lucide-react';

export const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleAnimationComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <SnowflakeIntroAnimation onComplete={handleAnimationComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4">
      <WinterBackground />
      <Navigation />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
          >
            <Snowflake className="w-8 h-8 text-cyan-400" />
            <span className="text-cyan-300 font-space text-lg">Winter Hackathon 2024</span>
            <Snowflake className="w-8 h-8 text-cyan-400" />
          </motion.div>
          
          <h1 className="font-space text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 40px #ffffff, 0 0 80px #38bdf8' }}>
            CRYSTAL CODE
          </h1>
          
          <p className="text-xl md:text-2xl text-cyan-100 font-inter font-light mb-8"
             style={{ textShadow: '0 0 30px #67e8f9' }}>
            ❄️ Where Innovation Meets Winter Magic ❄️
          </p>
        </motion.div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <GlassCard className="h-full p-6 text-center hover:scale-105 transition-transform duration-300">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Prize Pool</h3>
              <p className="text-cyan-100 mb-4">$50,000 in prizes and scholarships</p>
              <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Win Big!
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <GlassCard className="h-full p-6 text-center hover:scale-105 transition-transform duration-300">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Team Up</h3>
              <p className="text-cyan-100 mb-4">Form teams of 2-4 brilliant minds</p>
              <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Collaborate!
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <GlassCard className="h-full p-6 text-center hover:scale-105 transition-transform duration-300">
              <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">48 Hours</h3>
              <p className="text-cyan-100 mb-4">January 20-22, 2024</p>
              <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Code Fast!
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <GlassCard className="p-8 text-center">
            <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build the Future?
            </h2>
            <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of developers, designers, and innovators in our winter wonderland of code. 
              Create something amazing in 48 hours!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CrystalButton
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-8 py-4 text-lg"
              >
                Register Your Team
              </CrystalButton>
              
              <CrystalButton
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-100 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 text-lg"
              >
                Learn More
              </CrystalButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};