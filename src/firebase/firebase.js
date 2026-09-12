import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Web app Firebase client configuration
// Note: These are client-side public identifiers, not server secrets.
// Environment variables allow clean deployment separation and configuration management.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDW14Uhlx7cgYu2rD-rVihaDAT9XERYbQc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ecell-recabn.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ecell-recabn",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ecell-recabn.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "312242644774",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:312242644774:web:1f9836ea8afb2cb25ac3e7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1LW87VPD96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Secondary app for admin to create users without logging out
const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
export const secondaryAuth = getAuth(secondaryApp);

