"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchTestimonials } from "@/store/slices/testimonialsSlice";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: "easeOut" },
};

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function TestimonialsGrid({ testimonials }) {
  if (!testimonials.length) {
    return (
      <motion.div {...fadeIn}>
        <Card className="text-center text-slate-400">
          Aucun témoignage disponible pour le moment.
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        >
          <Card className="h-full flex flex-col">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Badge variant="default">#{item.id}</Badge>
              <time className="text-xs text-slate-500" dateTime={item.createdAt}>
                {formatDate(item.createdAt)}
              </time>
            </div>

            <p className="flex-1 text-base leading-relaxed text-slate-300">
              « {item.content} »
            </p>

            <div className="mt-6 border-t border-slate-800 pt-4">
              <p className="text-sm font-medium text-slate-100">
                {item.user?.name || "Utilisateur"}
              </p>
              <p className="text-sm text-slate-500">{item.user?.email || ""}</p>
            </div>
          </Card>
        </motion.article>
      ))}
    </div>
  );
}

export default function TestimonialsList() {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  if (loading) {
    return (
      <motion.div {...fadeIn}>
        <Card className="text-center text-slate-400">
          Chargement des témoignages…
        </Card>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div {...fadeIn}>
        <Card className="border-red-500/25 bg-red-500/10 text-red-200">
          <p className="text-sm">Erreur : {error}</p>
        </Card>
      </motion.div>
    );
  }

  return <TestimonialsGrid testimonials={testimonials} />;
}
