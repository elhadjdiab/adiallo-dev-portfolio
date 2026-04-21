"use client";

import { usePathname } from "next/navigation";

const AUTH_PREFIXES = ["/login", "/register"];

export default function MainShell({ children }) {
  const pathname = usePathname();
  const isAuth = AUTH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <div
      className={
        isAuth
          ? "relative z-10 flex min-h-full flex-1 flex-col"
          : "relative z-10 flex min-h-full flex-1 flex-col pt-16 sm:pt-[4.25rem]"
      }
    >
      {children}
    </div>
  );
}
