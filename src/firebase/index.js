import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBG0aYzbQ9ewN-Z-Bt4TKyzB7cB7uH6ElY",
  authDomain: "resume-builder-776ad.firebaseapp.com",
  projectId: "resume-builder-776ad",
  storageBucket: "resume-builder-776ad.firebasestorage.app",
  messagingSenderId: "39095599421",
  appId: "1:39095599421:web:f9bb612bd9091f3b68c554",
  measurementId: "G-2SRKHH3HDY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {
    auth,
    db
}