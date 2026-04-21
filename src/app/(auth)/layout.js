export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center bg-slate-950 px-4 py-16">
      {children}
    </div>
  );
}
