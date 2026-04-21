"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice";
import { persistAuthSession } from "@/lib/authStorage";

const inputClass =
  "w-full rounded-lg border border-white/[0.12] bg-transparent px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-600 outline-none transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40";

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const next = {};
    if (!name.trim() || name.trim().length < 2) next.name = "Le nom doit contenir au moins 2 caractères.";
    if (!email.trim()) next.email = "L’email est requis.";
    else if (!validateEmail(email)) next.email = "Format d’email invalide.";
    if (!password) next.password = "Le mot de passe est requis.";
    else if (password.length <= 6) next.password = "Le mot de passe doit faire plus de 6 caractères.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginFailure(null));
    if (!validate()) return;

    dispatch(loginStart());

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        dispatch(loginFailure(data.error || "Inscription impossible."));
        return;
      }

      const { user, token } = data;
      persistAuthSession(user, token);
      dispatch(loginSuccess({ user, token }));
      router.push("/admin");
    } catch {
      dispatch(loginFailure("Erreur réseau. Réessaie."));
    }
  }

  function clearServerError() {
    dispatch(loginFailure(null));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[400px] rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl sm:p-10"
    >
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">Créer un compte</h1>
        <p className="mt-2 text-sm text-slate-500">Quelques secondes pour commencer.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="register-name" className="mb-2 block text-xs font-medium text-slate-500">
            Nom
          </label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearServerError();
            }}
            className={inputClass}
            placeholder="Votre nom"
          />
          {fieldErrors.name && <p className="mt-1.5 text-xs text-red-400/90">{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="register-email" className="mb-2 block text-xs font-medium text-slate-500">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearServerError();
            }}
            className={inputClass}
            placeholder="vous@exemple.com"
          />
          {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400/90">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="register-password" className="mb-2 block text-xs font-medium text-slate-500">
            Mot de passe
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearServerError();
            }}
            className={inputClass}
            placeholder="Plus de 6 caractères"
          />
          {fieldErrors.password && (
            <p className="mt-1.5 text-xs text-red-400/90">{fieldErrors.password}</p>
          )}
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-center text-xs text-red-300/90">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Création…" : "S’inscrire"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline">
          Se connecter
        </Link>
      </p>
    </motion.div>
  );
}
