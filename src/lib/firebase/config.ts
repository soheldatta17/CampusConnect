import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCutKGmoVCOSnyJfRlwH4pDFJopk1ANezQ",
  authDomain: "fir-course-c2fc5.firebaseapp.com",
  projectId: "fir-course-c2fc5",
  storageBucket: "fir-course-c2fc5.appspot.com",
  messagingSenderId: "3294033420",
  appId: "1:3294033420:web:caa76a7eb36043caa12029",
  measurementId: "G-3QBM8MDGD1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);