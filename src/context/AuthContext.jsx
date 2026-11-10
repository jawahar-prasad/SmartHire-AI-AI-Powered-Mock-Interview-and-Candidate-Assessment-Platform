import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as firebaseRegister, login as firebaseLogin, logout as firebaseLogout, resetPassword as firebaseResetPassword, subscribeAuthState } from '../services/authService.js';
import { updateProfile } from 'firebase/auth';
import { createUserProfile, getUserProfile } from '../services/userService.js';

// Context values shape
const AuthContext = createContext({
  user: null,          // Firebase Auth user object
  profile: null,       // Firestore profile document
  loading: true,       // true while initializing or processing
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = subscribeAuthState(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const prof = await getUserProfile(firebaseUser.uid);
          setProfile(prof);
        } catch (e) {
          // Profile missing – could be a race condition after registration
          console.warn('Profile not found, creating default candidate profile', e);
          // Fallback: create minimal profile (should not happen in normal flow)
          const defaultProfile = await createUserProfile(firebaseUser.uid, {
            name: firebaseUser.displayName || 'Unnamed',
            email: firebaseUser.email,
            role: 'candidate',
          });
          setProfile(defaultProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Helper to handle registration flow
  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const cred = await firebaseRegister(email, password);
      const uid = cred.user.uid;
      // Set display name
      await updateProfile(cred.user, { displayName: name });
      // Create Firestore profile with role "candidate"
      const profileData = await createUserProfile(uid, { name, email, role: 'candidate' });
      setUser(cred.user);
      setProfile(profileData);
      // Redirect to candidate dashboard
      navigate('/candidate/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Registration error', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Helper for login flow
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const cred = await firebaseLogin(email, password);
      const uid = cred.user.uid;
      const prof = await getUserProfile(uid);
      // Verify account status
      if (prof.status !== 'active') {
        throw new Error('Account disabled');
      }
      setUser(cred.user);
      setProfile(prof);
      // Redirect based on role
      switch (prof.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'recruiter':
          navigate('/recruiter/dashboard');
          break;
        default:
          navigate('/candidate/dashboard');
      }
      return { success: true };
    } catch (error) {
      console.error('Login error', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await firebaseLogout();
      setUser(null);
      setProfile(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email) => {
    setLoading(true);
    try {
      await firebaseResetPassword(email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
    resetPassword: handleResetPassword,
  }), [user, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
