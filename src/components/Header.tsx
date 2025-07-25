'use client';

import { LanguageSelector } from "./language-selector";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="border-b border-gray-100 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DocSimplify</h1>
          <p className="text-gray-600 mt-2">Simplifiez vos documents PDF en un clic.</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {user ? (
            <Link
              href="/account"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200 text-sm"
            >
              Mon compte
            </Link>
          ) : (
            <Link
              href="/auth"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200 text-sm"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 