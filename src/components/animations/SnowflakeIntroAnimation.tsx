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

interface CornerSnowflake {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export const SnowflakeIntroAnimation = ({ onComplete }: SnowflakeIntroAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const backgroundFlakesRef = useRef<BackgroundFlake[]>([]);
  const cornerSnowflakesRef = useRef<CornerSnowflake[]>([]);
  const startTime = useRef<number>(Date.now());
  const [phase, setPhase] = useState<string>('entrance');
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

    const createCornerSnowflake = (corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', canvasWidth: number, canvasHeight: number): CornerSnowflake => {
      let startX, startY;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      
      // Position snowflakes outside the screen boundaries
      switch (corner) {
        case 'topLeft':
          startX = -100;
          startY = -100;
          break;
        case 'topRight':
          startX = canvasWidth + 100;
          startY = -100;
          break;
        case 'bottomLeft':
          startX = -100;
          startY = canvasHeight + 100;
          break;
        case 'bottomRight':
          startX = canvasWidth + 100;
          startY = canvasHeight + 100;
          break;
      }
      
      return {
        startX,
        startY,
        currentX: startX,
        currentY: startY,
        targetX: centerX,
        targetY: centerY,
        size: Math.random() * 30 + 40, // Large snowflakes
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        alpha: 0.9,
        corner
      };
    };

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

    const drawCornerSnowflake = (ctx: CanvasRenderingContext2D, snowflake: CornerSnowflake) => {
      ctx.save();
      ctx.translate(snowflake.currentX, snowflake.currentY);
      ctx.rotate(snowflake.rotation);
      ctx.globalAlpha = snowflake.alpha;

      // Brighter, more visible snowflake
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#67e8f9';

      const spokes = 6;
      const spokeLength = snowflake.size;

      // Main spokes
      for (let i = 0; i < spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * spokeLength, Math.sin(angle) * spokeLength);
        ctx.stroke();

        // Add decorative branches
        const branchLength = spokeLength * 0.6;
        const branchAngle1 = angle - Math.PI / 5;
        const branchAngle2 = angle + Math.PI / 5;
        
        // First branch
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * spokeLength * 0.7, Math.sin(angle) * spokeLength * 0.7);
        ctx.lineTo(Math.cos(branchAngle1) * branchLength + Math.cos(angle) * spokeLength * 0.7, 
                  Math.sin(branchAngle1) * branchLength + Math.sin(angle) * spokeLength * 0.7);
        ctx.stroke();

        // Second branch
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * spokeLength * 0.7, Math.sin(angle) * spokeLength * 0.7);
        ctx.lineTo(Math.cos(branchAngle2) * branchLength + Math.cos(angle) * spokeLength * 0.7, 
                  Math.sin(branchAngle2) * branchLength + Math.sin(angle) * spokeLength * 0.7);
        ctx.stroke();
      }

      // Center circle
      ctx.beginPath();
      ctx.arc(0, 0, snowflake.size * 0.25, 0, Math.PI * 2);
      ctx.fill();

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

    const initCornerSnowflakes = () => {
      cornerSnowflakesRef.current = [];
      cornerSnowflakesRef.current.push(createCornerSnowflake('topLeft', canvas.width, canvas.height));
      cornerSnowflakesRef.current.push(createCornerSnowflake('topRight', canvas.width, canvas.height));
      cornerSnowflakesRef.current.push(createCornerSnowflake('bottomLeft', canvas.width, canvas.height));
      cornerSnowflakesRef.current.push(createCornerSnowflake('bottomRight', canvas.width, canvas.height));
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

      // Phase transitions - simplified for four corner snowflakes
      if (phase === 'entrance' && elapsed > 3000) {
        setPhase('burst');
      } else if (phase === 'burst' && elapsed > 7000) {
        setPhase('text');
      } else if (phase === 'text' && elapsed > 11000) {
        setPhase('fadeOut');
      } else if (phase === 'fadeOut' && elapsed > 12500) {
        onComplete();
      }

      // Set circle position to center for burst effect
      setCirclePosition({
        x: canvas.width / 2,
        y: centerY
      });

      // Update and draw corner snowflakes (entrance and burst phases)
      if (phase === 'entrance' || phase === 'burst') {
        cornerSnowflakesRef.current.forEach((snowflake, index) => {
          if (phase === 'entrance') {
            const entranceProgress = Math.min(elapsed / 3000, 1);
            // Smooth easing function for natural movement
            const easeProgress = 1 - Math.pow(1 - entranceProgress, 3);
            
            // Calculate current position with smooth interpolation
            snowflake.currentX = snowflake.startX + (snowflake.targetX - snowflake.startX) * easeProgress;
            snowflake.currentY = snowflake.startY + (snowflake.targetY - snowflake.startY) * easeProgress;
            
            // Rotate the snowflake as it moves
            snowflake.rotation += snowflake.rotationSpeed;
            
            // Stay visible during entrance
            snowflake.alpha = Math.min(0.9, entranceProgress * 1.2);
          } else if (phase === 'burst') {
            const burstProgress = Math.min((elapsed - 3000) / 4000, 1);
            const explosionForce = burstProgress * 15;
            
            // Calculate burst direction for each corner
            const angle = index * (Math.PI / 2); // 0, 90, 180, 270 degrees
            const burstDistance = explosionForce * 50;
            
            snowflake.currentX = snowflake.targetX + Math.cos(angle) * burstDistance;
            snowflake.currentY = snowflake.targetY + Math.sin(angle) * burstDistance;
            
            // Increase size during burst
            snowflake.size = Math.min(snowflake.size + 0.5, 80);
            
            // Rotate faster during burst
            snowflake.rotation += snowflake.rotationSpeed * 2;
            
            // Fade out during burst
            snowflake.alpha = Math.max(0.2, 0.9 - burstProgress * 0.7);
          }
          
          drawCornerSnowflake(ctx, snowflake);
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
          const fadeProgress = (elapsed - 11000) / 1500;
          flake.alpha = Math.max(0, 0.9 - fadeProgress);
        }

        drawBackgroundFlake(ctx, flake);
      });

      // Particles are no longer used - corner snowflakes handle the animation

      // Mesh connections removed - using corner snowflakes only

      // Draw simplified explosion rays during burst
      if (phase === 'burst') {
        const burstProgress = (elapsed - 3000) / 4000;
        const rayCount = 12; // More rays for dramatic effect
        const rayLength = Math.min(500, Math.pow(burstProgress, 0.4) * 1000);
        
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
    initCornerSnowflakes();
    initParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onComplete, phase]);

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
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500"
                  style={{ 
                    textShadow: '0 0 120px #67e8f9',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif',
                    lineHeight: '0.9'
                  }}
                >
                  N
                </span>
                <span 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-cyan-300 to-blue-400"
                  style={{ 
                    textShadow: '0 0 100px #f9a8d4',
                    WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                    fontFamily: 'Times New Roman, serif'
                  }}
                >
                  u
                </span>
                <span 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400"
                  style={{ 
                    textShadow: '0 0 120px #a855f7',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Impact, sans-serif'
                  }}
                >
                  m
                </span>
                <span 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300"
                  style={{ 
                    textShadow: '0 0 80px #67e8f9',
                    WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                    fontFamily: 'Helvetica Neue, sans-serif'
                  }}
                >
                  e
                </span>
                <span 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400"
                  style={{ 
                    textShadow: '0 0 120px #3b82f6',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif'
                  }}
                >
                  r
                </span>
                <span 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-cyan-300 to-blue-400"
                  style={{ 
                    textShadow: '0 0 100px #f9a8d4',
                    WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  a
                </span>
                <span 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  style={{ 
                    textShadow: '0 0 120px #67e8f9',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Impact, sans-serif'
                  }}
                >
                  n
                </span>
                <span 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400"
                  style={{ 
                    textShadow: '0 0 120px #a855f7',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif'
                  }}
                >
                  o
                </span>
              </div>
              
              <div className="mt-4">
                <span 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                  style={{ 
                    textShadow: '0 0 120px #a855f7',
                    WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                    fontFamily: 'Arial Black, sans-serif',
                    letterSpacing: '0.15em'
                  }}
                >
                  CODE CHALLENGE
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