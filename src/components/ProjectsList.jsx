"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/store/slices/projectSlice";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import TerminalBadge from "@/components/TerminalBadge";
import ProjectsGridSkeleton from "@/components/ProjectsGridSkeleton";
import { projectTerminalLabel } from "@/lib/projectMeta";

const cardInlay =
  "rounded-2xl border border-white/[0.06] bg-slate-950/50 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-2px_12px_0_rgba(0,0,0,0.5)] backdrop-blur-sm transition-[box-shadow,transform] duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:p-10";

const slideUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const iconProps = { size: 15, strokeWidth: 1.5, className: "shrink-0 text-slate-400" };

function ProjectsGrid({ projects }) {
  if (!projects.length) {
    return (
      <motion.div {...slideUp} className={`${cardInlay} text-center text-slate-400`}>
        Aucun projet en base pour le moment.
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.55,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`group ${cardInlay}`}
        >
          <TerminalBadge label={projectTerminalLabel(project)} />

          <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">
            {project.title}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">{project.description}</p>

          {project.technologies?.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/[0.06] bg-black/25 px-2.5 py-1 text-xs text-slate-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-subtle inline-flex items-center gap-2 rounded-lg px-4 py-2 text-slate-200 transition-transform duration-150 active:scale-95"
              >
                <ExternalLink {...iconProps} />
                Démo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-subtle inline-flex items-center gap-2 rounded-lg px-4 py-2 text-slate-200 transition-transform duration-150 active:scale-95"
              >
                <Github {...iconProps} />
                Code
              </a>
            )}
          </div>
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
      <motion.div
        {...slideUp}
        className="rounded-2xl border border-red-500/25 bg-red-500/10 p-6 text-sm text-red-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md"
      >
        Erreur : {error}
      </motion.div>
    );
  }

  return <ProjectsGrid projects={projects} />;
}
