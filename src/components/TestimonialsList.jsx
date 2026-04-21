"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchTestimonials } from "@/store/slices/testimonialsSlice";

const card =
  "rounded-2xl border border-slate-800/50 bg-slate-900/40 p-8 backdrop-blur-md transition-[border-color] duration-500 hover:border-cyan-500/40 sm:p-10";

const slideUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
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
      <motion.div {...slideUp} className={`${card} text-center text-slate-400`}>
        Aucun témoignage disponible pour le moment.
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.55,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={card}
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-slate-500">#{item.id}</span>
            <time className="font-mono text-[10px] text-slate-500" dateTime={item.createdAt}>
              {formatDate(item.createdAt)}
            </time>
          </div>

          <p className="text-base leading-relaxed text-slate-200">« {item.content} »</p>

          <div className="mt-8 border-t border-slate-800/50 pt-6">
            <p className="text-sm font-medium text-slate-100">{item.user?.name || "Utilisateur"}</p>
            <p className="text-sm text-slate-500">{item.user?.email || ""}</p>
          </div>
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
      <motion.div {...slideUp} className={`${card} text-center text-sm text-slate-400`}>
        Chargement des témoignages…
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        {...slideUp}
        className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-sm text-red-200 backdrop-blur-md"
      >
        Erreur : {error}
      </motion.div>
    );
  }

  return <TestimonialsGrid testimonials={testimonials} />;
}
