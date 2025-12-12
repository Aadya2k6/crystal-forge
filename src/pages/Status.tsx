import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { FrostInput } from '@/components/ui/FrostInput';
import { WinterBackground } from '@/components/ui/WinterBackground';
import { registrationService, FirebaseRegistrationData } from '@/lib/registrationService';
import { Search, CheckCircle, Clock, XCircle, Snowflake } from 'lucide-react';

// Classy Snowman component for left side
const LeftSnowman = () => {
  return (
    <motion.div
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Snowman body - centered container */}
      <div className="relative flex flex-col items-center">
        {/* Top hat */}
        <div className="relative z-10 -mb-2">
          <div className="w-10 h-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-t-lg mx-auto"></div>
          <div className="w-14 h-2 bg-gradient-to-b from-gray-900 to-gray-800 -mt-0.5 shadow-md mx-auto"></div>
        </div>
        
        {/* Head */}
        <div className="w-16 h-16 bg-gradient-to-br from-white to-blue-50 rounded-full shadow-xl relative border-2 border-blue-100 -mb-4 z-20">
          {/* Eyes */}
          <div className="absolute top-5 left-3 w-2 h-2 bg-gray-900 rounded-full"></div>
          <div className="absolute top-5 right-3 w-2 h-2 bg-gray-900 rounded-full"></div>
          {/* Carrot nose */}
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[10px] border-l-orange-500 rotate-90"></div>
          {/* Smile with coal */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
            <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
          </div>
          {/* Monocle */}
          <div className="absolute top-4 right-1 w-5 h-5 border-2 border-gray-700 rounded-full bg-blue-100/30"></div>
        </div>
        
        {/* Bow tie */}
        <div className="relative z-30 -mb-2">
          <div className="flex items-center">
            <div className="w-3 h-4 bg-gradient-to-br from-red-600 to-red-700 transform -skew-x-12 rounded-l"></div>
            <div className="w-1.5 h-2 bg-red-900 rounded"></div>
            <div className="w-3 h-4 bg-gradient-to-bl from-red-600 to-red-700 transform skew-x-12 rounded-r"></div>
          </div>
        </div>
        
        {/* Middle body */}
        <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-full relative shadow-xl border-2 border-blue-100 -mb-6 z-10">
          {/* Vest */}
          <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full overflow-hidden">
            {/* Vest buttons */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
            </div>
          </div>
          
          {/* Left arm - tipping hat gesture */}
          <motion.div
            className="absolute top-4 -left-2 w-8 h-2 bg-gradient-to-r from-white to-blue-50 rounded-full shadow-md origin-right"
            animate={{ rotate: [0, -20, -10, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Left hand */}
          <motion.div
            className="absolute top-2 -left-8 w-3 h-3 bg-white rounded-full shadow-md border border-blue-200"
            animate={{ y: [-1, -3, -2, -3, -1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Right arm - holding cane */}
          <div className="absolute top-6 -right-2 w-8 h-2 bg-gradient-to-l from-white to-blue-50 rounded-full shadow-md transform rotate-15 origin-left"></div>
          {/* Right hand holding cane */}
          <div className="absolute top-4 -right-8 w-3 h-3 bg-white rounded-full shadow-md border border-blue-200"></div>
          {/* Walking cane */}
          <div className="absolute top-6 -right-10 w-1 h-16 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full"></div>
          <div className="absolute top-4 -right-12 w-3 h-3 border-2 border-amber-700 rounded-full bg-transparent"></div>
        </div>
        
        {/* Bottom body */}
        <div className="w-24 h-24 bg-gradient-to-br from-white to-blue-50 rounded-full relative shadow-xl border-2 border-blue-100">
          {/* Coal buttons */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-y-2">
            <div className="w-2 h-2 bg-gray-900 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full shadow-sm"></div>
          </div>
        </div>
        
        {/* Remove old floating arms and accessories - they're now part of middle body */}
      </div>
    </motion.div>
  );
};

// Classy Snowman component for right side
const RightSnowman = () => {
  return (
    <motion.div
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.7 }}
    >
      {/* Snowman body - centered container */}
      <div className="relative flex flex-col items-center">
        {/* Top hat with ribbon */}
        <div className="relative z-10 -mb-2">
          <div className="w-10 h-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-t-lg relative mx-auto">
            {/* Hat ribbon */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-blue-700"></div>
          </div>
          <div className="w-14 h-2 bg-gradient-to-b from-gray-900 to-gray-800 -mt-0.5 shadow-md mx-auto"></div>
        </div>
        
        {/* Head */}
        <div className="w-16 h-16 bg-gradient-to-br from-white to-blue-50 rounded-full shadow-xl relative border-2 border-blue-100 -mb-4 z-20">
          {/* Eyes with monocle */}
          <div className="absolute top-5 left-3 w-2 h-2 bg-gray-900 rounded-full"></div>
          <div className="absolute top-5 right-3 w-2 h-2 bg-gray-900 rounded-full"></div>
          {/* Monocle on right eye */}
          <div className="absolute top-4 right-1 w-6 h-6 border-2 border-amber-600 rounded-full bg-blue-100/20">
            <div className="absolute -right-1 top-1/2 w-4 h-0.5 bg-amber-600"></div>
          </div>
          {/* Carrot nose */}
          <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[10px] border-l-orange-500 rotate-90"></div>
          {/* Smile */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
            <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
          </div>
        </div>
        
        {/* Fancy bow tie */}
        <div className="relative z-30 -mb-2">
          <div className="flex items-center">
            <div className="w-3 h-4 bg-gradient-to-br from-purple-600 to-purple-700 transform -skew-x-12 rounded-l"></div>
            <div className="w-1.5 h-2 bg-purple-900 rounded"></div>
            <div className="w-3 h-4 bg-gradient-to-bl from-purple-600 to-purple-700 transform skew-x-12 rounded-r"></div>
          </div>
        </div>
        
        {/* Middle body */}
        <div className="w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-full relative shadow-xl border-2 border-blue-100 -mb-6 z-10">
          {/* Tuxedo vest */}
          <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full overflow-hidden">
            {/* Vest buttons */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm border border-yellow-600"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-sm border border-yellow-600"></div>
            </div>
            {/* Pocket square */}
            <div className="absolute top-2 right-2 w-3 h-2 bg-gradient-to-br from-blue-400 to-blue-500 transform rotate-45"></div>
          </div>
          
          {/* Left arm - holding pocket watch */}
          <div className="absolute top-4 -left-2 w-8 h-2 bg-gradient-to-r from-white to-blue-50 rounded-full shadow-md transform -rotate-15 origin-right"></div>
          {/* Left hand with pocket watch */}
          <div className="absolute top-2 -left-8 w-3 h-3 bg-white rounded-full shadow-md border border-blue-200"></div>
          {/* Pocket watch */}
          <motion.div
            className="absolute top-0 -left-12 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-2 border-amber-700 shadow-lg"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-1 bg-white/30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-gray-900 transform -translate-x-1/2 origin-bottom"></div>
          </motion.div>
          {/* Watch chain */}
          <div className="absolute top-2 -left-5 w-4 h-0.5 bg-amber-600"></div>
          
          {/* Right arm - welcoming gesture */}
          <motion.div
            className="absolute top-6 -right-2 w-8 h-2 bg-gradient-to-l from-white to-blue-50 rounded-full shadow-md origin-left"
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right hand */}
          <motion.div
            className="absolute top-4 -right-8 w-3 h-3 bg-white rounded-full shadow-md border border-blue-200"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Bottom body */}
        <div className="w-24 h-24 bg-gradient-to-br from-white to-blue-50 rounded-full relative shadow-xl border-2 border-blue-100">
          {/* Coal buttons */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-y-2">
            <div className="w-2 h-2 bg-gray-900 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full shadow-sm"></div>
            <div className="w-2 h-2 bg-gray-900 rounded-full shadow-sm"></div>
          </div>
        </div>
        
        {/* Remove old floating arms and accessories - they're now part of middle body */}
      </div>
    </motion.div>
  );
};

type StatusType = 'idle' | 'approved' | 'pending' | 'rejected' | 'not-found';

const Status = () => {
  const [teamId, setTeamId] = useState('');
  const [status, setStatus] = useState<StatusType>('idle');
  const [isChecking, setIsChecking] = useState(false);
  const [teamData, setTeamData] = useState<FirebaseRegistrationData | null>(null);
  const [error, setError] = useState('');
  
  const handleCheck = async () => {
    if (!teamId.trim()) return;
    
    setIsChecking(true);
    setError('');
    
    try {
      const registration = await registrationService.getRegistrationByTeamId(teamId.trim().toUpperCase());
      
      if (registration) {
        setTeamData(registration);
        setStatus(registration.status);
      } else {
        setStatus('not-found');
        setTeamData(null);
      }
    } catch (err) {
      console.error('Error checking team status:', err);
      setError('Failed to check team status. Please try again.');
      setStatus('idle');
    } finally {
      setIsChecking(false);
    }
  };
  
  const resetStatus = () => {
    setStatus('idle');
    setTeamId('');
    setTeamData(null);
    setError('');
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4">
      <WinterBackground />
      
      {/* Left Snowman */}
      <LeftSnowman />
      
      {/* Right Snowman */}
      <RightSnowman />
      
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
                  placeholder="e.g., ICE-ABCD-XYZ"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                />
                
                {error && (
                  <motion.div
                    className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}
                
                <CrystalButton
                  onClick={handleCheck}
                  isLoading={isChecking}
                  disabled={!teamId.trim()}
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
                {status === 'approved' && (
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
                      Team Approved! 🎉
                    </h3>
                    <p className="font-inter text-foreground/60 mb-6">
                      Congratulations! Your team has been approved for the hackathon.
                    </p>
                    
                    {teamData && (
                      <div className="space-y-4 text-left bg-success/5 p-6 rounded-lg border border-success/20">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-inter text-sm text-foreground/60">Team Name:</span>
                            <p className="font-inter font-medium text-foreground">{teamData.teamName}</p>
                          </div>
                          <div>
                            <span className="font-inter text-sm text-foreground/60">Domain:</span>
                            <p className="font-inter font-medium text-foreground">{teamData.domain}</p>
                          </div>
                          <div>
                            <span className="font-inter text-sm text-foreground/60">Project Title:</span>
                            <p className="font-inter font-medium text-foreground">{teamData.projectTitle}</p>
                          </div>
                          <div>
                            <span className="font-inter text-sm text-foreground/60">Team Size:</span>
                            <p className="font-inter font-medium text-foreground">{teamData.teamSize} members</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                
                {(status === 'rejected' || status === 'not-found') && (
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
                      {status === 'not-found' ? 'Team Not Found' : 'Application Rejected'}
                    </h3>
                    <p className="font-inter text-foreground/60 mb-6 relative z-10">
                      {status === 'not-found' 
                        ? 'We could not find a team with this ID. Please check and try again.' 
                        : 'Unfortunately, your team application was not approved for this hackathon.'}
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
