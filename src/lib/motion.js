/**
 * Configurations d'animations respectant prefers-reduced-motion
 */

// Détecte si l'utilisateur préfère les animations réduites
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Animations de base
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const fadeInReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

// Retourne l'animation appropriée selon les préférences
export function getAnimation(animation = fadeIn) {
  return prefersReducedMotion() ? fadeInReduced : animation;
}

// Stagger pour listes
export function getStaggerDelay(index, baseDelay = 0.1) {
  return prefersReducedMotion() ? 0 : index * baseDelay;
}
