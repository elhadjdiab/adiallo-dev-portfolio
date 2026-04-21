"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice";
import { persistAuthSession } from "@/lib/authStorage";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Connexion - Abdoulaye Diallo",
  description: "Connexion sécurisée à l'espace administrateur.",
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function validate() {
    const next = {};
    if (!email.trim()) next.email = "L'email est requis.";
    else if (!validateEmail(email)) next.email = "Format d'email invalide.";
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        dispatch(loginFailure(data.error || "Connexion impossible."));
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
    <motion.div {...fadeIn} className="w-full max-w-md">
      <Card hover={false}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-100">Connexion</h1>
          <p className="mt-2 text-sm text-slate-400">Accès sécurisé au tableau de bord.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearServerError();
            }}
            placeholder="vous@exemple.com"
            error={fieldErrors.email}
          />

          <Input
            label="Mot de passe"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearServerError();
            }}
            placeholder="••••••••"
            error={fieldErrors.password}
          />

          {error && (
            <Card hover={false} className="border-red-500/25 bg-red-500/10 text-red-200">
              <p className="text-sm">{error}</p>
            </Card>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Pas encore de compte ?{" "}
          <Link href="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
            Créer un compte
          </Link>
        </p>
      </Card>
    </motion.div>
  );
}
