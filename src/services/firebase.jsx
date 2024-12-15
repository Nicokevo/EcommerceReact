import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMxSh7E2dsKnPCnZXM244_2kuHu0Vrve4",
  authDomain: "proyecto-ecommerce-drift.firebaseapp.com",
  projectId: "proyecto-ecommerce-drift",
  storageBucket: "proyecto-ecommerce-drift.appspot.com",
  messagingSenderId: "637810251400",
  appId: "1:637810251400:web:945a8db55fbff43e74713d",
};

// Initialize the Firebase application
const app = initializeApp(firebaseConfig);

// Initialize Firestore using the app instance
const db = getFirestore(app);

// Export the necessary functions and objects
export { db, doc, getDoc };

