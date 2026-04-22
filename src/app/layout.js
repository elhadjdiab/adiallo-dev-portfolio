"use client";

import { Inter, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import SiteNav from "@/components/SiteNav";
import MainShell from "@/components/MainShell";
import AuthHydrate from "@/components/AuthHydrate";
import ThemeProvider from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";

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
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] transition-colors duration-300">
        <Provider store={store}>
          <ToastProvider>
            <ThemeProvider />
            <SiteNav />
            <AuthHydrate />
            <MainShell>{children}</MainShell>
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
