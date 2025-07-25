import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp, deleteDoc, doc } from "firebase/firestore";

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

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export const db = getFirestore(app);

export async function addUserSummary({ uid, title, summary }: { uid: string, title: string, summary: string }) {
  return addDoc(collection(db, "summaries"), {
    uid,
    title,
    summary,
    createdAt: Timestamp.now(),
  });
}

export async function getUserSummaries(uid: string) {
  const q = query(collection(db, "summaries"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteUserSummary(id: string) {
  return deleteDoc(doc(db, "summaries", id));
} 