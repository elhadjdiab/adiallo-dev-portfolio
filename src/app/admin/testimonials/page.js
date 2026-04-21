"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, X, Edit, Trash2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchTestimonials();
  }, [isAuthenticated, router]);

  async function fetchTestimonials() {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/testimonials/all", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Erreur fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, newStatus) {
    setProcessing(id);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setTestimonials(
          testimonials.map((t) =>
            t.id === id ? { ...t, status: newStatus } : t
          )
        );
      } else {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        alert(`Erreur lors de la modification du status: ${errorData.error || "Erreur inconnue"}`);
      }
    } catch (error) {
      console.error("Erreur status change:", error);
      alert(`Erreur réseau: ${error.message}`);
    } finally {
      setProcessing(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce témoignage ?")) return;

    setProcessing(id);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur delete:", error);
      alert("Erreur réseau");
    } finally {
      setProcessing(null);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredTestimonials =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.status === filter);

  const stats = {
    pending: testimonials.filter((t) => t.status === "pending").length,
    approved: testimonials.filter((t) => t.status === "approved").length,
    rejected: testimonials.filter((t) => t.status === "rejected").length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="default">En attente</Badge>;
      case "approved":
        return <Badge variant="success">Approuvé</Badge>;
      case "rejected":
        return <Badge variant="error">Rejeté</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="primary" className="mb-3">
                admin / testimonials
              </Badge>
              <h1 className="mb-2 text-4xl font-bold text-slate-100">
                Gestion des témoignages
              </h1>
              <p className="text-slate-400">
                {testimonials.length} témoignage{testimonials.length > 1 ? "s" : ""} au total
              </p>
            </div>
            <Button href="/admin" variant="secondary">
              Retour
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">{stats.pending} en attente</Badge>
            <Badge variant="success">{stats.approved} approuvés</Badge>
            <Badge variant="error">{stats.rejected} rejetés</Badge>
          </div>
        </motion.header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "primary" : "secondary"}
            size="sm"
          >
            Tous ({testimonials.length})
          </Button>
          <Button
            onClick={() => setFilter("pending")}
            variant={filter === "pending" ? "primary" : "secondary"}
            size="sm"
          >
            En attente ({stats.pending})
          </Button>
          <Button
            onClick={() => setFilter("approved")}
            variant={filter === "approved" ? "primary" : "secondary"}
            size="sm"
          >
            Approuvés ({stats.approved})
          </Button>
          <Button
            onClick={() => setFilter("rejected")}
            variant={filter === "rejected" ? "primary" : "secondary"}
            size="sm"
          >
            Rejetés ({stats.rejected})
          </Button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              Chargement des témoignages...
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredTestimonials.length === 0 && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              Aucun témoignage {filter !== "all" && `avec le status "${filter}"`}.
            </Card>
          </motion.div>
        )}

        {/* Testimonials List */}
        {!loading && filteredTestimonials.length > 0 && (
          <div className="space-y-4">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              >
                <Card>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="default">#{testimonial.id}</Badge>
                          {getStatusBadge(testimonial.status)}
                        </div>
                        <p className="mb-2 text-sm font-medium text-slate-200">
                          Projet : {testimonial.project?.title || "N/A"}
                        </p>
                        <p className="mb-3 text-sm leading-relaxed text-slate-300">
                          {testimonial.content}
                        </p>
                        <div className="text-xs text-slate-500">
                          <p>
                            Par {testimonial.user?.name || "Utilisateur"} ({testimonial.user?.email})
                          </p>
                          <p>
                            {new Date(testimonial.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                      {testimonial.status !== "approved" && (
                        <Button
                          onClick={() => handleStatusChange(testimonial.id, "approved")}
                          variant="secondary"
                          size="sm"
                          disabled={processing === testimonial.id}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Check size={14} />
                          Approuver
                        </Button>
                      )}
                      {testimonial.status !== "rejected" && (
                        <Button
                          onClick={() => handleStatusChange(testimonial.id, "rejected")}
                          variant="secondary"
                          size="sm"
                          disabled={processing === testimonial.id}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          <X size={14} />
                          Rejeter
                        </Button>
                      )}
                      <Button
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        variant="secondary"
                        size="sm"
                      >
                        <Edit size={14} />
                        Modifier
                      </Button>
                      <Button
                        onClick={() => handleDelete(testimonial.id)}
                        variant="ghost"
                        size="sm"
                        disabled={processing === testimonial.id}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
