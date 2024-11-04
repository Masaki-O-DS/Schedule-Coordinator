import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsRAHNdrJCJWFrj9A8LP-3GZNhvf3NX5U",
  authDomain: "schedule-coordinator-430bd.firebaseapp.com",
  projectId: "schedule-coordinator-430bd",
  storageBucket: "schedule-coordinator-430bd.firebasestorage.app",
  messagingSenderId: "300392378790",
  appId: "1:300392378790:web:d495310d52b75417851f67",
  measurementId: "G-TS1E49GRSN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //認証の初期化
const provider = new GoogleAuthProvider();
const db = getFirestore(); //データベース初期化
// const analytics = getAnalytics(app);

export { auth, provider, db };
