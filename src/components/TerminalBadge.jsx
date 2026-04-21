/**
 * Ligne type terminal : repo GitHub (`owner/repo`) ou tag de version de secours.
 */
export default function TerminalBadge({ label }) {
  if (!label) return null;
  return (
    <div className="mb-4 flex items-center gap-2 rounded-md border border-white/[0.07] bg-black/35 px-2.5 py-1.5 font-mono text-[10px] leading-none tracking-wide text-slate-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <span className="select-none text-slate-600" aria-hidden>
        ~
      </span>
      <span className="truncate text-slate-300">{label}</span>
    </div>
  );
}
