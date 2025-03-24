import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnUfbejl9rFzagfOGK4s88NRmkCtIoWW0",
    authDomain: "dripmart-fb9d5.firebaseapp.com",
    projectId: "dripmart-fb9d5",
    storageBucket: "dripmart-fb9d5.firebasestorage.app",
    messagingSenderId: "760243643282",
    appId: "1:760243643282:web:7911f1fe65f36e4179174b",
    measurementId: "G-8VL1SP6WC3"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);