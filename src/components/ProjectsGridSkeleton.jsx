export default function ProjectsGridSkeleton({ count = 6 }) {
  return (
    <div 
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" 
      aria-busy="true" 
      aria-label="Chargement des projets"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="animate-pulse rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <div className="mb-3 h-5 w-24 rounded bg-slate-800" />
          <div className="mb-4 h-7 w-3/4 rounded bg-slate-800" />
          <div className="mb-2 h-4 w-full rounded bg-slate-800/70" />
          <div className="mb-4 h-4 w-5/6 rounded bg-slate-800/70" />
          <div className="mb-4 flex gap-2">
            <div className="h-6 w-16 rounded bg-slate-800/60" />
            <div className="h-6 w-16 rounded bg-slate-800/60" />
            <div className="h-6 w-16 rounded bg-slate-800/60" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-20 rounded-lg bg-slate-800" />
            <div className="h-9 w-20 rounded-lg bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
