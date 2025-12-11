import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback } from 'react';
import { DiamondPrism } from '@/components/three/DiamondPrism';
import { GlassCard } from '@/components/ui/GlassCard';
import { CrystalButton } from '@/components/ui/CrystalButton';
import { FrostInput } from '@/components/ui/FrostInput';
import { WinterBackground } from '@/components/ui/WinterBackground';
import { useRegistrationStore } from '@/stores/registrationStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Users, Lightbulb, CheckCircle, Plus, Trash2, Upload } from 'lucide-react';

const PrismArtifact = ({ speed = 0.5 }: { speed?: number }) => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, -3, 3]} intensity={1} color="#e1bee7" />
        <DiamondPrism position={[0, 0, 0]} scale={2.2} rotationSpeed={speed} />
      </Suspense>
    </Canvas>
  );
};

const steps = [
  { id: 0, title: 'Team Details', icon: Users },
  { id: 1, title: 'Project Idea', icon: Lightbulb },
  { id: 2, title: 'Confirm', icon: CheckCircle },
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

const TeamInfoStep = () => {
  const { data, updateData, updateMember, addMember, removeMember } = useRegistrationStore();
  
  return (
    <div className="space-y-6">
      <FrostInput
        label="Team Name"
        placeholder="Enter your team name"
        value={data.teamName}
        onChange={(e) => updateData({ teamName: e.target.value })}
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-inter text-sm font-medium text-foreground/70">
            Team Members
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
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 font-inter text-sm font-medium text-foreground/70">
          Project Idea
        </label>
        <textarea
          className="input-frost min-h-[140px] resize-none"
          placeholder="Describe your project idea briefly..."
          value={data.projectIdea}
          onChange={(e) => updateData({ projectIdea: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block mb-3 font-inter text-sm font-medium text-foreground/70">
          Team Experience Level
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['Beginner', 'Intermediate', 'Expert'].map((level) => (
            <motion.button
              key={level}
              onClick={() => updateData({ experience: level })}
              className={`
                p-4 rounded-xl border-2 font-inter font-medium transition-all
                ${data.experience === level 
                  ? 'border-ice-cyan bg-ice-cyan/10 text-primary shadow-glow-cyan' 
                  : 'border-border bg-white/50 text-foreground/60 hover:border-ice-cyan/50'}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* File Upload Zone */}
      <div>
        <label className="block mb-3 font-inter text-sm font-medium text-foreground/70">
          ID Card Upload (Optional)
        </label>
        <motion.div
          className="relative p-8 rounded-xl border-2 border-dashed border-ice-cyan/40 bg-ice-frost/50 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-ice-cyan hover:bg-ice-cyan/5"
          whileHover={{ scale: 1.01 }}
        >
          <Upload className="w-10 h-10 text-primary/60 mb-3" />
          <p className="font-inter text-sm text-foreground/60 text-center">
            Drag & drop your ID card here, or <span className="text-primary">browse</span>
          </p>
          <p className="font-inter text-xs text-foreground/40 mt-1">
            PNG, JPG up to 5MB
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ConfirmStep = () => {
  const { data, updateData } = useRegistrationStore();
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-gradient-to-br from-ice-frost to-white border border-border">
        <h4 className="font-space text-lg text-glacier-deep font-semibold mb-6">Registration Summary</h4>
        
        <div className="space-y-4 font-inter text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-foreground/60">Team Name</span>
            <span className="text-foreground font-medium">{data.teamName || 'Not set'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-foreground/60">Team Size</span>
            <span className="text-foreground font-medium">{data.members.length} member(s)</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-foreground/60">Experience Level</span>
            <span className="text-foreground font-medium">{data.experience || 'Not set'}</span>
          </div>
          <div className="pt-2">
            <span className="text-foreground/60">Project Idea</span>
            <p className="text-foreground font-medium mt-1">{data.projectIdea || 'Not provided'}</p>
          </div>
        </div>
      </div>
      
      <motion.label
        className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl bg-white/50 border border-border hover:border-ice-cyan/50 transition-colors"
        whileHover={{ x: 2 }}
      >
        <input
          type="checkbox"
          checked={data.agreeToRules}
          onChange={(e) => updateData({ agreeToRules: e.target.checked })}
          className="mt-1 w-5 h-5 rounded border-ice-cyan/50 text-primary focus:ring-primary/50"
        />
        <span className="font-inter text-sm text-foreground/70 group-hover:text-foreground transition-colors">
          I agree to the hackathon rules and code of conduct. I understand that all submissions 
          must be original work created during the event.
        </span>
      </motion.label>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { currentStep, setStep, data, setTeamId } = useRegistrationStore();
  
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
  
  const handleSubmit = useCallback(() => {
    const id = `ICE-${data.teamName.toUpperCase().replace(/\s+/g, '-').slice(0, 8)}-${Math.floor(Math.random() * 1000)}`;
    setTeamId(id);
    navigate('/success');
  }, [data.teamName, navigate, setTeamId]);
  
  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 0:
        return data.teamName.length > 0 && data.members[0].name.length > 0 && data.members[0].email.length > 0;
      case 1:
        return data.projectIdea.length > 0 && data.experience.length > 0;
      case 2:
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
              <PrismArtifact speed={0.3 + currentStep * 0.4} />
              
              {/* Light refraction effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, hsl(185 100% 80% / 0.3) 0%, transparent 50%)',
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
                {currentStep === 0 && <TeamInfoStep />}
                {currentStep === 1 && <ProjectIdeaStep />}
                {currentStep === 2 && <ConfirmStep />}
              </motion.div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
                {currentStep > 0 ? (
                  <CrystalButton
                    variant="secondary"
                    onClick={handlePrev}
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
                    disabled={!isStepValid()}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </CrystalButton>
                ) : (
                  <CrystalButton
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                  >
                    Submit Registration
                  </CrystalButton>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
