import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD3gZRTQLewTYuQ5EF_6xXomb4hX3oSTk8",
  authDomain: "link-moa.firebaseapp.com",
  projectId: "link-moa",
  storageBucket: "link-moa.appspot.com",
  messagingSenderId: "995211027449",
  appId: "1:995211027449:web:b1ec155fc7f660d4fb9328",
  measurementId: "G-ER8EWZ5QCH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage();
