"use client";

import { motion } from "framer-motion";
import ProjectsList from "@/components/ProjectsList";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-16">
          <Badge variant="default" className="mb-4">
            projects
          </Badge>
          <h1 className="mb-6 text-4xl font-bold text-slate-100 sm:text-5xl md:text-6xl">
            Travaux sélectionnés
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-400">
            Dépôts publics, stacks listées, liens démo quand ils existent. Rien d'annoncé comme
            « game-changer » : juste du code et des choix techniques assumés.
          </p>
        </motion.header>

        {/* Projects Grid */}
        <ProjectsList />
      </Container>
    </main>
  );
}
