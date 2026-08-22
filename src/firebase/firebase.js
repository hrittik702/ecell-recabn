import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW14Uhlx7cgYu2rD-rVihaDAT9XERYbQc",
  authDomain: "ecell-recabn.firebaseapp.com",
  projectId: "ecell-recabn",
  storageBucket: "ecell-recabn.firebasestorage.app",
  messagingSenderId: "312242644774",
  appId: "1:312242644774:web:1f9836ea8afb2cb25ac3e7",
  measurementId: "G-1LW87VPD96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Uncomment if you install firebase analytics

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Secondary app for admin to create users without logging out
const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
export const secondaryAuth = getAuth(secondaryApp);
