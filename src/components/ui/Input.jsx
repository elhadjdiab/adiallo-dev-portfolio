import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border bg-slate-900 px-4 py-2.5 text-slate-100 transition-all duration-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F14] disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/50"
              : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/50"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
