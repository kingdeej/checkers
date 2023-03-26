import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
  
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
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const useAuthState = getAuth(app)
export const provider = new GoogleAuthProvider()
