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
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiGet, apiPut } from "@/lib/apiClient";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [testimonial, setTestimonial] = useState(null);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    async function fetchTestimonial() {
      try {
        const data = await apiGet(`/testimonials/all`);
        const found = data.find((t) => t.id === parseInt(params.id));
        
        if (!found) {
          setError("Témoignage introuvable");
          setLoading(false);
          return;
        }

        setTestimonial(found);
        setContent(found.content);
        setStatus(found.status);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement");
        setLoading(false);
      }
    }

    fetchTestimonial();
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

    setSaving(true);

    try {
      await apiPut(`/testimonials/${params.id}`, {
        content: content.trim(),
        status,
      });

      router.push("/admin/testimonials");
    } catch (err) {
      setError(err.message || "Erreur lors de la sauvegarde");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F14]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </main>
    );
  }

  if (error && !testimonial) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6">
        <motion.div {...fadeIn}>
          <Card hover={false} className="max-w-md text-center">
            <p className="mb-4 text-red-400">{error}</p>
            <Button href="/admin/testimonials" variant="secondary">
              Retour à la liste
            </Button>
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
            href="/admin/testimonials"
            variant="ghost"
            size="sm"
            className="mb-6"
          >
            <ArrowLeft size={16} />
            Retour
          </Button>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-slate-100">
              Modifier le témoignage
            </h1>
            <p className="text-slate-400">
              Auteur : {testimonial?.user?.name} ({testimonial?.user?.email})
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
                  Contenu
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Contenu du témoignage..."
                  rows={6}
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  {content.length}/500 caractères (min. 20)
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Statut
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus("pending")}
                    className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                      status === "pending"
                        ? "border-slate-600 bg-slate-800 text-slate-100"
                        : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Badge variant="default" className="mb-1">
                      En attente
                    </Badge>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("approved")}
                    className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                      status === "approved"
                        ? "border-slate-600 bg-slate-800 text-slate-100"
                        : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Badge variant="success" className="mb-1">
                      Approuvé
                    </Badge>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("rejected")}
                    className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-colors ${
                      status === "rejected"
                        ? "border-slate-600 bg-slate-800 text-slate-100"
                        : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <Badge variant="error" className="mb-1">
                      Rejeté
                    </Badge>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Enregistrer
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  href="/admin/testimonials"
                  variant="secondary"
                  disabled={saving}
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
