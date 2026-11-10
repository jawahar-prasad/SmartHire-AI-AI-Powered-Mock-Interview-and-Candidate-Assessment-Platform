import { db } from '../lib/firebase.js';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Create a user profile document after auth registration.
 * `uid` is the Firebase Auth UID.
 * `data` should contain { name, email, role }.
 */
export const createUserProfile = async (uid, data) => {
  const userRef = doc(db, 'users', uid);
  const payload = {
    uid,
    name: data.name,
    email: data.email,
    role: data.role || 'candidate',
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(userRef, payload);
  return payload;
};

/**
 * Get the user profile document for a given uid.
 */
export const getUserProfile = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    throw new Error('User profile not found');
  }
  return snap.data();
};

/**
 * Update mutable fields of the profile (name, updatedAt).
 * Prevent updates to role, status, uid from client side.
 */
export const updateUserProfile = async (uid, updates) => {
  const allowed = ['name'];
  const filtered = {};
  allowed.forEach((key) => {
    if (updates[key] !== undefined) filtered[key] = updates[key];
  });
  if (Object.keys(filtered).length === 0) return;
  filtered.updatedAt = serverTimestamp();
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, filtered);
};

