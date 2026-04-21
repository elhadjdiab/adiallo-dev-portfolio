"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
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
    <motion.div {...fadeIn}>
      <Card hover={false} className="max-w-3xl mx-auto">
        <Badge variant="default" className="mb-4">
          contact
        </Badge>
        <h1 className="mb-4 text-3xl font-bold text-slate-100 sm:text-4xl">
          Entrons en contact
        </h1>
        <p className="mb-8 text-slate-400">
          Projet, stage, collaboration ou question technique — écrivez-moi directement ici.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Nom"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              autoComplete="name"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              autoComplete="email"
              required
            />
          </div>

          <Input
            label="Sujet (optionnel)"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Sujet de votre message"
            autoComplete="off"
          />

          <Textarea
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Décrivez votre projet ou votre besoin..."
            required
          />

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
            <Card
              hover={false}
              className={
                status.type === "success"
                  ? "border-green-500/25 bg-green-500/10 text-green-200"
                  : "border-red-500/25 bg-red-500/10 text-red-200"
              }
            >
              <p className="text-sm">{status.message}</p>
            </Card>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">Réponse en 24h à 72h en moyenne</p>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
