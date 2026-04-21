"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!form.name.trim() || form.name.trim().length < 2) {
      setStatus({ type: "error", message: "Le nom doit contenir au moins 2 caractères." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus({ type: "error", message: "Merci de renseigner un email valide." });
      return;
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      setStatus({ type: "error", message: "Le message doit contenir au moins 10 caractères." });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          honeypot: form.honeypot,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Impossible d'envoyer le message.");
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        message: "Message envoyé avec succès. Je te réponds dès que possible.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Une erreur est survenue. Réessaie dans quelques instants.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-10 backdrop-blur-md transition-[border-color] duration-500 hover:border-cyan-500/40 sm:p-12"
    >
      <p className="font-mono text-[10px] text-slate-500">contact</p>
      <h1 className="mt-4 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
        Entrons en contact
      </h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Projet, stage, collaboration ou question technique — écrivez-moi directement ici.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">Nom</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:border-cyan-500/30"
            placeholder="Ton nom"
            autoComplete="name"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:border-cyan-500/30"
            placeholder="ton@email.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm text-slate-400">Sujet (optionnel)</span>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:border-cyan-500/30"
          placeholder="Sujet de ton message"
          autoComplete="off"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm text-slate-400">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          className="w-full resize-none rounded-xl border border-slate-800/50 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:border-cyan-500/30"
          placeholder="Parle-moi de ton besoin..."
          required
        />
      </label>

      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {status.type !== "idle" && (
        <div
          className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/30 bg-red-500/10 text-red-200"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-500">Réponse en 24h à 72h en moyenne</p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-subtle rounded-xl px-6 py-3 font-medium text-slate-100 transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </div>
    </motion.form>
  );
}
