/**
 * Affiche `owner/repo` depuis une URL GitHub, sinon un tag de version synthétique stable.
 */
export function projectTerminalLabel(project) {
  if (project?.githubUrl) {
    try {
      const u = new URL(project.githubUrl);
      const parts = u.pathname.replace(/^\//, "").split("/").filter(Boolean);
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
    } catch {
      // ignore
    }
  }
  const id = project?.id ?? 0;
  return `v1.${String(id).padStart(2, "0")}.0-stable`;
}
