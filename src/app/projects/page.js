"use client";

import { motion } from "framer-motion";
import ProjectsList from "@/components/ProjectsList";

const slideUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const headerCard =
  "rounded-2xl border border-white/[0.06] bg-slate-950/50 p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-2px_12px_0_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-12";

export default function ProjectsPage() {
  return (
    <main className="bg-slate-950 px-4 pb-28 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 sm:gap-32">
        <motion.header {...slideUp} className={headerCard}>
          <p className="font-mono text-[10px] text-slate-500">projects</p>
          <h1 className="mt-4 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Travaux sélectionnés
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
            Dépôts publics, stacks listées, liens démo quand ils existent. Rien d’annoncé comme
            « game-changer » : juste du code et des choix techniques assumés.
          </p>
        </motion.header>

        <ProjectsList />
      </section>
    </main>
  );
}
