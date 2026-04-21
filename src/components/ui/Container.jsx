const sizes = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export default function Container({ children, size = "lg", className = "" }) {
  return (
    <div className={`mx-auto w-full px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
