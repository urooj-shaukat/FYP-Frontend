import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDOz5oBXJOitqPehx19bTdmrecQ5UzBbAA",
  authDomain: "prograde-78475.firebaseapp.com",
  projectId: "prograde-78475",
  storageBucket: "prograde-78475.appspot.com",
  messagingSenderId: "103643381769",
  appId: "1:103643381769:web:3e0493c0cd1a4f6dd2b8d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


 const storage = getStorage(app);
 export default storage;