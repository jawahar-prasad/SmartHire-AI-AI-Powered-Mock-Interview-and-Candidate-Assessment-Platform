import { auth } from '../lib/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from 'firebase/auth';

/**
 * Register a new user with email & password.
 * Returns the Firebase UserCredential.
 */
export const register = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Log in an existing user.
 */
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Send password‑reset email.
 */
export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

/**
 * Sign out the current user.
 */
export const logout = async () => {
  return await signOut(auth);
};

/**
 * Attach a listener for auth state changes.
 * Returns the unsubscribe function.
 */
export const subscribeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

