"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import TestimonialsList from "@/components/TestimonialsList";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function TestimonialsPage() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="default" className="mb-4">
                testimonials
              </Badge>
              <h1 className="mb-4 text-4xl font-bold text-slate-100 sm:text-5xl md:text-6xl">
                Témoignages
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-400">
                Retours de clients et collaborateurs sur les projets réalisés.
              </p>
            </div>
            {isAuthenticated && (
              <Button href="/testimonials/new" variant="primary" size="md">
                <Plus size={16} />
                Laisser un témoignage
              </Button>
            )}
          </div>
        </motion.header>

        {/* Testimonials Grid */}
        <TestimonialsList />
      </Container>
    </main>
  );
}
