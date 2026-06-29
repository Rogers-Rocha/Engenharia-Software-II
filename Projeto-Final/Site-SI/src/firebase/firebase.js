// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlPTDFhS7JJvAczERtBGhWs4qop8RrN5Y",
  authDomain: "si-ufpi.firebaseapp.com",
  projectId: "si-ufpi",
  storageBucket: "si-ufpi.firebasestorage.app",
  messagingSenderId: "294552269758",
  appId: "1:294552269758:web:01d858165c1679b4dfffef",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
