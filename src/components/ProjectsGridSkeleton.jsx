const shell =
  "rounded-2xl border border-white/[0.06] bg-slate-950/40 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),inset_0_-1px_0_0_rgba(0,0,0,0.35)] sm:p-10";

export default function ProjectsGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Chargement des projets">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${shell} animate-pulse`}>
          <div className="mb-4 h-7 w-2/3 rounded-md bg-slate-800/60" />
          <div className="mb-3 h-6 w-4/5 rounded bg-slate-800/50" />
          <div className="mb-2 h-3 w-full rounded bg-slate-800/40" />
          <div className="mb-6 h-3 w-5/6 rounded bg-slate-800/40" />
          <div className="flex gap-2">
            <div className="h-6 w-14 rounded-md bg-slate-800/50" />
            <div className="h-6 w-14 rounded-md bg-slate-800/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
