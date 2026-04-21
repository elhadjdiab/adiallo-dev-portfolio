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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

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
    <motion.div {...fadeIn} className="w-full max-w-md">
      <Card hover={false}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-100">Créer un compte</h1>
          <p className="mt-2 text-sm text-slate-400">Quelques secondes pour commencer.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nom"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearServerError();
            }}
            placeholder="Votre nom"
            error={fieldErrors.name}
          />

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearServerError();
            }}
            placeholder="Plus de 6 caractères"
            error={fieldErrors.password}
          />

          {error && (
            <Card hover={false} className="border-red-500/25 bg-red-500/10 text-red-200">
              <p className="text-sm">{error}</p>
            </Card>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Création…" : "S'inscrire"}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Déjà inscrit ?{" "}
          <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
            Se connecter
          </Link>
        </p>
      </Card>
    </motion.div>
  );
}
