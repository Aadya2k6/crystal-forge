import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback } from 'react';
import { DiamondPrism } from '@/components/three/DiamondPrism';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { FrostInput } from '@/components/ui/FrostInput';
import { WinterBackground } from '@/components/ui/WinterBackground';
import { Recaptcha } from '@/components/ui/Recaptcha';
import { useRegistrationStore } from '@/stores/registrationStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Users, Lightbulb, CheckCircle, Plus, Trash2, Shield } from 'lucide-react';

const CodingSnowman = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative scale-90">
        
        {/* Chair */}
        <div className="absolute bottom-8 left-16">
          {/* Chair back */}
          <div className="w-3 h-16 bg-amber-700 rounded-t absolute bottom-8"></div>
          {/* Chair seat */}
          <div className="absolute bottom-8 -left-6 w-14 h-3 bg-amber-700 rounded"></div>
          {/* Chair legs */}
          <div className="absolute bottom-0 -left-4 w-1 h-8 bg-amber-600"></div>
          <div className="absolute bottom-0 right-4 w-1 h-8 bg-amber-600"></div>
          <div className="absolute bottom-0 -left-1 w-1 h-8 bg-amber-600"></div>
          <div className="absolute bottom-0 right-1 w-1 h-8 bg-amber-600"></div>
        </div>

        {/* Desk */}
        <div className="absolute bottom-24 left-20 w-40 h-4 bg-amber-800 rounded shadow-lg">
          {/* Desk legs */}
          <div className="absolute bottom-0 left-4 w-2 h-8 bg-amber-700 transform translate-y-full"></div>
          <div className="absolute bottom-0 right-4 w-2 h-8 bg-amber-700 transform translate-y-full"></div>
        </div>

        {/* Laptop on desk */}
        <div className="absolute bottom-28 left-32">
          {/* Laptop base */}
          <div className="w-18 h-1 bg-gray-700 rounded"></div>
          {/* Laptop screen */}
          <div className="w-16 h-12 bg-gray-900 rounded border transform -rotate-12 -translate-y-1">
            <div className="p-1 text-green-400 text-[6px] font-mono">
              {'> code.js'}
              <br />
              {'function(){}'}
            </div>
          </div>
        </div>

        {/* Snowman - sitting properly, built from head down */}
        <div className="absolute bottom-27 left-8">
          
          {/* Head - at the very top */}
          <div className="w-12 h-12 bg-white rounded-full shadow-lg border border-blue-100 relative">
            {/* ONE eye (side profile) */}
            <div className="absolute top-3 left-2 w-1 h-1 bg-black rounded-full"></div>
            
            {/* Carrot nose pointing RIGHT */}
            <div className="absolute top-4 right-0 w-0 h-0 border-l-4 border-l-orange-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
            
            {/* Smile dots */}
            <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-black rounded-full"></div>
            <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-black rounded-full"></div>
          </div>

          {/* Orange scarf around neck */}
          <div className="absolute top-10 left-1 w-14 h-2 bg-orange-500 rounded shadow"></div>
          <div className="absolute top-12 left-0 w-2 h-6 bg-orange-500 rounded-b shadow"></div>

          {/* Middle snowball - connected below head */}
          <div className="w-16 h-16 bg-white rounded-full shadow-lg border border-blue-100 relative mt-2 ml-2">
            <div className="absolute top-4 left-2 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute bottom-4 left-3 w-1 h-1 bg-black rounded-full"></div>
            
            {/* Arm reaching toward laptop */}
            <div className="absolute right-0 top-3 w-10 h-1 bg-white rounded shadow"></div>
            <div className="absolute right-8 top-2 w-2 h-2 bg-white rounded-full border border-gray-200"></div>
          </div>

          {/* Bottom snowball - sitting on chair */}
          <div className="w-20 h-16 bg-white rounded-full shadow-lg border border-blue-100 relative mt-2 ml-0">
            <div className="absolute top-4 left-2 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute bottom-3 left-3 w-1 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = [
  { id: 0, title: 'Verification', icon: Shield },
  { id: 1, title: 'Team Details', icon: Users },
  { id: 2, title: 'Project Idea', icon: Lightbulb },
  { id: 3, title: 'Confirm', icon: CheckCircle },
];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            className={`
              relative w-12 h-12 rounded-xl flex items-center justify-center
              border-2 transition-all duration-500 font-space font-semibold
              ${currentStep >= step.id 
                ? 'border-ice-cyan bg-gradient-to-br from-ice-cyan to-holo-blue text-white shadow-glow-cyan' 
                : 'border-border bg-white/50 text-foreground/40'}
            `}
            animate={{
              scale: currentStep === step.id ? 1.1 : 1,
            }}
          >
            {currentStep > step.id ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span>{step.id + 1}</span>
            )}
          </motion.div>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="w-16 h-1 mx-2 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-ice-cyan to-holo-blue"
                initial={{ width: 0 }}
                animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const VerificationStep = () => {
  const { data, setVerification } = useRegistrationStore();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  const handleRecaptchaVerify = (token: string | null) => {
    setVerification(token);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-glacier-deep mb-2">
            Human Verification ❄️
          </h2>
        </motion.div>
      </div>
      
      <div className="flex justify-center">
        <Recaptcha 
          onVerify={handleRecaptchaVerify} 
          siteKey={siteKey || 'your_recaptcha_site_key_here'} 
        />
      </div>
      
      {data.isVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-ice-cyan/20 to-holo-blue/20 border border-ice-cyan/30 rounded-lg text-ice-cyan">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Verified!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const TeamInfoStep = () => {
  const { data, updateData, updateMember, addMember, removeMember } = useRegistrationStore();
  
  return (
    <div className="space-y-6">
      <FrostInput
        label="Team Name *"
        placeholder="Enter your team name"
        value={data.teamName}
        onChange={(e) => updateData({ teamName: e.target.value })}
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-inter text-sm font-medium text-foreground/70">
            Team Members *
          </label>
          {data.members.length < 4 && (
            <motion.button
              onClick={addMember}
              className="flex items-center gap-1 text-primary text-sm font-inter font-medium hover:text-primary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Member
            </motion.button>
          )}
        </div>
        
        {data.members.map((member, index) => (
          <motion.div
            key={index}
            className="p-5 rounded-xl bg-white/50 border border-border space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-inter text-sm font-medium text-primary">
                {index === 0 ? '👑 Team Lead' : `Member ${index + 1}`}
              </span>
              {index > 0 && (
                <motion.button
                  onClick={() => removeMember(index)}
                  className="text-destructive/70 hover:text-destructive transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              )}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <FrostInput
                placeholder="Full name"
                value={member.name}
                onChange={(e) => updateMember(index, { name: e.target.value })}
              />
              <FrostInput
                placeholder="Email address"
                type="email"
                value={member.email}
                onChange={(e) => updateMember(index, { email: e.target.value })}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProjectIdeaStep = () => {
  const { data, updateData } = useRegistrationStore();
  
  const domains = [
    'Web Development', 'AI/ML', 'Mobile Development', 'IoT', 'Blockchain'
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 font-inter text-sm font-medium text-foreground/70">
          Project Title *
        </label>
        <FrostInput
          placeholder="Enter your project title..."
          value={data.projectTitle}
          onChange={(e) => updateData({ projectTitle: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block mb-3 font-inter text-sm font-medium text-foreground/70">
          Domain *
        </label>
        <select
          value={data.domain}
          onChange={(e) => updateData({ domain: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-border focus:border-ice-cyan focus:ring-1 focus:ring-ice-cyan transition-colors font-inter text-foreground"
        >
          <option value="">Select a domain</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block mb-2 font-inter text-sm font-medium text-foreground/70">
          Project Description *
        </label>
        <textarea
          className="input-frost min-h-[120px] resize-none"
          placeholder="Describe your project idea briefly..."
          value={data.projectIdea}
          onChange={(e) => updateData({ projectIdea: e.target.value })}
        />
      </div>
    </div>
  );
};

const ConfirmStep = () => {
  const { data } = useRegistrationStore();
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-space text-xl font-semibold text-gradient mb-4">
          Registration Summary
        </h3>
        
        <div className="space-y-3">
          <div>
            <span className="font-inter text-sm text-foreground/70">Team Name:</span>
            <p className="font-inter font-medium text-foreground">{data.teamName}</p>
          </div>
          
          <div>
            <span className="font-inter text-sm text-foreground/70">Project Title:</span>
            <p className="font-inter font-medium text-foreground">{data.projectTitle}</p>
          </div>
          
          <div>
            <span className="font-inter text-sm text-foreground/70">Domain:</span>
            <p className="font-inter font-medium text-foreground">{data.domain}</p>
          </div>
          
          <div>
            <span className="font-inter text-sm text-foreground/70">Team Size:</span>
            <p className="font-inter font-medium text-foreground">{data.teamSize} members</p>
          </div>
          
          <div>
            <span className="font-inter text-sm text-foreground/70">Project Description:</span>
            <p className="font-inter font-medium text-foreground text-sm">{data.projectIdea}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agree-rules"
          checked={data.agreeToRules}
          onChange={(e) => {
            const { updateData } = useRegistrationStore.getState();
            updateData({ agreeToRules: e.target.checked });
          }}
          className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary"
        />
        <label htmlFor="agree-rules" className="font-inter text-sm text-foreground/70">
          I agree to the hackathon rules and terms of participation
        </label>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { 
    currentStep, 
    setStep, 
    data, 
    setTeamId, 
    isLoading,
    error,
    submitRegistration,
    setError 
  } = useRegistrationStore();
  
  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setStep(currentStep + 1);
    }
  }, [currentStep, setStep]);
  
  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  }, [currentStep, setStep]);
  
  const handleSubmit = useCallback(async () => {
    try {
      const docId = await submitRegistration();
      console.log('Registration submitted with ID:', docId);
      navigate('/success');
    } catch (error) {
      console.error('Registration submission failed:', error);
      // Error is already handled by the store, UI will show the error
    }
  }, [submitRegistration, navigate]);
  
  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 0:
        return data.isVerified;
      case 1:
        return data.teamName.length > 0 && 
               data.members[0].name.length > 0 && 
               data.members[0].email.length > 0 &&
               data.members.every(member => member.email ? member.email.includes('@') && member.email.includes('.') : true);
      case 2:
        return data.projectTitle.length > 0 && 
               data.projectIdea.length > 0 && 
               data.domain.length > 0;
      case 3:
        return data.agreeToRules;
      default:
        return false;
    }
  }, [currentStep, data]);
  
  return (
    <div className="min-h-screen relative overflow-hidden pt-28 pb-16 px-4">
      <WinterBackground />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-space text-4xl md:text-5xl text-glacier-deep font-bold mb-4">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ice-cyan to-holo-purple">Challenge</span>
          </h1>
          <p className="font-inter text-lg text-foreground/60">
            Register your team and prepare for the ultimate hackathon experience
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Prism Artifact */}
          <motion.div
            className="hidden lg:flex lg:col-span-2 items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-full h-[500px] relative">
              <CodingSnowman />
              
              {/* Winter sparkle effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsl(200 100% 80% / 0.3) 0%, transparent 70%)',
                }}
              />
            </div>
          </motion.div>
          
          {/* Right - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-8 md:p-10" variant="diamond">
              <StepIndicator currentStep={currentStep} />
              
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && <VerificationStep />}
                {currentStep === 1 && <TeamInfoStep />}
                {currentStep === 2 && <ProjectIdeaStep />}
                {currentStep === 3 && <ConfirmStep />}
              </motion.div>
              
              {/* Navigation */}
              <div className="flex flex-col space-y-4">
                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
                
                <div className="flex items-center justify-between pt-8 border-t border-border">
                  {currentStep > 0 ? (
                    <CrystalButton
                      variant="secondary"
                      onClick={handlePrev}
                      disabled={isLoading}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </CrystalButton>
                  ) : (
                    <div />
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <CrystalButton
                      onClick={handleNext}
                      disabled={!isStepValid() || isLoading}
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </CrystalButton>
                  ) : (
                    <CrystalButton
                      onClick={handleSubmit}
                      disabled={!isStepValid() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Registration'
                      )}
                    </CrystalButton>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
