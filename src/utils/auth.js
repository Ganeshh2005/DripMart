import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (email, password, userData) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: userData.displayName || '',
      phoneNumber: userData.phoneNumber || '',
      dateOfBirth: userData.dateOfBirth || '',
      address: userData.address || '',
      city: userData.city || '',
      state: userData.state || '',
      zipCode: userData.zipCode || '',
      ...userData,
      createdAt: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error('Registration error:', error.code, error.message);
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('This email is already registered');
      case 'auth/invalid-email':
        throw new Error('Invalid email format');
      case 'auth/operation-not-allowed':
        throw new Error('Email/password registration is not enabled');
      case 'auth/weak-password':
        throw new Error('Password is too weak');
      default:
        throw new Error('Registration failed. Please try again.');
    }
  }
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.code, error.message);
    switch (error.code) {
      case 'auth/invalid-email':
        throw new Error('Invalid email address format');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled');
      case 'auth/user-not-found':
        throw new Error('No account found with this email');
      case 'auth/wrong-password':
        throw new Error('Incorrect password');
      case 'auth/too-many-requests':
        throw new Error('Too many failed login attempts. Please try again later');
      default:
        throw new Error('Failed to login. Please try again');
    }
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Registration error:', error.code, error.message);
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('This email is already registered');
      case 'auth/invalid-email':
        throw new Error('Invalid email format');
      case 'auth/operation-not-allowed':
        throw new Error('Email/password registration is not enabled');
      case 'auth/weak-password':
        throw new Error('Password is too weak');
      default:
        throw new Error('Registration failed. Please try again.');
    }
  }
};