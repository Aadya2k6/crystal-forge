import { create } from 'zustand';

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
  experience: string;
  agreeToRules: boolean;
}

interface RegistrationStore {
  currentStep: number;
  data: RegistrationData;
  teamId: string | null;
  setStep: (step: number) => void;
  updateData: (partial: Partial<RegistrationData>) => void;
  updateMember: (index: number, member: Partial<TeamMember>) => void;
  addMember: () => void;
  removeMember: (index: number) => void;
  setTeamId: (id: string) => void;
  reset: () => void;
}

const initialData: RegistrationData = {
  teamName: '',
  teamSize: 1,
  members: [{ name: '', email: '', role: 'Team Lead' }],
  projectIdea: '',
  experience: '',
  agreeToRules: false,
};

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  currentStep: 0,
  data: initialData,
  teamId: null,
  
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
  
  reset: () => set({ currentStep: 0, data: initialData, teamId: null }),
}));
