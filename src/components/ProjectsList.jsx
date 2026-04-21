"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/slices/projectSlice";
import { motion } from "framer-motion";
import { ExternalLink, Github, MessageSquare } from "lucide-react";
import TerminalBadge from "@/components/TerminalBadge";
import ProjectsGridSkeleton from "@/components/ProjectsGridSkeleton";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { projectTerminalLabel } from "@/lib/projectMeta";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
};

function ProjectsGrid({ projects }) {
  if (!projects.length) {
    return (
      <motion.div {...fadeIn}>
        <Card className="text-center text-slate-400">
          Aucun projet en base pour le moment.
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        >
          <Card className="h-full flex flex-col overflow-hidden p-0">
            {/* Image du projet */}
            {project.imageUrl && (
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <a href={`/projects/${project.id}`} aria-label={`Voir le projet ${project.title}`}>
                  <img
                    src={project.imageUrl}
                    alt={`Capture d'écran du projet ${project.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </a>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
            )}

            {/* Contenu */}
            <div className="flex flex-1 flex-col p-6">
              <TerminalBadge label={projectTerminalLabel(project)} />

              <h2 className="mb-3 text-xl font-semibold text-slate-100 hover:text-indigo-400 transition-colors">
                <a href={`/projects/${project.id}`}>
                  {project.title}
                </a>
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>

              {project.technologies?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Voir la démo en ligne de ${project.title}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50"
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
                    aria-label={`Voir le code source de ${project.title} sur GitHub`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50"
                  >
                    <Github size={12} />
                    Code
                  </a>
                )}
                <a
                  href={`/projects/${project.id}/testimonial`}
                  aria-label={`Laisser un témoignage pour ${project.title}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-indigo-600/50 bg-indigo-600/10 px-3 py-2 text-xs text-indigo-400 transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-600/20"
                >
                  <MessageSquare size={12} />
                  Témoigner
                </a>
              </div>
            </div>
          </Card>
        </motion.article>
      ))}
    </div>
  );
}

export default function ProjectsList() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return <ProjectsGridSkeleton count={6} />;
  }

  if (error) {
    return (
      <motion.div {...fadeIn}>
        <Card className="border-red-500/25 bg-red-500/10 text-red-200">
          <p className="text-sm">Erreur : {error}</p>
        </Card>
      </motion.div>
    );
  }

  return <ProjectsGrid projects={projects} />;
}
