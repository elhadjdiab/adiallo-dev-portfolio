"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewProjectPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((s) => s.auth);
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

  if (!isAuthenticated) {
    router.push("/login");
    return null;
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
      // Récupérer le token depuis localStorage
      const token = localStorage.getItem("token");
      
      const res = await fetch("/api/projects", {
        method: "POST",
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
        throw new Error(data.error || "Erreur lors de la création");
      }

      router.push("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
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
              Nouveau projet
            </Badge>
            <h1 className="mb-6 text-3xl font-bold text-slate-100">
              Créer un projet
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
                  {submitting ? "Création..." : "Créer le projet"}
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
