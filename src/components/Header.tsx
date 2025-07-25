'use client';

import { LanguageSelector } from "./language-selector";

export default function Header() {
  return (
    <header className="border-b border-gray-100 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DocSimplify</h1>
          <p className="text-gray-600 mt-2">Simplifiez vos documents PDF en un clic.</p>
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
} 