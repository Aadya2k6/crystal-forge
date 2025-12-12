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
  studentIdCard?: {
    fileName: string;
    fileSize: number;
    base64Data: string;
    uploadedAt: number;
  } | null;
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
  setIdCard: (file: File | null) => Promise<void>;
  validateEmails: () => { isValid: boolean; duplicates: string[]; errors: string[] };
  checkEmailDuplicates: () => Promise<boolean>;
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

  setIdCard: async (file) => {
    if (!file) {
      set((state) => ({
        data: { ...state.data, studentIdCard: null }
      }));
      return;
    }

    // Validate file type and size
    if (file.type !== 'application/pdf') {
      throw new Error('Please upload a PDF file');
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('File size must be less than 5MB');
    }

    try {
      // Convert to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      set((state) => ({
        data: {
          ...state.data,
          studentIdCard: {
            fileName: file.name,
            fileSize: file.size,
            base64Data,
            uploadedAt: Date.now()
          }
        }
      }));
    } catch (error) {
      throw new Error('Failed to process the file');
    }
  },

  validateEmails: () => {
    const { data } = get();
    const emails = data.members.map(member => member.email.toLowerCase().trim()).filter(email => email !== '');
    const duplicates: string[] = [];
    const errors: string[] = [];
    const emailCounts = new Map<string, number>();

    // Check for duplicates within the same registration
    for (const email of emails) {
      emailCounts.set(email, (emailCounts.get(email) || 0) + 1);
    }

    // Find duplicates
    for (const [email, count] of emailCounts) {
      if (count > 1) {
        duplicates.push(email);
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const member of data.members) {
      if (member.email && !emailRegex.test(member.email)) {
        errors.push(`Invalid email format: ${member.email}`);
      }
    }

    if (duplicates.length > 0) {
      errors.push(`Duplicate emails within team: ${duplicates.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      duplicates,
      errors
    };
  },

  checkEmailDuplicates: async () => {
    const { data } = get();
    set({ isLoading: true, error: null });
    
    try {
      // Extract all emails from the registration
      const allEmails = data.members.map(member => member.email).filter(email => email.trim() !== '');
      
      if (allEmails.length === 0) {
        set({ isLoading: false });
        return true;
      }
      
      // Check email uniqueness against database
      const emailValidation = await registrationService.checkEmailUniqueness(allEmails);
      
      if (!emailValidation.isUnique) {
        const errorMessage = `Error: The following email addresses are already registered: ${emailValidation.duplicateEmails.join(', ')}. Each email can only be used once.`;
        set({ 
          isLoading: false, 
          error: errorMessage 
        });
        return false;
      }
      
      set({ isLoading: false, error: null });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? `Error: ${error.message}` : 'Error: Failed to validate emails';
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      return false;
    }
  },

  submitRegistration: async () => {
    const { data, validateEmails } = get();
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

      // Validate emails within the registration
      const emailValidation = validateEmails();
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.errors.join('. '));
      }

      // Save to Firebase (this will also check for duplicates against existing registrations)
      const result = await registrationService.saveRegistration(data);
      
      set({ 
        isLoading: false, 
        isSubmitted: true,
        teamId: result.teamId,
        error: null 
      });
      
      return result.id;
    } catch (error) {
      let errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      // Remove "Firebase error:" prefix and add "Error:" prefix if not present
      if (errorMessage.startsWith('Firebase error:')) {
        errorMessage = errorMessage.replace('Firebase error:', 'Error:');
      } else if (!errorMessage.startsWith('Error:')) {
        errorMessage = `Error: ${errorMessage}`;
      }
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
