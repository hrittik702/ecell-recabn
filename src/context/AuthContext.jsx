import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { isAdmin } from '../utils/auth';

const defaultAuthValue = {
  currentUser: null,
  userData: null,
  loading: false,
  isAdmin: false,
  updateUserData: () => {}
};

export const AuthContext = createContext(defaultAuthValue);

export function useAuth() {
  const context = useContext(AuthContext);
  return context || defaultAuthValue;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Firestore data (including role & systemRole)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrentUser(user);
      
      if (user) {
        // Fetch user document to get the role (e.g., admin or member)
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // Document doesn't exist, fallback to non-admin member
            setUserData({ role: 'member', systemRole: 'member' });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData({ role: 'member', systemRole: 'member' });
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const value = {
    currentUser,
    userData,
    loading,
    isAdmin: isAdmin(userData),
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

