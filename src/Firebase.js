import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_AM5jFKhCiz3dxbLRkelgRHZVYDBRfok",
  authDomain: "preloved-54326.firebaseapp.com",
  projectId: "preloved-54326",
  storageBucket: "preloved-54326.firebasestorage.app",
  messagingSenderId: "352245937206",
  appId: "1:352245937206:web:fa68ad8b469717af30d497",
  measurementId: "G-8MNHKCRBD0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};