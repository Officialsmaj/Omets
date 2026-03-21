import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from '../types';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

const VERIFICATION_CODE_TTL = 15 * 60 * 1000; // 15 minutes

const generateVerificationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return {
    code,
    expiry: Date.now() + VERIFICATION_CODE_TTL,
  };
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  registerWithEmail: (email: string, pass: string, firstName: string, lastName: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  resendCode: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            // Create a default user doc if missing (for any provider)
            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              photoURL: firebaseUser.photoURL,
              role: firebaseUser.email === 'officialsmaj@gmail.com' ? 'admin' : 'user',
              verified: firebaseUser.emailVerified || (firebaseUser.providerData[0]?.providerId === 'google.com'),
              omtBalance: 100,
            };
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
              setUser(newUser);
            } catch (err) {
              console.error('Failed to auto-create user document:', err);
              // Fallback to local state if Firestore write fails
              setUser(newUser);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        if (firebaseUser) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const registerWithEmail = async (email: string, pass: string, firstName: string, lastName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    // Generate 6-digit verification code
    const { code, expiry } = generateVerificationCode();
    
    const newUser: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: `${firstName} ${lastName}`,
      photoURL: null,
      role: 'user',
      verified: false,
      omtBalance: 100, // Welcome bonus
    };

    // Store user with verification code
    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...newUser,
        verificationCode: code,
        verificationExpiry: expiry,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
    }

    // Send verification email via backend
    await sendVerificationEmail(email, code);

    setUser(newUser);
  };

  const sendVerificationEmail = async (email: string, code: string) => {
    try {
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (!res.ok) throw new Error('Backend unavailable');
    } catch (error) {
      console.error('Failed to send verification email:', error);
      alert(`Backend unavailable (GitHub Pages mode). Your verification code is: ${code}`);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      setUser(userDoc.data() as User);
    } else {
      // Document will be created by onAuthStateChanged, but we set it here for immediate feedback
      const newUser: User = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'User',
        photoURL: userCredential.user.photoURL,
        role: userCredential.user.email === 'officialsmaj@gmail.com' ? 'admin' : 'user',
        verified: userCredential.user.emailVerified || false,
        omtBalance: 100,
      };
      setUser(newUser);
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    if (!auth.currentUser) return false;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (!userDoc.exists()) return false;

      const userData = userDoc.data();
      const storedCode = userData.verificationCode;
      const expiry = userData.verificationExpiry;

      if (!storedCode) return false;

      if (expiry && Date.now() > expiry) {
        throw new Error('Verification code has expired. Please request a new one.');
      }

      if (storedCode === code) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          verified: true,
          verificationCode: null, // Clear code after verification
          verificationExpiry: null,
        });
        setUser(prev => prev ? { ...prev, verified: true } : null);
        return true;
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${auth.currentUser.uid}`);
    }
    return false;
  };

  const resendCode = async () => {
    if (!auth.currentUser || !user) return;

    // Generate new 6-digit verification code
    const { code, expiry } = generateVerificationCode();

    try {
      // Update Firestore with new code
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        verificationCode: code,
        verificationExpiry: expiry,
      });

      // Send verification email via backend
      await sendVerificationEmail(user.email!, code);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${auth.currentUser.uid}`);
      throw error;
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, registerWithEmail, signInWithEmail, verifyCode, resendCode, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
