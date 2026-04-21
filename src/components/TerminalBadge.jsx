/**
 * Badge style terminal simplifié - affiche repo GitHub ou tag
 */
export default function TerminalBadge({ label }) {
  if (!label) return null;
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 px-3 py-1.5 font-mono text-xs text-slate-400">
      <span className="text-slate-600" aria-hidden>
        ~
      </span>
      <span className="text-slate-300">{label}</span>
    </div>
  );
}
