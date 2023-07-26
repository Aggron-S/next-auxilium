// Init Firebase
import { initializeApp } from 'firebase/app';
// Auth
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
// App Check
import {} from 'firebase/app-check';
// Firestore
import { getFirestore } from 'firebase/firestore';
// Storage
import { getStorage } from 'firebase/storage';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyChNbEXf42SwJ5NbfXX2ErRA9aj33SI3T8",
  authDomain: "test-8b653.firebaseapp.com",
  projectId: "test-8b653",
  storageBucket: "test-8b653.appspot.com",
  messagingSenderId: "239932044719",
  appId: "1:239932044719:web:b0a9cf95acb7e26808eb5a",
  measurementId: "G-Z94TSFBYWQ"
};

// Initialize & Export Firebase App
const firebaseApp = initializeApp(firebaseConfig);
// Initialize & Export Services
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);