import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingCrystal } from '@/components/three/FloatingCrystal';
import { GlassCard } from '@/components/ui/GlassCard';
import { IceButton } from '@/components/ui/IceButton';
import { IceInput } from '@/components/ui/IceInput';
import { useRegistrationStore } from '@/stores/registrationStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Users, Lightbulb, CheckCircle, Plus, Trash2 } from 'lucide-react';

const ArtifactCrystal = ({ speed = 1 }: { speed?: number }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f5ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#6600ff" />
        <FloatingCrystal position={[0, 0, 0]} scale={2} rotationSpeed={speed} />
      </Suspense>
    </Canvas>
  );
};

const steps = [
  { id: 0, title: 'Team Info', icon: Users },
  { id: 1, title: 'Project Idea', icon: Lightbulb },
  { id: 2, title: 'Confirm', icon: CheckCircle },
];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            className={`
              relative w-10 h-10 rounded-full flex items-center justify-center
              border-2 transition-all duration-500
              ${currentStep >= step.id 
                ? 'border-ice-primary bg-ice-primary/20' 
                : 'border-ice-primary/30 bg-void-mid/50'}
            `}
            animate={{
              boxShadow: currentStep >= step.id 
                ? '0 0 20px hsl(185 100% 50% / 0.5)' 
                : 'none',
            }}
          >
            {currentStep > step.id ? (
              <CheckCircle className="w-5 h-5 text-ice-glow" />
            ) : (
              <step.icon className={`w-5 h-5 ${currentStep >= step.id ? 'text-ice-glow' : 'text-muted-foreground'}`} />
            )}
            
            {/* Glow effect */}
            {currentStep === step.id && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: ['0 0 20px hsl(185 100% 50% / 0.3)', '0 0 40px hsl(185 100% 50% / 0.5)', '0 0 20px hsl(185 100% 50% / 0.3)']
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </motion.div>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 mx-2">
              <motion.div
                className="h-full bg-ice-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.5 }}
              />
              <div className="h-full bg-ice-primary/20 -mt-0.5" />
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
      <IceInput
        label="Team Name"
        placeholder="Enter your team name"
        value={data.teamName}
        onChange={(e) => updateData({ teamName: e.target.value })}
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-rajdhani text-sm tracking-wide text-muted-foreground">
            Team Members
          </label>
          {data.members.length < 4 && (
            <motion.button
              onClick={addMember}
              className="flex items-center gap-1 text-ice-glow text-sm font-rajdhani hover:text-ice-frost transition-colors"
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
            className="p-4 rounded-lg bg-void-mid/30 border border-ice-primary/10 space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-rajdhani text-sm text-ice-frost/80">
                {index === 0 ? 'Team Lead' : `Member ${index + 1}`}
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
            
            <div className="grid sm:grid-cols-2 gap-3">
              <IceInput
                placeholder="Name"
                value={member.name}
                onChange={(e) => updateMember(index, { name: e.target.value })}
              />
              <IceInput
                placeholder="Email"
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
        <label className="block mb-2 font-rajdhani text-sm tracking-wide text-muted-foreground">
          Project Idea
        </label>
        <textarea
          className="input-ice min-h-[120px] resize-none"
          placeholder="Describe your project idea briefly..."
          value={data.projectIdea}
          onChange={(e) => updateData({ projectIdea: e.target.value })}
        />
      </div>
      
      <div>
        <label className="block mb-2 font-rajdhani text-sm tracking-wide text-muted-foreground">
          Team Experience Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Beginner', 'Intermediate', 'Expert'].map((level) => (
            <motion.button
              key={level}
              onClick={() => updateData({ experience: level })}
              className={`
                p-3 rounded-lg border font-rajdhani transition-all
                ${data.experience === level 
                  ? 'border-ice-primary bg-ice-primary/20 text-ice-glow' 
                  : 'border-ice-primary/20 bg-void-mid/30 text-muted-foreground hover:border-ice-primary/40'}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ConfirmStep = () => {
  const { data, updateData } = useRegistrationStore();
  
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-void-mid/30 border border-ice-primary/10">
        <h4 className="font-orbitron text-ice-frost mb-4">Registration Summary</h4>
        
        <div className="space-y-3 font-rajdhani text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Team Name:</span>
            <span className="text-ice-frost">{data.teamName || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Team Size:</span>
            <span className="text-ice-frost">{data.members.length} member(s)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Experience:</span>
            <span className="text-ice-frost">{data.experience || 'Not set'}</span>
          </div>
        </div>
      </div>
      
      <motion.label
        className="flex items-start gap-3 cursor-pointer group"
        whileHover={{ x: 2 }}
      >
        <input
          type="checkbox"
          checked={data.agreeToRules}
          onChange={(e) => updateData({ agreeToRules: e.target.checked })}
          className="mt-1 w-5 h-5 rounded border-ice-primary/50 bg-void-mid text-ice-primary focus:ring-ice-primary/50"
        />
        <span className="font-rajdhani text-sm text-muted-foreground group-hover:text-ice-frost transition-colors">
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
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setStep(currentStep + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    // Generate team ID
    const id = `ICE-${data.teamName.toUpperCase().replace(/\s+/g, '-').slice(0, 10)}-${Math.floor(Math.random() * 100)}`;
    setTeamId(id);
    navigate('/success');
  };
  
  const isStepValid = () => {
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
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-orbitron text-3xl md:text-5xl text-ice-frost mb-4">
            Join the <span className="text-ice-glow text-glow">Challenge</span>
          </h1>
          <p className="font-rajdhani text-lg text-muted-foreground">
            Register your team and prepare for the ultimate hackathon experience
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Artifact */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-full h-[500px] relative">
              <ArtifactCrystal speed={0.3 + currentStep * 0.5} />
              
              {/* Glow backdrop */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, hsl(185 100% 50% / 0.1) 0%, transparent 60%)',
                }}
              />
            </div>
          </motion.div>
          
          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6 md:p-8" variant="glow">
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
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-ice-primary/10">
                <IceButton
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="opacity-0 data-[visible=true]:opacity-100"
                  data-visible={currentStep > 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </IceButton>
                
                {currentStep < steps.length - 1 ? (
                  <IceButton
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </IceButton>
                ) : (
                  <IceButton
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                  >
                    Submit Registration
                  </IceButton>
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
