const variants = {
  default: "bg-slate-800 text-slate-300 border-slate-700",
  primary: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  success: "bg-green-500/10 text-green-400 border-green-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function Badge({ children, variant = "default", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
