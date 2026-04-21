"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Témoignages - Abdoulaye Diallo",
  description: "Retours et témoignages de clients satisfaits sur les projets web et mobile réalisés.",
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Grouper les témoignages par projet
  const testimonialsByProject = testimonials.reduce((acc, testimonial) => {
    const projectId = testimonial.projectId;
    if (!acc[projectId]) {
      acc[projectId] = {
        project: testimonial.project,
        testimonials: [],
      };
    }
    acc[projectId].testimonials.push(testimonial);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-16">
          <Badge variant="default" className="mb-4">
            testimonials
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-slate-100 sm:text-5xl md:text-6xl">
            Témoignages
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-400">
            Retours de clients et collaborateurs sur les projets réalisés.
          </p>
        </motion.header>

        {/* Loading */}
        {loading && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              Chargement des témoignages…
            </Card>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="border-red-500/25 bg-red-500/10 text-red-200">
              <p className="text-sm">Erreur : {error}</p>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && testimonials.length === 0 && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              <p className="mb-4">Aucun témoignage disponible pour le moment.</p>
              <Button href="/projects" variant="primary">
                Voir les projets
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Testimonials by Project */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="space-y-12">
            {Object.values(testimonialsByProject).map((group, groupIndex) => (
              <motion.section
                key={group.project?.id || groupIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: groupIndex * 0.1, ease: "easeOut" }}
              >
                {/* Project Header */}
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-slate-100">
                    <a
                      href={`/projects/${group.project?.id}`}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {group.project?.title || "Projet inconnu"}
                    </a>
                  </h2>
                  <p className="text-sm text-slate-500">
                    {group.testimonials.length} témoignage{group.testimonials.length > 1 ? "s" : ""}
                  </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: groupIndex * 0.1 + index * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <Card className="h-full">
                        <div className="mb-3 flex items-center justify-between">
                          <Badge variant="default">#{testimonial.id}</Badge>
                          <time className="text-xs text-slate-500">
                            {new Date(testimonial.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <p className="mb-4 text-sm leading-relaxed text-slate-300">
                          « {testimonial.content} »
                        </p>

                        <div className="border-t border-slate-800 pt-3">
                          <p className="text-sm font-medium text-slate-100">
                            {testimonial.user?.name || "Utilisateur"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {testimonial.user?.email || ""}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
