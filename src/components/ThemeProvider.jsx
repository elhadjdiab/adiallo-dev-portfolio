"use client";

import { useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/slices/themeSlice";

export default function ThemeProvider() {
  const dispatch = useDispatch();
  const { mode } = useSelector((s) => s.theme);
  const ran = useRef(false);

  // Charger le thème depuis localStorage au montage
  useLayoutEffect(() => {
    if (ran.current) return;
    ran.current = true;
    
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        dispatch(setTheme(savedTheme));
      }
    } catch {
      // ignore
    }
  }, [dispatch]);

  // Appliquer le thème au document et sauvegarder dans localStorage
  useLayoutEffect(() => {
    if (mode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    
    try {
      localStorage.setItem("theme", mode);
    } catch {
      // ignore
    }
  }, [mode]);

  return null;
}
