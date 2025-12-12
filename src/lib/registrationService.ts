import { collection, addDoc, doc, getDoc, updateDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { RegistrationData } from '../stores/registrationStore';

export interface FirebaseRegistrationData extends Omit<RegistrationData, 'isVerified' | 'recaptchaToken'> {
  id?: string;
  teamId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'pending' | 'approved' | 'rejected';
  submissionTime: Timestamp;
}

class RegistrationService {
  private collectionName = 'hackathon_registrations';

  async saveRegistration(data: RegistrationData): Promise<{id: string, teamId: string}> {
    try {
      const teamId = this.generateTeamId();
      const registrationData: Omit<FirebaseRegistrationData, 'id'> = {
        teamName: data.teamName,
        teamSize: data.teamSize,
        members: data.members,
        projectIdea: data.projectIdea,
        projectTitle: data.projectTitle,
        domain: data.domain,
        agreeToRules: data.agreeToRules,
        teamId: teamId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        status: 'pending',
        submissionTime: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, this.collectionName), registrationData);
      console.log('Registration saved with ID: ', docRef.id, 'Team ID:', teamId);
      return { id: docRef.id, teamId: teamId };
    } catch (error) {
      console.error('Firebase error details: ', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Provide more specific error messages
      if (error.code === 'permission-denied') {
        throw new Error('Database access denied. Please check Firestore rules.');
      } else if (error.code === 'unavailable') {
        throw new Error('Database unavailable. Please check your connection.');
      } else if (error.code === 'not-found') {
        throw new Error('Database not found. Please check Firebase setup.');
      } else {
        throw new Error(`Firebase error: ${error.message || 'Failed to save registration. Please try again.'}`);
      }
    }
  }

  async getRegistrationByTeamId(teamId: string): Promise<FirebaseRegistrationData | null> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const registrations: FirebaseRegistrationData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as FirebaseRegistrationData;
        if (data.teamId === teamId) {
          registrations.push(data);
        }
      });
      
      return registrations.length > 0 ? registrations[0] : null;
    } catch (error) {
      console.error('Error getting registration by team ID: ', error);
      throw new Error('Failed to find team registration.');
    }
  }

  async getAllRegistrations(): Promise<FirebaseRegistrationData[]> {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const registrations: FirebaseRegistrationData[] = [];
      
      querySnapshot.forEach((doc) => {
        registrations.push({ id: doc.id, ...doc.data() } as FirebaseRegistrationData);
      });
      
      // Sort by creation date (newest first)
      return registrations.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
    } catch (error) {
      console.error('Error getting all registrations: ', error);
      throw new Error('Failed to fetch registrations.');
    }
  }

  async updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        status: status,
        updatedAt: Timestamp.now()
      });
      console.log(`Registration ${id} status updated to ${status}`);
    } catch (error) {
      console.error('Error updating registration status: ', error);
      throw new Error('Failed to update registration status.');
    }
  }

  async getRegistration(id: string): Promise<FirebaseRegistrationData | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as FirebaseRegistrationData;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error getting registration: ', error);
      throw new Error('Failed to retrieve registration.');
    }
  }

  async updateRegistration(id: string, data: Partial<RegistrationData>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const updateData = {
        ...data,
        updatedAt: Timestamp.now()
      };
      
      await updateDoc(docRef, updateData);
      console.log('Registration updated successfully');
    } catch (error) {
      console.error('Error updating registration: ', error);
      throw new Error('Failed to update registration.');
    }
  }

  // Generate a concise team ID
  generateTeamId(): string {
    const prefix = 'ICE';
    const timestamp = Date.now().toString(36).slice(-4).toUpperCase(); // Last 4 chars of timestamp in base36
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase(); // 3 random chars
    return `${prefix}-${timestamp}-${randomStr}`; // Format: ICE-XXXX-XXX (11 chars total)
  }
}

export const registrationService = new RegistrationService();