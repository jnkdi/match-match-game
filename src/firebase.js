import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDO4hb8SUaaXuTNtnKmADMBknI67jgANFI",
  authDomain: "match-match-game-9501e.firebaseapp.com",
  projectId: "match-match-game-9501e",
  storageBucket: "match-match-game-9501e.appspot.com",
  messagingSenderId: "146961034414",
  appId: "1:146961034414:web:3da14c96c13e4fbcb1513f",
  measurementId: "G-QWBG5RCFMJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);