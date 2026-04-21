"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    technologies: [],
  });

  const [techInput, setTechInput] = useState("");

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProject();
  }, [isAuthenticated, params.id, router]);

  async function fetchProject() {
    try {
      const res = await fetch(`/api/projects/${params.id}`);
      if (!res.ok) throw new Error("Projet non trouvé");
      const data = await res.json();
      setForm({
        title: data.title || "",
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        githubUrl: data.githubUrl || "",
        liveUrl: data.liveUrl || "",
        technologies: data.technologies || [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addTechnology() {
    const tech = techInput.trim();
    if (tech && !form.technologies.includes(tech)) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
      setTechInput("");
    }
  }

  function removeTechnology(tech) {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.description.trim()) {
      setError("Le titre et la description sont requis.");
      return;
    }

    setSubmitting(true);

    try {
      // Récupérer le token depuis localStorage avec la bonne clé
      const token = localStorage.getItem("auth_token");
      
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          imageUrl: form.imageUrl.trim() || null,
          githubUrl: form.githubUrl.trim() || null,
          liveUrl: form.liveUrl.trim() || null,
          technologies: form.technologies,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de la modification");
      }

      router.push("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
        <Container size="md">
          <Card hover={false} className="text-center text-slate-400">
            Chargement du projet...
          </Card>
        </Container>
      </main>
    );
  }

  if (error && !form.title) {
    return (
      <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
        <Container size="md">
          <Card hover={false} className="border-red-500/25 bg-red-500/10 text-red-200">
            <p className="mb-4 text-sm">{error}</p>
            <Button href="/admin/projects" variant="secondary">
              Retour à la liste
            </Button>
          </Card>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        {/* Back Button */}
        <motion.div {...fadeIn} className="mb-8">
          <Button href="/admin/projects" variant="ghost" size="sm">
            <ArrowLeft size={16} />
            Retour à la liste
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
              Modifier projet #{params.id}
            </Badge>
            <h1 className="mb-6 text-3xl font-bold text-slate-100">
              Modifier le projet
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Titre"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Mon super projet"
                required
              />

              <Textarea
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Description détaillée du projet..."
                required
              />

              <Input
                label="URL de l'image (optionnel)"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />

              <Input
                label="URL GitHub (optionnel)"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />

              <Input
                label="URL démo (optionnel)"
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://demo.example.com"
              />

              {/* Technologies */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Technologies
                </label>
                <div className="mb-3 flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                    placeholder="Ex: React, Next.js, Tailwind..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    variant="secondary"
                    size="md"
                  >
                    <Plus size={16} />
                    Ajouter
                  </Button>
                </div>

                {form.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="default"
                        className="flex items-center gap-1"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="ml-1 hover:text-red-400"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
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
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
                </Button>
                <Button
                  type="button"
                  href="/admin/projects"
                  variant="secondary"
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
