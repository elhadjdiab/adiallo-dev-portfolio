"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const services = [
  {
    id: "01",
    title: "API & données",
    body: "Schémas Prisma, migrations, endpoints prévisibles. Erreurs HTTP cohérentes, pas de 500 silencieux côté client.",
  },
  {
    id: "02",
    title: "Front Next.js",
    body: "Server Components par défaut, hydration ciblée. Redux Toolkit quand l'état global évite le prop drilling inutile.",
  },
  {
    id: "03",
    title: "Mobile SwiftUI",
    body: "Écrans structurés, appels réseau typés, UX alignée avec ce que tu exposes déjà sur le web.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="md">
        {/* Hero Section */}
        <motion.section {...fadeIn} className="text-center">
          <Badge variant="primary">Disponibilité : stage · full-stack</Badge>
          
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-bold leading-tight text-slate-100 sm:text-5xl lg:text-6xl">
            Full-Stack Developer spécialisé dans l&apos;écosystème Next.js &amp; Mobile
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Conception web avec Next.js (App Router), données via Prisma, état client quand le cas
            l'exige (Redux). Côté mobile : SwiftUI, même rigueur sur les contrats réseau et la perf.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/projects" variant="primary" size="lg">
              Voir les projets
            </Button>
            <Button href="/testimonials" variant="secondary" size="lg">
              Références
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Contact
            </Button>
          </div>
        </motion.section>

        {/* Services Section */}
        <section className="mt-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card>
                  <Badge variant="default" className="mb-4">
                    {item.id}
                  </Badge>
                  <h2 className="mb-3 text-xl font-semibold text-slate-100">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.body}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
