import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SnowflakeIntroAnimationProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetX: number;
  targetY: number;
  isConverging: boolean;
  rotation: number;
  rotationSpeed: number;
  angle: number;
  radius: number;
  originalRadius: number;
  branchIndex: number;
  positionOnBranch: number;
}

interface BackgroundFlake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
}

export const SnowflakeIntroAnimation = ({ onComplete }: SnowflakeIntroAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const backgroundFlakesRef = useRef<BackgroundFlake[]>([]);
  const startTime = useRef<number>(Date.now());
  const [phase, setPhase] = useState<string>('forming');
  const [circlePosition, setCirclePosition] = useState({ x: -100, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createBackgroundFlake = (): BackgroundFlake => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: Math.random() * 0.5 + 0.5,
      size: Math.random() * 4 + 2,
      alpha: Math.random() * 0.6 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    });

    const createParticle = (angle: number, radius: number, branchIndex: number, positionOnBranch: number): Particle => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: Math.random() * 8 + 5, // Larger particles
      alpha: 0.95,
      targetX: 0,
      targetY: 0,
      isConverging: false,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05, // Slower rotation
      angle,
      radius,
      originalRadius: radius,
      branchIndex,
      positionOnBranch,
    });

    const drawBackgroundFlake = (ctx: CanvasRenderingContext2D, flake: BackgroundFlake) => {
      ctx.save();
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);
      ctx.globalAlpha = flake.alpha;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 3;
      ctx.shadowColor = '#67e8f9';

      const spokes = 6;
      const spokeLength = flake.size;

      for (let i = 0; i < spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * spokeLength, Math.sin(angle) * spokeLength);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = particle.alpha;

      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8; // Reduced shadow for performance
      ctx.shadowColor = '#67e8f9';

      const spokes = 6;
      const spokeLength = particle.size;

      for (let i = 0; i < spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * spokeLength, Math.sin(angle) * spokeLength);
        ctx.stroke();

        const branchLength = spokeLength * 0.5;
        const branchAngle1 = angle - Math.PI / 6;
        const branchAngle2 = angle + Math.PI / 6;
        
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * spokeLength * 0.6, Math.sin(angle) * spokeLength * 0.6);
        ctx.lineTo(Math.cos(branchAngle1) * branchLength + Math.cos(angle) * spokeLength * 0.6, 
                  Math.sin(branchAngle1) * branchLength + Math.sin(angle) * spokeLength * 0.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * spokeLength * 0.6, Math.sin(angle) * spokeLength * 0.6);
        ctx.lineTo(Math.cos(branchAngle2) * branchLength + Math.cos(angle) * spokeLength * 0.6, 
                  Math.sin(branchAngle2) * branchLength + Math.sin(angle) * spokeLength * 0.6);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(0, 0, particle.size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const initBackgroundFlakes = () => {
      backgroundFlakesRef.current = [];
      for (let i = 0; i < 50; i++) {
        backgroundFlakesRef.current.push(createBackgroundFlake());
      }
    };

    const initParticles = () => {
      particlesRef.current = [];
      const branches = 6; // 6 main branches for snowflake
      const particlesPerBranch = 6; // Reduced for performance
      const maxRadius = 180; // Slightly smaller but still large
      
      // Center particle
      particlesRef.current.push(createParticle(0, 0, -1, 0));
      
      for (let branch = 0; branch < branches; branch++) {
        const branchAngle = (branch / branches) * Math.PI * 2;
        
        for (let i = 1; i <= particlesPerBranch; i++) {
          const radius = (i / particlesPerBranch) * maxRadius;
          
          // Main branch particle
          particlesRef.current.push(createParticle(branchAngle, radius, branch, i));
          
          // Only add side branches for outer particles to reduce count
          if (i >= 4) {
            const sideLength = radius * 0.5;
            const sideAngle1 = branchAngle - Math.PI / 6;
            const sideAngle2 = branchAngle + Math.PI / 6;
            
            particlesRef.current.push(createParticle(sideAngle1, sideLength, branch, i + 0.1));
            particlesRef.current.push(createParticle(sideAngle2, sideLength, branch, i + 0.2));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentTime = Date.now();
      const elapsed = currentTime - startTime.current;
      const centerY = canvas.height / 2;

      // Phase transitions - much slower and more elegant
      if (phase === 'forming' && elapsed > 2000) {
        setPhase('rolling');
      } else if (phase === 'rolling' && elapsed > 6000) {
        setPhase('centering');
      } else if (phase === 'centering' && elapsed > 7500) {
        setPhase('burst');
      } else if (phase === 'burst' && elapsed > 12000) { // Much longer burst phase
        setPhase('text');
      } else if (phase === 'text' && elapsed > 16000) {
        setPhase('fadeOut');
      } else if (phase === 'fadeOut' && elapsed > 17500) {
        onComplete();
      }

      // Update circle position during rolling phase
      if (phase === 'rolling') {
        const rollProgress = Math.min((elapsed - 2000) / 4000, 1);
        const easeProgress = 1 - Math.pow(1 - rollProgress, 2); // Gentler easing
        setCirclePosition({
          x: -250 + (canvas.width / 2 + 250) * easeProgress, // Start from further away
          y: centerY
        });
      } else if (phase === 'centering') {
        const centerProgress = Math.min((elapsed - 6000) / 1500, 1);
        const easeProgress = 1 - Math.pow(1 - centerProgress, 2);
        setCirclePosition({
          x: canvas.width / 2,
          y: centerY
        });
      }

      // Update and draw background flakes
      backgroundFlakesRef.current.forEach(flake => {
        // Gentle floating motion
        flake.x += flake.vx;
        flake.y += flake.vy;
        flake.rotation += flake.rotationSpeed;

        // Wrap around screen
        if (flake.x > canvas.width + 10) flake.x = -10;
        if (flake.x < -10) flake.x = canvas.width + 10;
        if (flake.y > canvas.height + 10) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        // Fade out only during fadeOut phase
        if (phase === 'fadeOut') {
          const fadeProgress = (elapsed - 16000) / 1500;
          flake.alpha = Math.max(0, 0.9 - fadeProgress);
        }

        drawBackgroundFlake(ctx, flake);
      });

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        if (phase === 'forming' || phase === 'rolling' || phase === 'centering') {
          // Circle formation with rolling motion
          particle.x = circlePosition.x + Math.cos(particle.angle) * particle.radius;
          particle.y = circlePosition.y + Math.sin(particle.angle) * particle.radius;
          particle.rotation += particle.rotationSpeed;
          
          // Add rolling rotation effect
          if (phase === 'rolling') {
            particle.angle += 0.02;
          }
        } else if (phase === 'burst') {
          // Simplified explosion effect for performance
          const burstProgress = (elapsed - 7500) / 4500;
          const explosionForce = burstProgress * 10; // Simplified calculation
          
          particle.x = circlePosition.x + Math.cos(particle.angle) * (particle.originalRadius + explosionForce * 30);
          particle.y = circlePosition.y + Math.sin(particle.angle) * (particle.originalRadius + explosionForce * 30);
          
          particle.size = Math.min(particle.size + 0.2, 12);
          particle.alpha = Math.max(0.4, 1 - burstProgress * 0.3);
          particle.rotation += particle.rotationSpeed;
        } else if (phase === 'fadeOut') {
          // Fade out particles
          const fadeProgress = (elapsed - 16000) / 1500;
          particle.alpha = Math.max(0, 1 - fadeProgress);
        }
        
        drawParticle(ctx, particle);
      });

      // Draw optimized mesh connections
      if (phase === 'forming' || phase === 'rolling' || phase === 'centering') {
        ctx.shadowBlur = 5; // Reduce shadow for connections
        
        for (let i = 0; i < particlesRef.current.length; i++) {
          const particle1 = particlesRef.current[i];
          
          // Only check nearby particles to reduce calculations
          for (let j = i + 1; j < Math.min(i + 8, particlesRef.current.length); j++) {
            const particle2 = particlesRef.current[j];
            
            const dx = particle1.x - particle2.x;
            const dy = particle1.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const sameBranch = particle1.branchIndex === particle2.branchIndex;
              const centerConnection = particle1.branchIndex === -1 || particle2.branchIndex === -1;
              
              if (sameBranch || centerConnection) {
                const opacity = (1 - distance / 120) * (sameBranch ? 0.8 : 0.6);
                ctx.strokeStyle = `rgba(103, 232, 249, ${opacity})`;
                ctx.lineWidth = sameBranch ? 3 : 2;
                
                ctx.beginPath();
                ctx.moveTo(particle1.x, particle1.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw simplified explosion rays during burst
      if (phase === 'burst') {
        const burstProgress = (elapsed - 7500) / 4500;
        const rayCount = 8; // Fewer rays for performance
        const rayLength = Math.min(400, Math.pow(burstProgress, 0.4) * 800);
        
        ctx.save();
        ctx.translate(circlePosition.x, circlePosition.y);
        ctx.globalAlpha = Math.max(0.3, 1 - burstProgress * 0.4);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15; // Reduced shadow
        ctx.shadowColor = '#67e8f9';

        for (let i = 0; i < rayCount; i++) {
          const angle = (i / rayCount) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * rayLength, Math.sin(angle) * rayLength);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    initBackgroundFlakes();
    initParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onComplete, phase, circlePosition]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #0a0f23 0%, #1a1a2e 30%, #16213e 70%, #0a0f23 100%)'
        }}
      />
      
      {phase === 'text' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 2, type: 'spring', bounce: 0.2 }}
        >
          <div className="text-center px-8 max-w-6xl">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              <span 
                className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-pink-200"
                style={{ 
                  textShadow: '0 0 40px #f9a8d4',
                  fontFamily: 'Georgia, serif'
                }}
              >
                ✨ Step into the 
              </span>
              <span 
                className="text-6xl sm:text-7xl md:text-8xl font-black text-white ml-4"
                style={{ 
                  textShadow: '0 0 80px #ffffff, 0 0 160px #38bdf8',
                  fontFamily: 'Impact, sans-serif',
                  letterSpacing: '0.1em'
                }}
              >
                REALM
              </span>
              <span 
                className="text-3xl sm:text-4xl md:text-5xl font-light text-cyan-200 ml-3"
                style={{ 
                  textShadow: '0 0 50px #67e8f9',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                of
              </span>
            </motion.div>
            
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.8, type: 'spring', stiffness: 60 }}
            >
              <div className="relative">
                <span 
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500"
                  style={{ 
                    textShadow: '0 0 120px #67e8f9',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif',
                    lineHeight: '0.9'
                  }}
                >
                  C
                </span>
                <span 
                  className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-cyan-300 to-blue-400"
                  style={{ 
                    textShadow: '0 0 100px #f9a8d4',
                    WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                    fontFamily: 'Times New Roman, serif'
                  }}
                >
                  r
                </span>
                <span 
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400"
                  style={{ 
                    textShadow: '0 0 120px #a855f7',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Impact, sans-serif'
                  }}
                >
                  y
                </span>
                <span 
                  className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300"
                  style={{ 
                    textShadow: '0 0 80px #67e8f9',
                    WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                    fontFamily: 'Helvetica Neue, sans-serif'
                  }}
                >
                  s
                </span>
                <span 
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400"
                  style={{ 
                    textShadow: '0 0 120px #3b82f6',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif'
                  }}
                >
                  t
                </span>
                <span 
                  className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-cyan-300 to-blue-400"
                  style={{ 
                    textShadow: '0 0 100px #f9a8d4',
                    WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  a
                </span>
                <span 
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  style={{ 
                    textShadow: '0 0 120px #67e8f9',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Impact, sans-serif'
                  }}
                >
                  l
                </span>
              </div>
              
              <div className="mt-4">
                <span 
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                  style={{ 
                    textShadow: '0 0 120px #a855f7',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif',
                    letterSpacing: '0.15em'
                  }}
                >
                  CODE
                </span>
              </div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.5 }}
            >
              <span 
                className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-pink-200"
                style={{ 
                  textShadow: '0 0 50px #f9a8d4',
                  fontFamily: 'Georgia, serif'
                }}
              >
                ❄️ Where 
              </span>
              <span 
                className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-100"
                style={{ 
                  textShadow: '0 0 60px #67e8f9',
                  fontFamily: 'Impact, sans-serif',
                  letterSpacing: '0.1em'
                }}
              >
                INNOVATION 
              </span>
              <span 
                className="text-2xl sm:text-3xl md:text-4xl font-light text-purple-200"
                style={{ 
                  textShadow: '0 0 50px #a855f7',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                dances with 
              </span>
              <span 
                className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-blue-200"
                style={{ 
                  textShadow: '0 0 70px #3b82f6',
                  fontFamily: 'Times New Roman, serif'
                }}
              >
                Winter Magic
              </span>
              <span 
                className="text-2xl sm:text-3xl md:text-4xl font-light text-cyan-200"
                style={{ 
                  textShadow: '0 0 50px #67e8f9',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                 ❄️
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};