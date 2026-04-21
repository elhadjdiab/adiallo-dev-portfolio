"use client";

import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/authStorage";

export default function AuthHydrate() {
  const dispatch = useDispatch();
  const ran = useRef(false);

  useLayoutEffect(() => {
    if (ran.current) return;
    ran.current = true;
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const raw = localStorage.getItem(AUTH_USER_KEY);
      if (token && raw) {
        const user = JSON.parse(raw);
        if (user?.id && user?.email) {
          dispatch(loginSuccess({ user, token }));
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, [dispatch]);

  return null;
}
