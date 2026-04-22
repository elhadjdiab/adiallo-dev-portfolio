"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function AdminMessagesPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [processing, setProcessing] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    
    if (user && user.role !== 'admin') {
      router.push("/admin");
      return;
    }
    
    fetchMessages();
  }, [isAuthenticated, user, router]);

  async function fetchMessages() {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/contact", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      
      if (!res.ok) throw new Error("Erreur lors du chargement");
      
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Erreur fetch messages:", error);
      toast.error("Erreur lors du chargement des messages");
    } finally {
      setLoading(false);
    }
  }

  async function toggleRead(id, currentStatus) {
    setProcessing(id);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ isRead: !currentStatus }),
      });

      if (res.ok) {
        setMessages(
          messages.map((m) =>
            m.id === id ? { ...m, isRead: !currentStatus } : m
          )
        );
        toast.success(currentStatus ? "Marqué comme non lu" : "Marqué comme lu");
      } else {
        toast.error("Erreur lors de la modification");
      }
    } catch (error) {
      console.error("Erreur toggle read:", error);
      toast.error("Erreur réseau");
    } finally {
      setProcessing(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Supprimer ce message ?")) return;

    setProcessing(id);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        toast.success("Message supprimé");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur delete:", error);
      toast.error("Erreur réseau");
    } finally {
      setProcessing(null);
    }
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredMessages =
    filter === "all"
      ? messages
      : filter === "unread"
      ? messages.filter((m) => !m.isRead)
      : messages.filter((m) => m.isRead);

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.isRead).length,
    read: messages.filter((m) => m.isRead).length,
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="primary" className="mb-3">
                admin / messages
              </Badge>
              <h1 className="mb-2 text-4xl font-bold text-slate-100">
                Messages de contact
              </h1>
              <p className="text-slate-400">
                {stats.total} message{stats.total > 1 ? "s" : ""} au total
              </p>
            </div>
            <Button href="/admin" variant="secondary">
              Retour
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">{stats.total} total</Badge>
            <Badge variant="primary">{stats.unread} non lus</Badge>
            <Badge variant="success">{stats.read} lus</Badge>
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
            Tous ({stats.total})
          </Button>
          <Button
            onClick={() => setFilter("unread")}
            variant={filter === "unread" ? "primary" : "secondary"}
            size="sm"
          >
            Non lus ({stats.unread})
          </Button>
          <Button
            onClick={() => setFilter("read")}
            variant={filter === "read" ? "primary" : "secondary"}
            size="sm"
          >
            Lus ({stats.read})
          </Button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              Chargement des messages...
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredMessages.length === 0 && (
          <motion.div {...fadeIn}>
            <Card hover={false} className="text-center text-slate-400">
              Aucun message {filter !== "all" && `${filter === "unread" ? "non lu" : "lu"}`}.
            </Card>
          </motion.div>
        )}

        {/* Messages List */}
        {!loading && filteredMessages.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Liste des messages */}
            <div className="space-y-4 lg:col-span-1">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Card
                    hover={true}
                    className={`cursor-pointer transition-all ${
                      selectedMessage?.id === message.id
                        ? "border-indigo-500/50 bg-indigo-500/5"
                        : ""
                    } ${!message.isRead ? "border-l-4 border-l-indigo-500" : ""}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 overflow-hidden">
                        <div className="mb-2 flex items-center gap-2">
                          {message.isRead ? (
                            <MailOpen size={16} className="text-slate-500" />
                          ) : (
                            <Mail size={16} className="text-indigo-400" />
                          )}
                          <span className="truncate text-sm font-medium text-slate-200">
                            {message.name}
                          </span>
                        </div>
                        {message.subject && (
                          <p className="mb-1 truncate text-sm font-medium text-slate-300">
                            {message.subject}
                          </p>
                        )}
                        <p className="mb-2 line-clamp-2 text-xs text-slate-400">
                          {message.message}
                        </p>
                        <time className="text-xs text-slate-500">
                          {new Date(message.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </time>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Détails du message sélectionné */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card hover={false}>
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="default">#{selectedMessage.id}</Badge>
                          {selectedMessage.isRead ? (
                            <Badge variant="success">Lu</Badge>
                          ) : (
                            <Badge variant="primary">Non lu</Badge>
                          )}
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-slate-100">
                          {selectedMessage.subject || "Sans sujet"}
                        </h2>
                        <div className="text-sm text-slate-400">
                          <p className="mb-1">
                            De : <span className="font-medium text-slate-300">{selectedMessage.name}</span>
                          </p>
                          <p className="mb-1 flex items-center gap-2">
                            Email :{" "}
                            <a
                              href={`mailto:${selectedMessage.email}`}
                              className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                              {selectedMessage.email}
                              <ExternalLink size={12} className="ml-1 inline" />
                            </a>
                          </p>
                          <p>
                            Reçu le :{" "}
                            {new Date(selectedMessage.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                        {selectedMessage.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4">
                      <Button
                        onClick={() => toggleRead(selectedMessage.id, selectedMessage.isRead)}
                        variant="secondary"
                        size="sm"
                        disabled={processing === selectedMessage.id}
                      >
                        {selectedMessage.isRead ? (
                          <>
                            <Mail size={14} />
                            Marquer non lu
                          </>
                        ) : (
                          <>
                            <MailOpen size={14} />
                            Marquer lu
                          </>
                        )}
                      </Button>
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Votre message"}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50"
                      >
                        <ExternalLink size={14} />
                        Répondre par email
                      </a>
                      <Button
                        onClick={() => handleDelete(selectedMessage.id)}
                        variant="ghost"
                        size="sm"
                        disabled={processing === selectedMessage.id}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                        Supprimer
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card hover={false} className="flex h-full items-center justify-center text-center">
                  <div>
                    <Mail className="mx-auto mb-4 h-12 w-12 text-slate-600" />
                    <p className="text-slate-400">
                      Sélectionnez un message pour voir les détails
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
