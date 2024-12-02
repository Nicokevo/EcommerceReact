import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMxSh7E2dsKnPCnZXM244_2kuHu0Vrve4",
  authDomain: "proyecto-ecommerce-drift.firebaseapp.com",
  projectId: "proyecto-ecommerce-drift",
  storageBucket: "proyecto-ecommerce-drift.appspot.com",
  messagingSenderId: "637810251400",
  appId: "1:637810251400:web:945a8db55fbff43e74713d",
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore usando la instancia de app
export const db = getFirestore(app);
