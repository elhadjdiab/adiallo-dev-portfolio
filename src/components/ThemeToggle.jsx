"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/slices/themeSlice";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { mode } = useSelector((s) => s.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800"
      aria-label={mode === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: mode === 'dark' ? 0 : 180, scale: mode === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: mode === 'light' ? 0 : -180, scale: mode === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun size={18} />
      </motion.div>
    </button>
  );
}
