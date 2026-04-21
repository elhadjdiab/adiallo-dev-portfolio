"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "@/store/slices/authSlice";
import { clearAuthSession } from "@/lib/authStorage";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { LayoutDashboard, FolderGit2, MessageSquare, Mail, LogOut } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const adminSections = [
  {
    id: "projects",
    title: "Projets",
    description: "Gérer les projets du portfolio",
    icon: FolderGit2,
    href: "/admin/projects",
    badge: "À venir",
  },
  {
    id: "testimonials",
    title: "Témoignages",
    description: "Modérer et gérer les témoignages",
    icon: MessageSquare,
    href: "/admin/testimonials",
    badge: "À venir",
  },
  {
    id: "messages",
    title: "Messages",
    description: "Consulter les messages de contact",
    icon: Mail,
    href: "/admin/messages",
    badge: "À venir",
  },
];

export default function AdminPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((s) => s.auth);

  function handleLogout() {
    clearAuthSession();
    dispatch(logout());
  }

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F14] px-6">
        <motion.div {...fadeIn} className="text-center">
          <Card hover={false} className="max-w-md">
            <LayoutDashboard className="mx-auto mb-4 h-12 w-12 text-slate-600" />
            <h1 className="mb-2 text-xl font-bold text-slate-100">Accès restreint</h1>
            <p className="mb-6 text-sm text-slate-400">
              Session requise pour accéder au tableau de bord.
            </p>
            <Button href="/login" variant="primary" className="w-full">
              Se connecter
            </Button>
          </Card>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] pb-24 pt-32">
      <Container size="lg">
        {/* Header */}
        <motion.header {...fadeIn} className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="primary" className="mb-3">
              admin
            </Badge>
            <h1 className="mb-2 text-4xl font-bold text-slate-100">Tableau de bord</h1>
            <p className="text-slate-400">
              Bienvenue, <span className="font-medium text-slate-300">{user.name}</span>
            </p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Button href="/" variant="secondary" size="md">
              Retour au site
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="md">
              <LogOut size={16} />
              Déconnexion
            </Button>
          </div>
        </motion.header>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              >
                <Card className="h-full">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg bg-indigo-500/10 p-3">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    {section.badge && (
                      <Badge variant="default" className="text-xs">
                        {section.badge}
                      </Badge>
                    )}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-slate-100">
                    {section.title}
                  </h2>
                  <p className="mb-4 text-sm text-slate-400">{section.description}</p>
                  <Button
                    href={section.href}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    disabled={section.badge === "À venir"}
                  >
                    Accéder
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          className="mt-12"
        >
          <Card hover={false} className="border-indigo-500/20 bg-indigo-500/5">
            <h3 className="mb-2 text-lg font-semibold text-slate-100">
              Zone d'administration
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Cette zone est protégée et réservée aux administrateurs. Les sections de gestion
              des projets, témoignages et messages seront disponibles prochainement.
            </p>
          </Card>
        </motion.div>
      </Container>
    </main>
  );
}
