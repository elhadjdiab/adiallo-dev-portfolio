"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/testimonials", label: "Témoignages" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const hideNav = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hideNav) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm shadow-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-slate-800">
            <Image
              src="/profile.png"
              alt="Abdoulaye Diallo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-100">Abdoulaye Diallo</p>
            <p className="text-xs text-slate-500">Full-Stack Developer</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-indigo-400"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
