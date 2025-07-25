"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { registerWithEmail, loginWithGoogle } from "@/lib/firebase";
import { useLanguage } from "@/contexts/language-context";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await registerWithEmail(email, password);
      setSuccess(t('registerSuccess'));
      setError("");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Erreur d'inscription.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await loginWithGoogle();
      setSuccess(t('registerGoogleSuccess'));
      setError("");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Erreur Google Auth.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Votre mot de passe"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Création..." : "Créer mon compte"}
          </Button>
        </form>
        <div className="my-6 flex items-center justify-center">
          <span className="text-gray-400 text-sm">ou</span>
        </div>
        <Button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded shadow-sm" disabled={loading}>
          <FcGoogle className="w-5 h-5" />
          <span>Créer un compte avec Google</span>
        </Button>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
      </div>
    </main>
  );
} 