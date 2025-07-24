import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB5JgDVpU7_fvJWmRvV80Oc7tDyhNhm0oc",
  authDomain: "docsimplify-dev.firebaseapp.com",
  projectId: "docsimplify-dev",
  storageBucket: "docsimplify-dev.firebasestorage.app",
  messagingSenderId: "730111515150",
  appId: "1:730111515150:web:5514ba2825beaf432dba5f",
  measurementId: "G-8R05E3T6Q3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics }; 