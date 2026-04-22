export default function Card({ children, className = "", hover = true, ...props }) {
  const baseStyles =
    "rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-200";

  const hoverStyles = hover ? "hover:border-slate-700 hover:scale-[1.02]" : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
