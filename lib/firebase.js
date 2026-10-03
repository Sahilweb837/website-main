import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Netcoder Firebase Configuration (from original application)
export const firebaseConfig = {
  apiKey: "AIzaSyA8sJcCZgr-s560FDQqJf2PZygw7UfikiY",
  authDomain: "otp-for-netcoder-website.firebaseapp.com",
  projectId: "otp-for-netcoder-website",
  storageBucket: "otp-for-netcoder-website.firebasestorage.app",
  messagingSenderId: "986300499230",
  appId: "1:986300499230:web:57c01bce30fe09c5f6350f",
  measurementId: "G-X4NBHP5WSR"
};

// Initialize Firebase safely for SSR/Client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const getFirebaseAuth = () => {
  if (typeof window !== "undefined") {
    return getAuth(app);
  }
  return null;
};

export default app;
