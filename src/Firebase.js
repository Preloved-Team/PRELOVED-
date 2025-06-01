import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4T-MB0EV1Lj0HXx03-5IZ5GaJYgTO4sA",
  authDomain: "testingdatabase-dd82a.firebaseapp.com",
  projectId: "testingdatabase-dd82a",
  storageBucket: "testingdatabase-dd82a.firebasestorage.app",
  messagingSenderId: "445106324971",
  appId: "1:445106324971:web:06f34c7326397a3c5ec5ae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db};