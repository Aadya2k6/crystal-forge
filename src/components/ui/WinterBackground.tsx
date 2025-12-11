import { motion } from 'framer-motion';

export const WinterBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Background Snowflakes */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={`snowflake-${i}`}
          className="absolute text-cyan-200/30"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.3
          }}
          animate={{ 
            y: window.innerHeight + 50,
            rotate: 360,
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            fontSize: `${Math.random() * 12 + 8}px`
          }}
        >
          ❄
        </motion.div>
      ))}

      {/* Ice Crystals */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`crystal-${i}`}
          className="absolute w-6 h-6 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-sm"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{ 
            scale: [0, 1, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Snowman Elements */}
      <motion.div
        className="absolute bottom-10 left-10 opacity-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="relative">
          {/* Snowman Body */}
          <div className="w-16 h-16 bg-white/20 rounded-full mb-2"></div>
          <div className="w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto"></div>
          <div className="w-8 h-8 bg-white/20 rounded-full mx-auto"></div>
          {/* Hat */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-slate-800/30 rounded-sm"></div>
        </div>
      </motion.div>

      {/* Second Snowman */}
      <motion.div
        className="absolute bottom-16 right-16 opacity-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-white/20 rounded-full mb-1"></div>
          <div className="w-9 h-9 bg-white/20 rounded-full mb-1 mx-auto"></div>
          <div className="w-6 h-6 bg-white/20 rounded-full mx-auto"></div>
        </div>
      </motion.div>

      {/* Floating Ice Shards */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`shard-${i}`}
          className="absolute w-3 h-8 bg-gradient-to-b from-cyan-200/10 to-transparent transform rotate-12"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 60 + 20}%`
          }}
          animate={{
            rotate: [12, -12, 12],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Winter Wind Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100/5 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};