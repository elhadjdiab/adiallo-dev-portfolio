"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function NewTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [project, setProject] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/projects/${params.id}/testimonial`);
      return;
    }

    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) throw new Error("Projet non trouvé");
        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [isAuthenticated, router, params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Le contenu est obligatoire");
      return;
    }

    if (content.trim().length < 20) {
      setError("Le témoignage doit contenir au moins 20 caractères");
      return;
    }

    if (content.trim().length > 500) {
      setError("Le témoignage ne peut pas dépasser 500 caractères");
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
        body: JSON.stringify({
          content: content.trim(),
          projectId: parseInt(params.id),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/projects/${params.id}`);
      }, 2000);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F14]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </main>
    );
  }

  if (error && !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6">
        <motion.div {...fadeIn}>
          <Card hover={false} className="max-w-md text-center">
            <p className="mb-4 text-red-400">{error}</p>
            <Button href="/projects" variant="secondary">
              Retour aux projets
            </Button>
          </Card>
        </motion.div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6">
        <motion.div {...fadeIn}>
          <Card hover={false} className="max-w-md text-center">
            <div className="mb-4 text-5xl">✅</div>
            <h1 className="mb-2 text-2xl font-bold text-slate-100">
              Témoignage envoyé !
            </h1>
            <p className="text-slate-400">
              Votre témoignage est en attente de validation. Il sera visible une fois approuvé.
            </p>
          </Card>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        <motion.div {...fadeIn}>
          <Button
            href={`/projects/${params.id}`}
            variant="ghost"
            size="sm"
            className="mb-6"
          >
            <ArrowLeft size={16} />
            Retour au projet
          </Button>

          <div className="mb-8">
            <Badge variant="primary" className="mb-3">
              Nouveau témoignage
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-slate-100">
              Témoigner sur : {project?.title}
            </h1>
            <p className="text-slate-400">
              Partagez votre expérience avec ce projet
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Votre témoignage
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Partagez votre expérience avec ce projet..."
                  rows={6}
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  {content.length}/500 caractères (min. 20)
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-sm text-slate-400">
                  ℹ️ Votre témoignage sera soumis à modération avant d'être publié.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer le témoignage
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  href={`/projects/${params.id}`}
                  variant="secondary"
                  disabled={submitting}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </Container>
    </main>
  );
}
