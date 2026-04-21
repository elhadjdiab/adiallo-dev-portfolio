"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Code, Database, Server, Smartphone, Mail, Github, Linkedin } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const skills = [
  {
    category: "Frontend",
    icon: Code,
    items: ["React", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Express", "REST API", "JWT"],
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Prisma", "SQLite", "SQLServer"],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    items: ["React Native", "Expo", "Mobile-First Design", "SwiftUI"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-16">
          <Badge variant="#0B0F14" className="mb-4">
            About
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-slate-100 sm:text-5xl md:text-6xl">
            À propos de moi
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-400">
            Développeur Full-Stack passionné par la création d'applications web et mobile performantes.
          </p>
        </motion.header>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mb-12"
        >
          <Card>
            <h2 className="mb-4 text-2xl font-bold text-slate-100">
              Qui suis-je ?
            </h2>
            <div className="space-y-4 text-slate-400">
              <p>
                Développeur Full-Stack avec une expertise en JavaScript, je conçois et développe 
                des applications web et mobile modernes, performantes et scalables.
              </p>
              <p>
                Ma passion pour le code et l'innovation me pousse à rester constamment à jour avec les 
                dernières technologies et les meilleures pratiques du développement logiciel.
              </p>
              <p>
                Je privilégie une approche centrée sur l'utilisateur, en créant des interfaces intuitives 
                et des expériences fluides, tout en maintenant un code propre et maintenable.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-100">
            Compétences
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                >
                  <Card>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-indigo-500/10 p-2">
                        <Icon className="h-5 w-5 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-100">
                        {skill.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <Badge key={item} variant="default">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="mb-12"
        >
          <Card className="border-indigo-500/20 bg-indigo-500/5">
            <h2 className="mb-4 text-2xl font-bold text-slate-100">
              Mon approche
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-indigo-400">
                  Qualité
                </h3>
                <p className="text-sm text-slate-400">
                  Code propre, testé et documenté pour une maintenance facilitée.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-indigo-400">
                  Performance
                </h3>
                <p className="text-sm text-slate-400">
                  Optimisation constante pour des applications rapides et réactives.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-indigo-400">
                  UX/UI
                </h3>
                <p className="text-sm text-slate-400">
                  Interfaces intuitives et accessibles pour tous les utilisateurs.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        >
          <Card className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-100">
              Travaillons ensemble
            </h2>
            <p className="mb-6 text-slate-400">
              Vous avez un projet en tête ? N'hésitez pas à me contacter.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="primary">
                <Mail size={16} />
                Me contacter
              </Button>
              <Button
                href="https://github.com/elhadjdiab"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir mon profil GitHub"
              >
              </Button>
              <Button
                href="https://linkedin.com/in/abdoulaye-diallo"
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir mon profil LinkedIn"
              >
              </Button>
            </div>
          </Card>
        </motion.div>
      </Container>
    </main>
  );
}
