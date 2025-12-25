// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBFCimH8J7QVluAfOJfE2awvuFGwho3F4",
  authDomain: "loginpage-5fbdc.firebaseapp.com",
  projectId: "loginpage-5fbdc",
  storageBucket: "loginpage-5fbdc.firebasestorage.app",
  messagingSenderId: "844477667794",
  appId: "1:844477667794:web:5ebb27a370bfc84651900b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const database = getDatabase(app);

export default app;
