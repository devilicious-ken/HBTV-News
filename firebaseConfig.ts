import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhfAX5BAT9L0ZGKRDAI7gIuSdjzqlUwOE",
    authDomain: "hbtv-news.firebaseapp.com",
    projectId: "hbtv-news",
    storageBucket: "hbtv-news.firebasestorage.app",
    messagingSenderId: "1017398497279",
    appId: "1:1017398497279:web:a63d7bb57e86c6087761ca",
    measurementId: "G-0KK12QDY6E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth instance
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
