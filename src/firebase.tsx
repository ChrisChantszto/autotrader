// firebase.js (or in App.tsx)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // For newsletter subscription

const firebaseConfig = {
  apiKey: "AIzaSyCUnZpyk34RGRPh_nVlbHgqCnw0YPXuu6s",
  authDomain: "autoroll-2ed01.firebaseapp.com",
  projectId: "autoroll-2ed01",
  storageBucket: "autoroll-2ed01.firebasestorage.app",
  messagingSenderId: "21218709132",
  appId: "1:21218709132:web:62b9355aa5221641ff75a9",
  measurementId: "G-BXSXRJ6EKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // For Firestore (newsletter)

export { auth, db, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword };