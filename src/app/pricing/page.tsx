import Link from 'next/link'

export default function Pricing() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Nos plans d’abonnement</h1>
      <p className="text-center text-lg text-gray-700 mb-10">Choisissez un plan adapté à votre besoin et commencez à simplifier vos contrats immédiatement.</p>
      <div className="grid gap-8 md:grid-cols-3">
        {/* Freemium */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4">Freemium</h2>
          <p className="mb-6 text-gray-600">3 documents simplifiés/mois • gestion simple • export PDF</p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-2">
            <li>3 documents / mois</li>
            <li>Résumé automatique</li>
            <li>Export PDF</li>
            <li>Support par email</li>
          </ul>
          <Link href="/signup" className="block text-center bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            Commencer Gratuitement
          </Link>
        </div>
        {/* Pro */}
        <div className="border rounded-lg p-6 shadow-md bg-blue-50 hover:shadow-lg transition relative">
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-yellow-300 z-10">Le plus populaire</span>
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="mb-6 text-gray-600">Illimité, export XLS/CSV, historique, support prioritaire</p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-2">
            <li>Documents illimités</li>
            <li>Export PDF, CSV, Excel</li>
            <li>Accès à l’historique</li>
            <li>Analyse de clauses+</li>
            <li>Support prioritaire</li>
          </ul>
          <p className="text-3xl font-bold mb-6">99 MAD / mois</p>
          <Link href="/signup?plan=pro" className="block text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Je m’abonne
          </Link>
        </div>
        {/* Entreprise */}
        <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-2xl font-semibold mb-4">Entreprise</h2>
          <p className="mb-6 text-gray-600">Tous les avantages Pro + collaboration, API privée, SLA</p>
          <ul className="mb-6 list-disc list-inside text-gray-800 space-y-2">
            <li>Fonctionnalités Pro</li>
            <li>Collaboration multi-utilisateur</li>
            <li>API privée & intégrations</li>
            <li>SLA & support dévoué</li>
          </ul>
          <p className="text-3xl font-bold mb-6">299 MAD / mois</p>
          <Link href="/contact" className="block text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Demander Demo
          </Link>
        </div>
      </div>
      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">FAQ</h2>
        <div className="divide-y divide-gray-200 rounded-xl shadow-md bg-white overflow-hidden">
          <details className="group p-6 cursor-pointer" open>
            <summary className="flex items-center justify-between font-semibold text-lg text-gray-900 group-open:text-blue-700 transition-colors">
              Quels modes de paiement acceptez-vous ?
              <span className="ml-2 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-700">Carte bancaire via Stripe (Visa, Mastercard, etc.). Factures PDF disponibles.</p>
          </details>
          <details className="group p-6 cursor-pointer">
            <summary className="flex items-center justify-between font-semibold text-lg text-gray-900 group-open:text-blue-700 transition-colors">
              Puis-je changer de plan à tout moment ?
              <span className="ml-2 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-700">Oui, la montée ou la descente de plan est instantanée.</p>
          </details>
          <details className="group p-6 cursor-pointer">
            <summary className="flex items-center justify-between font-semibold text-lg text-gray-900 group-open:text-blue-700 transition-colors">
              Offrez-vous des essais pour les entreprises ?
              <span className="ml-2 text-blue-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-700">Oui, contactez-nous via le formulaire ou le chat en ligne.</p>
          </details>
        </div>
      </section>
    </main>
  )
} 