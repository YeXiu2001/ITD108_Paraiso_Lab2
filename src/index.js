// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTDJ6h1-Ne-Z3Q4Oz9wh8hE30AuKEQXqo",
  authDomain: "itd108-6bfdf.firebaseapp.com",
  projectId: "itd108-6bfdf",
  storageBucket: "itd108-6bfdf.appspot.com",
  messagingSenderId: "611256738386",
  appId: "1:611256738386:web:629acac4d31f9e717ef58b",
  measurementId: "G-KQ716VG58X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);