import Link from "next/link";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 border-transparent",
  secondary: "border border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50",
  ghost: "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  target,
  rel,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    // External link
    if (href.startsWith('http') || href.startsWith('mailto:') || target === '_blank') {
      return (
        <a href={href} className={classes} target={target} rel={rel} {...props}>
          {children}
        </a>
      );
    }
    
    // Internal link
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
