export default function APropos() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 text-center">
          Simplifier contrat PDF, résumé contrat clair, application contrat simple
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Facilitez la compréhension de vos contrats PDF avec DocSimplify
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          DocSimplify est l’application SaaS incontournable pour tous ceux qui souhaitent rendre leurs contrats PDF accessibles et compréhensibles. Grâce à notre technologie avancée, téléversez simplement votre contrat et obtenez en quelques secondes une version simplifiée, rédigée en langage clair, sans jargon juridique. Gagnez du temps, évitez les malentendus et prenez des décisions éclairées !
        </p>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Fonctionnalités clés de DocSimplify</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>Téléversement facile de contrats PDF : Importez vos documents en un clic, sans limite de taille.</li>
          <li>Résumé contrat clair et instantané : Recevez une synthèse précise et simplifiée de chaque clause.</li>
          <li>Application contrat simple multilingue : Profitez d’une interface disponible en plusieurs langues pour s’adapter à tous vos besoins.</li>
          <li>Prise en charge des images et photos de contrats : Numérisez et simplifiez même les contrats papier grâce à l’OCR intégré.</li>
          <li>Confidentialité et sécurité renforcées : Vos documents sont traités de façon sécurisée, sans stockage permanent.</li>
          <li>Interface intuitive et accessible : Naviguez facilement, même sans expertise technique.</li>
        </ul>
        <div className="text-center mb-8">
          <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-200">
            Simplifiez vos contrats maintenant
          </a>
          <p className="mt-2 text-blue-700 font-medium">Essayez DocSimplify gratuitement</p>
        </div>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Sécurité et confidentialité : notre priorité</h2>
        <p className="text-gray-700 mb-6">
          Chez DocSimplify, la sécurité de vos données est essentielle. Tous les fichiers sont traités via des connexions chiffrées et ne sont jamais conservés après traitement. Vos contrats restent strictement confidentiels et ne sont accessibles qu’à vous.
        </p>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">FAQ – Questions fréquentes</h2>
        <div className="space-y-2">
          <div>
            <b>DocSimplify conserve-t-il mes contrats PDF ?</b><br />
            <span className="text-gray-700">Non, vos documents ne sont jamais stockés sur nos serveurs. Ils sont supprimés automatiquement après la simplification.</span>
          </div>
          <div>
            <b>Les résumés générés sont-ils fiables ?</b><br />
            <span className="text-gray-700">Oui, DocSimplify utilise une intelligence artificielle avancée pour garantir des résumés fidèles, clairs et sans perte d’information essentielle.</span>
          </div>
          <div>
            <b>Puis-je utiliser DocSimplify sur mobile ?</b><br />
            <span className="text-gray-700">Absolument ! Notre application est responsive et permet même de prendre en photo un contrat papier pour le simplifier instantanément.</span>
          </div>
        </div>
      </section>
    </main>
  )
} 