"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function NewTestimonialPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("Le contenu est requis.");
      return;
    }

    if (content.trim().length < 20) {
      setError("Le témoignage doit contenir au moins 20 caractères.");
      return;
    }

    if (content.trim().length > 500) {
      setError("Le témoignage ne peut pas dépasser 500 caractères.");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de la création");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/testimonials");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const charCount = content.length;
  const isValid = charCount >= 20 && charCount <= 500;

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        {/* Back Button */}
        <motion.div {...fadeIn} className="mb-8">
          <Button href="/testimonials" variant="ghost" size="sm">
            <ArrowLeft size={16} />
            Retour aux témoignages
          </Button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <Card hover={false}>
            <Badge variant="primary" className="mb-4">
              Nouveau témoignage
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-slate-100">
              Laisser un témoignage
            </h1>
            <p className="mb-8 text-slate-400">
              Partagez votre expérience. Votre témoignage sera vérifié avant publication.
            </p>

            {success ? (
              <Card hover={false} className="border-green-500/25 bg-green-500/10 text-green-200">
                <h3 className="mb-2 text-lg font-semibold">Merci !</h3>
                <p className="text-sm">
                  Votre témoignage a été soumis avec succès. Il sera visible après validation.
                </p>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Textarea
                    label="Votre témoignage"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    placeholder="Partagez votre expérience de collaboration..."
                    required
                  />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span
                      className={
                        charCount < 20
                          ? "text-slate-500"
                          : isValid
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {charCount}/500 caractères
                      {charCount < 20 && ` (minimum 20)`}
                    </span>
                    {isValid && (
                      <Badge variant="success" className="text-xs">
                        Prêt à soumettre
                      </Badge>
                    )}
                  </div>
                </div>

                {error && (
                  <Card hover={false} className="border-red-500/25 bg-red-500/10 text-red-200">
                    <p className="text-sm">{error}</p>
                  </Card>
                )}

                <div className="flex gap-3 border-t border-slate-800 pt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={submitting || !isValid}
                    className="flex-1"
                  >
                    {submitting ? "Envoi en cours..." : "Soumettre le témoignage"}
                  </Button>
                  <Button type="button" href="/testimonials" variant="secondary">
                    Annuler
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </Container>
    </main>
  );
}
