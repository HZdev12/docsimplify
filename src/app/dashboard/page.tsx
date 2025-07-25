"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t('dashboardTitle')}</h1>
      {user ? (
        <p className="text-gray-700 mb-8">{t('dashboardConnectedAs') + ' ' + (user.displayName || user.email)}</p>
      ) : (
        <p className="text-gray-700 mb-8">{t('dashboardLoading')}</p>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Accès rapide à l'historique */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{t('dashboardHistoryTitle')}</h2>
          <p className="text-gray-600 mb-4">{t('dashboardHistoryDesc')}</p>
          <Link href="/account" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">{t('dashboardHistoryCTA')}</Link>
        </div>
        {/* Upload de document */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{t('dashboardUploadTitle')}</h2>
          <p className="text-gray-600 mb-4">{t('dashboardUploadDesc')}</p>
          <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold">{t('dashboardUploadCTA')}</Link>
        </div>
        {/* Profil utilisateur */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{t('dashboardProfileTitle')}</h2>
          <p className="text-gray-600 mb-4">{t('dashboardProfileDesc')}</p>
          <Link href="/account" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 font-semibold">{t('dashboardProfileCTA')}</Link>
        </div>
        {/* Tarifs & abonnement */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{t('dashboardPricingTitle')}</h2>
          <p className="text-gray-600 mb-4">{t('dashboardPricingDesc')}</p>
          <Link href="/pricing" className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded hover:bg-yellow-500 font-semibold">{t('dashboardPricingCTA')}</Link>
        </div>
      </div>

      <section className="bg-blue-50 rounded-xl p-8 border border-blue-100 shadow-inner">
        <h2 className="text-xl font-bold text-blue-800 mb-4">{t('dashboardFeaturesTitle')}</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>{t('dashboardFeature1')}</li>
          <li>{t('dashboardFeature2')}</li>
          <li>{t('dashboardFeature3')}</li>
          <li>{t('dashboardFeature4')}</li>
          <li>{t('dashboardFeature5')}</li>
          <li>{t('dashboardFeature6')}</li>
          <li>{t('dashboardFeature7')}</li>
          <li>{t('dashboardFeature8')}</li>
          <li>{t('dashboardFeature9')}</li>
        </ul>
      </section>
    </main>
  );
} 