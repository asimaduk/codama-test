import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf95Skly4MRP5PQ4kSVCjRXHBzNaUyqbg",
  authDomain: "codama-test-82eb4.firebaseapp.com",
  projectId: "codama-test-82eb4",
  storageBucket: "codama-test-82eb4.appspot.com",
  messagingSenderId: "285504382254",
  appId: "1:285504382254:web:6b8462969ba4c410e146bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;