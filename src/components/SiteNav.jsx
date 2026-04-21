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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hideNav) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-slate-800/50 bg-slate-950/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-[4.25rem] sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-800/50">
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
            <p className="text-sm font-medium tracking-tight text-slate-100">Abdoulaye Diallo</p>
            <p className="text-xs text-slate-500">Full-Stack</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-slate-900/40 hover:text-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
