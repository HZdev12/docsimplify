"use client";
import Link from 'next/link'
import { useLanguage } from "@/contexts/language-context";

export default function Pricing() {
  const { t } = useLanguage();
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('pricingTitle')}</h1>
      <p className="text-center text-lg text-gray-700 mb-10">{t('pricingSubtitle')}</p>
      <div className="grid gap-8 md:grid-cols-3">
        {/* Freemium */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4">{t('pricingFreemiumTitle')}</h2>
          <p className="mb-6 text-gray-600">{t('pricingFreemiumDesc')}</p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-2">
            <li>{t('pricingFreemium1')}</li>
            <li>{t('pricingFreemium2')}</li>
            <li>{t('pricingFreemium3')}</li>
            <li>{t('pricingFreemium4')}</li>
          </ul>
          <Link href="/signup" className="block text-center bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            {t('pricingFreemiumCTA')}
          </Link>
        </div>
        {/* Pro */}
        <div className="border rounded-lg p-6 shadow-md bg-blue-50 hover:shadow-lg transition relative">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-yellow-300 z-10">{t('pricingPopular')}</span>
          <h2 className="text-2xl font-semibold mb-4">{t('pricingProTitle')}</h2>
          <p className="mb-6 text-gray-600">{t('pricingProDesc')}</p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-2">
            <li>{t('pricingPro1')}</li>
            <li>{t('pricingPro2')}</li>
            <li>{t('pricingPro3')}</li>
            <li>{t('pricingPro4')}</li>
            <li>{t('pricingPro5')}</li>
          </ul>
          <p className="text-3xl font-bold mb-6">{t('pricingProPrice')}</p>
          <Link href="/signup?plan=pro" className="block text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            {t('pricingProCTA')}
          </Link>
        </div>
        {/* Entreprise */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4">{t('pricingEnterpriseTitle')}</h2>
          <p className="mb-6 text-gray-600">{t('pricingEnterpriseDesc')}</p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-2">
            <li>{t('pricingEnterprise1')}</li>
            <li>{t('pricingEnterprise2')}</li>
            <li>{t('pricingEnterprise3')}</li>
            <li>{t('pricingEnterprise4')}</li>
          </ul>
          <p className="text-3xl font-bold mb-6">{t('pricingEnterprisePrice')}</p>
          <Link href="/contact" className="block text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            {t('pricingEnterpriseCTA')}
          </Link>
        </div>
      </div>
      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">{t('pricingFAQTitle')}</h2>
        <div className="divide-y divide-gray-200 rounded-xl shadow-md bg-white overflow-hidden">
          <details className="group p-6 cursor-pointer" open>
            <summary className="flex items-center justify-between font-semibold text-lg text-gray-900 group-open:text-blue-700 transition-colors">
              {t('pricingFAQ1Q')}
              <span className="ml-2 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-700">{t('pricingFAQ1A')}</p>
          </details>
          <details className="group p-6 cursor-pointer">
            <summary className="flex items-center justify-between font-semibold text-lg text-gray-900 group-open:text-blue-700 transition-colors">
              {t('pricingFAQ2Q')}
              <span className="ml-2 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-700">{t('pricingFAQ2A')}</p>
          </details>
          <details className="group p-6 cursor-pointer">
            <summary className="flex items-center justify-between font-semibold text-lg text-gray-900 group-open:text-blue-700 transition-colors">
              {t('pricingFAQ3Q')}
              <span className="ml-2 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-700">{t('pricingFAQ3A')}</p>
          </details>
        </div>
      </section>
    </main>
  )
} 