"use client";

import { motion } from "framer-motion";
import TestimonialsList from "@/components/TestimonialsList";

const slideUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function TestimonialsPage() {
  return (
    <main className="bg-slate-950 px-4 pb-28 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-20 sm:gap-32">
        <motion.header
          {...slideUp}
          className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-10 backdrop-blur-md sm:p-12"
        >
          <p className="font-mono text-[10px] text-slate-500">testimonials</p>
          <h1 className="mt-4 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
            Retours d’expérience
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            Messages et retours partagés après des collaborations, projets ou échanges techniques.
          </p>
        </motion.header>

        <TestimonialsList />
      </section>
    </main>
  );
}
