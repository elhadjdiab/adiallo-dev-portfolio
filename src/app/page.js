"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Code2, Rocket, Users, CheckCircle, ArrowRight, Linkedin, Mail } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const stats = [
  { label: "Projets réalisés", value: "15+", icon: Rocket },
  { label: "Technologies", value: "20+", icon: Code2 },
  { label: "Clients satisfaits", value: "10+", icon: Users },
  { label: "Taux de réussite", value: "100%", icon: CheckCircle },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Prisma", 
  "PostgreSQL", "Tailwind CSS", "Redux", "REST API", "Git"
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch recent projects
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 3)))
      .catch(console.error);

    // Fetch recent testimonials
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data.slice(0, 2)))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0F14]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />
        <Container size="lg">
          <motion.div {...fadeIn} className="text-center">
            <Badge variant="primary" className="mb-6">
              Disponible pour vos projets
            </Badge>
            
            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold leading-tight text-slate-100 sm:text-6xl lg:text-7xl">
              Développeur Full-Stack
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                JavaScript & TypeScript
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
              Je conçois et développe des applications web et mobile modernes, performantes et scalables. 
              De l'idée au déploiement, je transforme vos projets en réalité.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/projects" 
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-indigo-500 active:scale-95"
              >
                <Rocket size={20} />
                Voir mes projets
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-base font-medium text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50 active:scale-95"
              >
                <Mail size={20} />
                Me contacter
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://github.com/elhadjdiab"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir mon profil GitHub"
                className="text-slate-500 transition-colors hover:text-slate-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/abdoulaye-diallo"
                target="_blank"
                rel="noreferrer"
                aria-label="Voir mon profil LinkedIn"
                className="text-slate-500 transition-colors hover:text-slate-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                >
                  <Card className="text-center">
                    <div className="mb-3 flex justify-center">
                      <div className="rounded-lg bg-indigo-500/10 p-3">
                        <Icon className="h-6 w-6 text-indigo-400" />
                      </div>
                    </div>
                    <div className="mb-1 text-3xl font-bold text-slate-100">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-100">
              Stack Technique
            </h2>
            <p className="mb-8 text-slate-400">
              Technologies que j'utilise au quotidien
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Badge variant="default" className="text-sm">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Recent Projects Section */}
      {projects.length > 0 && (
        <section className="py-16">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-slate-100">
                    Projets récents
                  </h2>
                  <p className="text-slate-400">
                    Découvrez mes dernières réalisations
                  </p>
                </div>
                <Button href="/projects" variant="ghost" className="gap-2">
                  Voir tout
                  <ArrowRight size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <a href={`/projects/${project.id}`} aria-label={`Voir le projet ${project.title}`}>
                      <Card className="h-full overflow-hidden p-0 transition-transform hover:scale-[1.02]">
                        {project.imageUrl && (
                          <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                            <img
                              src={project.imageUrl}
                              alt={`Capture d'écran du projet ${project.title}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="mb-2 text-lg font-semibold text-slate-100">
                            {project.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                            {project.description}
                          </p>
                          {project.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <Badge key={tech} variant="default" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <Container size="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-slate-100">
                  Ce qu'ils disent de mon travail
                </h2>
                <p className="text-slate-400">
                  Retours de clients satisfaits
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <Card className="h-full">
                      <p className="mb-4 text-slate-300">
                        « {testimonial.content} »
                      </p>
                      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                        <div>
                          <p className="font-medium text-slate-100">
                            {testimonial.user?.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {testimonial.project?.title}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button href="/testimonials" variant="secondary" className="gap-2">
                  Voir tous les témoignages
                  <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-100">
                Un projet en tête ?
              </h2>
              <p className="mb-8 text-lg text-slate-400">
                Discutons de votre projet et voyons comment je peux vous aider à le concrétiser.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg" className="gap-2">
                  <Mail size={20} />
                  Démarrer un projet
                </Button>
                <Button href="/about" variant="secondary" size="lg" className="gap-2">
                  En savoir plus
                  <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
