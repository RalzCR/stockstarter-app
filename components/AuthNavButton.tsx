"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type AuthNavButtonProps = {
  variant?: "link" | "button";
};

export default function AuthNavButton({
  variant = "button",
}: AuthNavButtonProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      setIsSignedIn(Boolean(data.session));
      setLoading(false);
    }

    checkSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session));
      setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const href = isSignedIn ? "/account" : "/login";
  const label = isSignedIn ? "Account" : "Sign In";

  if (loading && variant === "link") {
    return null;
  }

  if (loading && variant === "button") {
    return (
      <div className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 font-semibold text-white opacity-60">
        Account
      </div>
    );
  }

  if (variant === "link") {
    return (
      <a href={href} className="hover:text-white">
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 font-semibold text-white hover:bg-white/10"
    >
      {label}
    </a>
  );
}