"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthNavButton() {
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

  if (loading) {
    return (
      <div className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 font-semibold text-white opacity-60">
        Account
      </div>
    );
  }

  return (
    <a
      href={isSignedIn ? "/account" : "/login"}
      className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 font-semibold text-white hover:bg-white/10"
    >
      {isSignedIn ? "Account" : "Sign In"}
    </a>
  );
}