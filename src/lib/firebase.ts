import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA2gLQDPY8hPOyCuehnvay0Ryg-9J17Xbk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "numerano-code.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "numerano-code",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "numerano-code.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "167347870770",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:167347870770:web:9b4bf68dcc63ecdeee302b",
  measurementId: "G-CG30TLQGJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// For development, you can connect to emulator
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Firestore emulator already connected or not available');
  }
}

export default app;