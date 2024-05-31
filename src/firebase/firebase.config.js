// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_piKey,
  authDomain: import.meta.env.VITE_uthDomain,
  projectId: import.meta.env.VITE_rojectId,
  storageBucket: import.meta.env.VITE_torageBucket,
  messagingSenderId: import.meta.env.VITE_essagingSenderId,
  appId: import.meta.env.VITE_ppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;