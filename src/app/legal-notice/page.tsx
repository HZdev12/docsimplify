export default function LegalNoticePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Mentions légales</h1>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Éditeur du site</h2>
          <p className="text-gray-700">Le site <strong>DocSimplify</strong> est édité par la société DocSimplify, SARL au capital de 100 000 MAD,<br />
            immatriculée au Registre du Commerce de Casablanca sous le numéro 123456,<br />
            dont le siège social est situé au Km 10 Route D'el Jadida, Pl N° 114 B, 1er Étage, Lissasfa.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Directeur de la publication</h2>
          <p className="text-gray-700">Hamza Zidane</p>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Hébergement</h2>
          <p className="text-gray-700">Le site est hébergé par <strong>Vercel Inc.</strong>,<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Propriété intellectuelle</h2>
          <p className="text-gray-700">Tous les contenus du site DocSimplify, incluant textes, images, logos, sont la propriété exclusive de DocSimplify.<br />
            Toute reproduction partielle ou totale est interdite sans autorisation écrite.</p>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Protection des données personnelles</h2>
          <p className="text-gray-700">Conformément à la réglementation en vigueur, les données personnelles collectées sont utilisées uniquement pour la gestion des utilisateurs et la fourniture des services.<br />
            Vous disposez d’un droit d’accès, de rectification et de suppression de vos données sur simple demande.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-gray-700">Email : <a href="mailto:support@docsimplify.com" className="text-blue-600 hover:underline">support@docsimplify.com</a></p>
        </section>
      </div>
    </main>
  );
} 