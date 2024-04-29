import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDS8FIFBpP2yZK2X8ehZHl7Gfq5tmjElsk",
  authDomain: "disney-plus-clone-4ad5d.firebaseapp.com",
  projectId: "disney-plus-clone-4ad5d",
  storageBucket: "disney-plus-clone-4ad5d.appspot.com",
  messagingSenderId: "849825888957",
  appId: "1:849825888957:web:f01b803594de25790615d4",
  measurementId: "G-NWEXMMPTC3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
