"use client";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function APropos() {
  const { t } = useLanguage();
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 text-center">
          {t('aboutHeroTitle')}
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('aboutHeroSubtitle')}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          {t('aboutHeroDescription')}
        </p>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">{t('aboutFeaturesTitle')}</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>{t('aboutFeatureUpload')}</li>
          <li>{t('aboutFeatureSummary')}</li>
          <li>{t('aboutFeatureMultilang')}</li>
          <li>{t('aboutFeatureOCR')}</li>
          <li>{t('aboutFeatureSecurity')}</li>
          <li>{t('aboutFeatureUX')}</li>
        </ul>
        <div className="text-center mb-8">
          <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-200">
            {t('aboutCTA')}
          </Link>
          <p className="mt-2 text-blue-700 font-medium">{t('aboutTryFree')}</p>
        </div>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">{t('aboutSecurityTitle')}</h2>
        <p className="text-gray-700 mb-6">
          {t('aboutSecurityText')}
        </p>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">{t('aboutFAQTitle')}</h2>
        <div className="space-y-2">
          <div>
            <b>{t('aboutFAQ1Q')}</b><br />
            <span className="text-gray-700">{t('aboutFAQ1A')}</span>
          </div>
          <div>
            <b>{t('aboutFAQ2Q')}</b><br />
            <span className="text-gray-700">{t('aboutFAQ2A')}</span>
          </div>
          <div>
            <b>{t('aboutFAQ3Q')}</b><br />
            <span className="text-gray-700">{t('aboutFAQ3A')}</span>
          </div>
        </div>
      </section>
    </main>
  )
} 