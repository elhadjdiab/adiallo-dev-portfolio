"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchProjects();
  }, [isAuthenticated, router]);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce projet ?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur delete:", error);
      alert("Erreur réseau");
    } finally {
      setDeleting(null);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-12 flex items-start justify-between">
          <div>
            <Badge variant="primary" className="mb-3">
              admin / projects
            </Badge>
            <h1 className="mb-2 text-4xl font-bold text-slate-100">
              Gestion des projets
            </h1>
            <p className="text-slate-400">
              {projects.length} projet{projects.length > 1 ? "s" : ""} au total
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="/admin" variant="secondary">
              Retour
            </Button>
            <Button href="/admin/projects/new" variant="primary">
              <Plus size={16} />
              Nouveau projet
            </Button>
          </div>
        </motion.header>

        {/* Loading */}
        {loading && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              Chargement des projets...
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center">
              <p className="mb-4 text-slate-400">Aucun projet pour le moment.</p>
              <Button href="/admin/projects/new" variant="primary">
                <Plus size={16} />
                Créer le premier projet
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Projects List */}
        {!loading && projects.length > 0 && (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              >
                <Card>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="default">#{project.id}</Badge>
                        <h2 className="text-xl font-semibold text-slate-100">
                          {project.title}
                        </h2>
                      </div>
                      <p className="mb-3 text-sm text-slate-400">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies?.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="default" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 hover:text-slate-300"
                          >
                            <ExternalLink size={12} />
                            Démo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 hover:text-slate-300"
                          >
                            <Github size={12} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        href={`/admin/projects/${project.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        <Edit size={14} />
                        Modifier
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="ghost"
                        size="sm"
                        disabled={deleting === project.id}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                        {deleting === project.id ? "..." : "Supprimer"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
