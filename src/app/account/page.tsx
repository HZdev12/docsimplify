"use client";
import { useEffect, useState } from "react";
import { auth, logout, getUserSummaries, deleteUserSummary } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        setLoading(true);
        try {
          const docs = await getUserSummaries(user.uid);
          setHistory(docs.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
        } catch (e) {
          setHistory([]);
        }
        setLoading(false);
      } else {
        setHistory([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth";
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteUserSummary(id);
    setHistory((prev) => prev.filter((doc) => doc.id !== id));
    setDeletingId(null);
  };

  const handleExportPDF = (doc: any) => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(doc.title || "Document sans titre", 10, 20);
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(doc.summary, 180);
    pdf.text(lines, 10, 35);
    pdf.save(`${doc.title || "resume"}.pdf`);
  };

  const handleExportWord = (doc: any) => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office'\nxmlns:w='urn:schemas-microsoft-com:office:word'\nxmlns='http://www.w3.org/TR/REC-html40'>\n<head><meta charset='utf-8'></head><body>`;
    const footer = "</body></html>";
    const html = `${header}<h2>${doc.title || "Document sans titre"}</h2><p>${doc.summary.replace(/\n/g, "<br>")}</p>${footer}`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title || "resume"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportCSV = (doc: any) => {
    const csvContent = `"Titre","Résumé"\n"${(doc.title || "Document sans titre").replace(/"/g, '""')}","${doc.summary.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title || "resume"}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-10 border border-gray-100 text-center">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">Profil utilisateur</h1>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
          <Button onClick={() => window.location.href = "/auth"} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Se connecter</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-10 border border-gray-100">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Profil utilisateur</h1>
        <p className="mb-2 text-gray-800">Nom : <span className="font-semibold">{user.displayName || "-"}</span></p>
        <p className="mb-6 text-gray-800">Email : <span className="font-semibold">{user.email}</span></p>
        <Button onClick={handleLogout} className="mb-8 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">Se déconnecter</Button>
        <h2 className="text-xl font-semibold text-blue-700 mb-4 mt-8">Historique de vos documents simplifiés</h2>
        <div className="space-y-4">
          {loading && <p className="text-gray-500">Chargement...</p>}
          {!loading && history.length === 0 && <p className="text-gray-500">Aucun document simplifié pour le moment.</p>}
          {history.map((doc: any) => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">{doc.title || "Document sans titre"}</span>
                <span className="text-xs text-gray-500">{doc.createdAt && new Date(doc.createdAt.seconds * 1000).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-2">{doc.summary}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => { setSelectedDoc(doc); setShowDetail(true); }}
                  className="px-3 py-1 rounded border border-blue-500 text-blue-700 bg-white hover:bg-blue-50 text-sm"
                >
                  Voir détail
                </button>
                <button
                  onClick={() => handleExportPDF(doc)}
                  className="px-3 py-1 rounded border border-green-500 text-green-700 bg-white hover:bg-green-50 text-sm"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => handleExportWord(doc)}
                  className="px-3 py-1 rounded border border-indigo-500 text-indigo-700 bg-white hover:bg-indigo-50 text-sm"
                >
                  Export Word
                </button>
                <button
                  onClick={() => handleExportCSV(doc)}
                  className="px-3 py-1 rounded border border-yellow-500 text-yellow-700 bg-white hover:bg-yellow-50 text-sm"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  disabled={deletingId === doc.id}
                  className="px-3 py-1 rounded border border-red-500 text-red-700 bg-white hover:bg-red-50 text-sm disabled:opacity-60"
                >
                  {deletingId === doc.id ? "Suppression..." : "Supprimer"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modale d'affichage détaillé */}
      {showDetail && selectedDoc && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 border border-gray-100 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowDetail(false)}>&times;</button>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{selectedDoc.title || "Document sans titre"}</h3>
            <p className="text-xs text-gray-500 mb-2">{selectedDoc.createdAt && new Date(selectedDoc.createdAt.seconds * 1000).toLocaleString()}</p>
            <div className="bg-gray-50 rounded-lg p-4 border border-blue-100 text-gray-800 whitespace-pre-line text-sm">
              {selectedDoc.summary}
            </div>
          </div>
        </div>
      )}
      {/* Suggestions d'autres fonctionnalités utiles :
          - Exporter un résumé de l'historique (PDF, Word, etc.)
          - Ajouter des tags ou catégories aux documents
          - Partager un résumé par email ou lien
          - Ajouter des notes personnelles à chaque résumé
          - Historique des actions (édition, suppression)
          - Pagination ou recherche dans l'historique */}
    </main>
  );
} 