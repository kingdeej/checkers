import { initializeApp, firebase} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore' 


const firebaseConfig = {
  apiKey: "AIzaSyBrMQsbTJzGy5e0DkvvemgKBW4aGNLiD3I",
  authDomain: "checkers-be894.firebaseapp.com",
  projectId: "checkers-be894",
  storageBucket: "checkers-be894.appspot.com",
  messagingSenderId: "110812986846",
  appId: "1:110812986846:web:c966ab685202394aaef14f",
  measurementId: "G-5YDT018SSP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
