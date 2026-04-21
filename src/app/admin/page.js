"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { clearAuthSession } from "@/lib/authStorage";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((s) => s.auth);

  function handleLogout() {
    clearAuthSession();
    dispatch(logout());
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6">
        <p className="text-sm text-slate-500">Session requise pour accéder au tableau de bord.</p>
        <Link
          href="/login"
          className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-100"
        >
          Se connecter
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-16 sm:px-8">
      <header className="flex flex-col gap-6 border-b border-white/[0.08] pb-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[10px] text-slate-500">admin</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Tableau de bord</h1>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-start rounded-lg border border-white/[0.12] px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
        >
          Déconnexion
        </button>
      </header>

      <section className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl">
        <p className="text-sm leading-relaxed text-slate-400">
          Bienvenue, <span className="font-medium text-slate-200">{user.name}</span>. Cette zone est
          protégée : branche ici tes outils d’administration (projets, témoignages, etc.).
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline">
          Retour au site
        </Link>
      </section>
    </main>
  );
}
