"use client";

import { useEffect, useState } from "react";

/**
 * Lueur radiale qui suit le pointeur — donne de la profondeur sur fond sombre.
 */
export default function PageSpotlight() {
  const [pos, setPos] = useState({ x: 50, y: 18 });

  useEffect(() => {
    function move(e) {
      setPos({
        x: (e.clientX / Math.max(window.innerWidth, 1)) * 100,
        y: (e.clientY / Math.max(window.innerHeight, 1)) * 100,
      });
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
      style={{
        background: `radial-gradient(580px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.055), transparent 52%)`,
      }}
    />
  );
}
