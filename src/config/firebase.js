import { initializeApp } from "firebase/app";

// Authentication
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// DataBase - CRUD
import {getFirestore} from 'firebase/firestore'

//Storage - File upload
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyASUJhwV4PCwTuqwiF2D8pOiLnTGPPqOk0",
  authDomain: "fir-learning-85ef2.firebaseapp.com",
  projectId: "fir-learning-85ef2",
  storageBucket: "fir-learning-85ef2.appspot.com",
  messagingSenderId: "666663317586",
  appId: "1:666663317586:web:e8d69656305f0383182f8b",
  measurementId: "G-Y8SPLMCLHE"
};


const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app)
export const authWithGoogle = new GoogleAuthProvider();

// DataBase - CRUD
// for datbase access we have to set rules in firebase that who can perform which action 
export const db = getFirestore(app)

// Storage - File upload
export const storage = getStorage(app)