"use client";

import { Inter, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import SiteNav from "@/components/SiteNav";
import MainShell from "@/components/MainShell";
import AuthHydrate from "@/components/AuthHydrate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#030712] font-sans text-slate-100">
        <div className="mesh-background" aria-hidden />
        <SiteNav />
        <Provider store={store}>
          <AuthHydrate />
          <MainShell>{children}</MainShell>
        </Provider>
      </body>
    </html>
  );
}
