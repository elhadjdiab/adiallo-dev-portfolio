"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageSpotlight from "@/components/PageSpotlight";

const slideUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

const gridBg =
  "pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]";

const linkBase =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-transform duration-150 active:scale-95";

const cardInlay =
  "rounded-2xl border border-white/[0.06] bg-slate-950/50 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),inset_0_-2px_12px_0_rgba(0,0,0,0.5)] backdrop-blur-sm transition-[box-shadow,transform] duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:p-10";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-slate-950 px-4 pb-28 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
      <div className={gridBg} aria-hidden />
      <PageSpotlight />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-20 sm:gap-32">
        <motion.section {...slideUp} className="text-center">
          <p className="font-mono text-[10px] tracking-wide text-slate-500">portfolio / next.js</p>
          <p className="mt-4 text-xs font-medium tracking-wide text-slate-500">
            Disponibilité : stage · full-stack
          </p>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-3xl font-semibold leading-[1.12] tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-[2.75rem]">
            Full-Stack Developer spécialisé dans l&apos;écosystème Next.js &amp; Mobile (SwiftUI)
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            Conception web avec Next.js (App Router), données via Prisma, état client quand le cas
            l’exige (Redux). Côté mobile : SwiftUI, même rigueur sur les contrats réseau et la perf.
            Livrables mesurés : erreurs gérées, builds reproductibles, pas de magie cachée.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className={`btn-subtle ${linkBase}`}>
              Projets
            </Link>
            <Link
              href="/testimonials"
              className={`${linkBase} border border-white/[0.08] bg-transparent text-slate-300 hover:border-white/[0.12] hover:bg-white/[0.03]`}
            >
              Références
            </Link>
            <Link href="/contact" className={`${linkBase} text-slate-400 hover:text-slate-200`}>
              Contact
            </Link>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {[
            {
              id: "01",
              title: "API & données",
              body: "Schémas Prisma, migrations, endpoints prévisibles. Erreurs HTTP cohérentes, pas de 500 silencieux côté client.",
            },
            {
              id: "02",
              title: "Front Next.js",
              body: "Server Components par défaut, hydration ciblée. Redux Toolkit quand l’état global évite le prop drilling inutile.",
            },
            {
              id: "03",
              title: "Mobile SwiftUI",
              body: "Écrans structurés, appels réseau typés, UX alignée avec ce que tu exposes déjà sur le web.",
            },
          ].map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cardInlay}
            >
              <p className="font-mono text-[10px] text-slate-500">{item.id}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-100">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{item.body}</p>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
