import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1T3SRsa6p97-IDx8Y0Aj0Yo0epqu7Euc",
  authDomain: "plant-io-a81af.firebaseapp.com",
  projectId: "plant-io-a81af",
  storageBucket: "plant-io-a81af.firebasestorage.app",
  messagingSenderId: "683202505907",
  appId: "1:683202505907:web:62a85086422450658714c6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);