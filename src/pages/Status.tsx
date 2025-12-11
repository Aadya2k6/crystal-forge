import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { FrostInput } from '@/components/ui/FrostInput';
import { WinterBackground } from '@/components/ui/WinterBackground';
import { Search, CheckCircle, Clock, XCircle, Snowflake } from 'lucide-react';

type StatusType = 'idle' | 'verified' | 'pending' | 'rejected';

const Status = () => {
  const [teamId, setTeamId] = useState('');
  const [status, setStatus] = useState<StatusType>('idle');
  const [isChecking, setIsChecking] = useState(false);
  
  const handleCheck = () => {
    if (!teamId.trim()) return;
    
    setIsChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo logic - check based on team ID pattern
      if (teamId.toUpperCase().includes('ICE')) {
        setStatus('verified');
      } else if (teamId.toUpperCase().includes('PEND')) {
        setStatus('pending');
      } else {
        setStatus('rejected');
      }
      setIsChecking(false);
    }, 1500);
  };
  
  const resetStatus = () => {
    setStatus('idle');
    setTeamId('');
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4">
      <WinterBackground />
      {/* Frozen lake effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 70%, hsl(186 100% 97% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 80%, hsl(185 100% 90% / 0.3) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 75%, hsl(185 100% 90% / 0.3) 0%, transparent 40%)
          `,
        }}
      />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-space text-4xl md:text-5xl text-glacier-deep font-bold mb-4">
            Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan to-holo-purple">Status</span>
          </h1>
          <p className="font-inter text-lg text-foreground/60">
            Enter your Team ID to check your registration status
          </p>
        </motion.div>
        
        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-8 md:p-10" variant="diamond">
            {status === 'idle' ? (
              <div className="space-y-6">
                <FrostInput
                  label="Team ID"
                  placeholder="e.g., ICE-MYTEAM-123"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                />
                
                <CrystalButton
                  onClick={handleCheck}
                  isLoading={isChecking}
                  className="w-full"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Check Status
                </CrystalButton>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                {/* Status Display */}
                {status === 'verified' && (
                  <>
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-glow-success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="font-space text-2xl text-success font-bold mb-2">
                      ACCESS GRANTED
                    </h3>
                    <p className="font-inter text-foreground/60 mb-6">
                      Your team is verified and ready for the hackathon!
                    </p>
                  </>
                )}
                
                {status === 'pending' && (
                  <>
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-glow-warning"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <Clock className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="font-space text-2xl text-warning font-bold mb-2">
                      Encased in Ice
                    </h3>
                    <p className="font-inter text-foreground/60 mb-6">
                      Your registration is pending review. We'll notify you soon!
                    </p>
                  </>
                )}
                
                {status === 'rejected' && (
                  <>
                    {/* Frost crack effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bg-destructive/20"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: '2px',
                            height: '150%',
                            transformOrigin: 'center center',
                            rotate: `${i * 45}deg`,
                          }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                        />
                      ))}
                    </div>
                    
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center shadow-glow-destructive relative z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <XCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="font-space text-2xl text-destructive font-bold mb-2 relative z-10">
                      Team Not Found
                    </h3>
                    <p className="font-inter text-foreground/60 mb-6 relative z-10">
                      We couldn't find a team with this ID. Please check and try again.
                    </p>
                  </>
                )}
                
                <CrystalButton onClick={resetStatus} variant="secondary">
                  Check Another Team
                </CrystalButton>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
        
        {/* Decorative snowflakes */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Snowflake className="w-full h-full text-ice-cyan" strokeWidth={0.5} />
        </motion.div>
        
        <motion.div
          className="absolute -top-10 -right-10 w-48 h-48 opacity-5"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <Snowflake className="w-full h-full text-holo-purple" strokeWidth={0.5} />
        </motion.div>
      </div>
    </div>
  );
};

export default Status;
