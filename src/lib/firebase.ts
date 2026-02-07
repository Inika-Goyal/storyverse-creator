import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const dbConfig = {
  apiKey: "AIzaSyBeg7mNAsUDwJpTFXEoxQtmgH0xDrIHVMs",
  authDomain: "sparkhack1-61e64.firebaseapp.com",
  projectId: "sparkhack1-61e64",
  storageBucket: "sparkhack1-61e64.appspot.com",
  messagingSenderId: "125800191563",
  appId: "1:125800191563:web:9e99032f04db7d23141fce",
};


const app = initializeApp(firebaseConfig);
const dbApp = initializeApp(dbConfig, "dbApp");

export const auth = getAuth(app);
export const db = getFirestore(dbApp); // kyle added
