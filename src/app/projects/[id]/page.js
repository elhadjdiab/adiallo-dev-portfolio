"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft, MessageSquare } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [project, setProject] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch project
        const projectRes = await fetch(`/api/projects/${params.id}`);
        if (!projectRes.ok) throw new Error("Projet non trouvé");
        const projectData = await projectRes.json();
        setProject(projectData);

        // Fetch testimonials for this project
        const testimonialsRes = await fetch("/api/testimonials");
        if (testimonialsRes.ok) {
          const allTestimonials = await testimonialsRes.json();
          const projectTestimonials = allTestimonials.filter(
            (t) => t.projectId === parseInt(params.id)
          );
          setTestimonials(projectTestimonials);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

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

  if (error || !project) {
    return (
      <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
        <Container size="md">
          <motion.div {...fadeIn}>
            <Card hover={false} className="border-red-500/25 bg-red-500/10 text-red-200">
              <h1 className="mb-2 text-xl font-bold">Projet non trouvé</h1>
              <p className="mb-6 text-sm">{error || "Ce projet n'existe pas."}</p>
              <Button href="/projects" variant="secondary">
                <ArrowLeft size={16} />
                Retour aux projets
              </Button>
            </Card>
          </motion.div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        {/* Back Button */}
        <motion.div {...fadeIn} className="mb-8">
          <Button href="/projects" variant="ghost" size="sm">
            <ArrowLeft size={16} />
            Retour aux projets
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <Card hover={false} className="overflow-hidden p-0">
            {/* Image du projet */}
            {project.imageUrl && (
              <div className="relative h-64 w-full overflow-hidden bg-slate-900 sm:h-80 md:h-96">
                <img
                  src={project.imageUrl}
                  alt={`Capture d'écran du projet ${project.title}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              </div>
            )}

            {/* Contenu */}
            <div className="p-6 sm:p-8">
              <Badge variant="primary" className="mb-4">
                Projet #{project.id}
              </Badge>

              <h1 className="mb-4 text-4xl font-bold text-slate-100 sm:text-5xl">
                {project.title}
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                {project.description}
              </p>

              {/* Technologies */}
              {project.technologies?.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Voir la démo en ligne de ${project.title}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-500"
                  >
                    <ExternalLink size={16} />
                    Voir la démo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Voir le code source de ${project.title} sur GitHub`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50"
                  >
                    <Github size={16} />
                    Voir le code
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.article>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-8"
        >
          <Card hover={false} className="bg-slate-900/50">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Créé le</span>
              <span>
                {new Date(project.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="mt-12"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-slate-100">
                Témoignages
              </h2>
              <p className="text-sm text-slate-400">
                {testimonials.length} témoignage{testimonials.length > 1 ? "s" : ""}
              </p>
            </div>
            {isAuthenticated && (
              <Button
                href={`/projects/${params.id}/testimonial`}
                variant="primary"
                size="sm"
              >
                <MessageSquare size={16} />
                Laisser un témoignage
              </Button>
            )}
          </div>

          {testimonials.length === 0 ? (
            <Card hover={false} className="text-center text-slate-400">
              <p className="mb-4">Aucun témoignage pour ce projet.</p>
              {!isAuthenticated && (
                <p className="text-sm text-slate-500">
                  <a href="/login" className="text-indigo-400 hover:text-indigo-300">
                    Connectez-vous
                  </a>{" "}
                  pour laisser le premier témoignage
                </p>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                >
                  <Card>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">#{testimonial.id}</Badge>
                        <span className="text-sm font-medium text-slate-300">
                          {testimonial.user?.name || "Utilisateur"}
                        </span>
                      </div>
                      <time className="text-xs text-slate-500">
                        {new Date(testimonial.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                      « {testimonial.content} »
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </main>
  );
}
