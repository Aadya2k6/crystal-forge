import { create } from 'zustand';
import { registrationService } from '../lib/registrationService';

export interface TeamMember {
  name: string;
  email: string;
  role: string;
}

export interface RegistrationData {
  teamName: string;
  teamSize: number;
  members: TeamMember[];
  projectIdea: string;
  projectTitle: string;
  domain: string;
  agreeToRules: boolean;
  isVerified: boolean;
  recaptchaToken: string | null;
}

interface RegistrationStore {
  currentStep: number;
  data: RegistrationData;
  teamId: string | null;
  isLoading: boolean;
  error: string | null;
  isSubmitted: boolean;
  setStep: (step: number) => void;
  updateData: (partial: Partial<RegistrationData>) => void;
  updateMember: (index: number, member: Partial<TeamMember>) => void;
  addMember: () => void;
  removeMember: (index: number) => void;
  setTeamId: (id: string) => void;
  setVerification: (token: string | null) => void;
  submitRegistration: () => Promise<string>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialData: RegistrationData = {
  teamName: '',
  teamSize: 1,
  members: [{ name: '', email: '', role: 'Team Lead' }],
  projectIdea: '',
  projectTitle: '',
  domain: '',
  agreeToRules: false,
  isVerified: false,
  recaptchaToken: null,
};

export const useRegistrationStore = create<RegistrationStore>((set, get) => ({
  currentStep: 0,
  data: initialData,
  teamId: null,
  isLoading: false,
  error: null,
  isSubmitted: false,
  
  setStep: (step) => set({ currentStep: step }),
  
  updateData: (partial) => set((state) => ({
    data: { ...state.data, ...partial },
  })),
  
  updateMember: (index, member) => set((state) => ({
    data: {
      ...state.data,
      members: state.data.members.map((m, i) => 
        i === index ? { ...m, ...member } : m
      ),
    },
  })),
  
  addMember: () => set((state) => ({
    data: {
      ...state.data,
      members: [...state.data.members, { name: '', email: '', role: 'Member' }],
      teamSize: state.data.teamSize + 1,
    },
  })),
  
  removeMember: (index) => set((state) => ({
    data: {
      ...state.data,
      members: state.data.members.filter((_, i) => i !== index),
      teamSize: Math.max(1, state.data.teamSize - 1),
    },
  })),
  
  setTeamId: (id) => set({ teamId: id }),
  
  setVerification: (token) => set((state) => ({
    data: {
      ...state.data,
      isVerified: !!token,
      recaptchaToken: token,
    },
  })),

  submitRegistration: async () => {
    const { data } = get();
    set({ isLoading: true, error: null });
    
    try {
      // Validate required fields
      if (!data.teamName || !data.projectIdea || !data.projectTitle || !data.domain || data.members.some(m => !m.name || !m.email)) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!data.agreeToRules) {
        throw new Error('You must agree to the rules to continue');
      }
      
      if (!data.isVerified) {
        throw new Error('Please complete verification');
      }

      // Save to Firebase (team ID will be generated in the service)
      const result = await registrationService.saveRegistration(data);
      
      set({ 
        isLoading: false, 
        isSubmitted: true,
        teamId: result.teamId,
        error: null 
      });
      
      return result.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      throw error;
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  reset: () => set({ 
    currentStep: 0, 
    data: initialData, 
    teamId: null,
    isLoading: false,
    error: null,
    isSubmitted: false
  }),
}));
