import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-row gap-6 justify-center items-center">
          <Link className="text-gray-500 hover:text-gray-700 hover:underline text-sm" href="/legal-notice">
            Mentions légales
          </Link>
          <Link className="text-gray-500 hover:text-gray-700 hover:underline text-sm" href="/a-propos">
            À propos
          </Link>
          <Link className="text-gray-500 hover:text-gray-700 hover:underline text-sm" href="/contact">
            Contact
          </Link>
        </div>
        <p className="text-gray-400 text-xs mt-4">© 2025 DocSimplify. Tous droits réservés.</p>
      </div>
    </footer>
  );
} 