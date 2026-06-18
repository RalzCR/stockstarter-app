"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    setLoading(true);
    setMessage("");
    setMessageType("");

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          setMessage(error.message);
          setMessageType("error");
          return;
        }

        setMessage("Account created. Check your email to confirm your account, then sign in.");
        setMessageType("success");
        setMode("signin");
        setPassword("");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setMessage(error.message);
        setMessageType("error");
        return;
      }

      window.location.href = "/account";
    } catch {
      setMessage("Authentication failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-8 py-16">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-180px] left-[-180px] h-[650px] w-[650px] rounded-full bg-emerald-500/40 blur-[130px]" />
        <div className="absolute bottom-[-220px] right-[-180px] h-[750px] w-[750px] rounded-full bg-cyan-500/40 blur-[140px]" />
        <div className="absolute top-[30%] left-[35%] h-[450px] w-[450px] rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <section className="relative z-10 max-w-md mx-auto">
        <a href="/" className="text-green-400 hover:text-green-300">
          ← Back to StockStarter
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-green-400">
            Account
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            {mode === "signin" ? "Sign in to StockStarter" : "Create your account"}
          </h1>

          <p className="mb-8 text-gray-300 leading-relaxed">
            Access your StockStarter account, manage your dashboard and use subscription features linked to your email.
          </p>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
              />
            </div>

            <button
              onClick={handleAuth}
              disabled={loading}
              className="w-full rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300 disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
            </button>

            {message && (
              <p
                className={`text-sm ${
                  messageType === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            <div className="border-t border-white/10 pt-5 text-sm text-gray-400">
              {mode === "signin" ? (
                <button
                  onClick={() => {
                    setMode("signup");
                    setMessage("");
                    setMessageType("");
                  }}
                  className="text-green-400 hover:text-green-300"
                >
                  Create a StockStarter account
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMode("signin");
                    setMessage("");
                    setMessageType("");
                  }}
                  className="text-green-400 hover:text-green-300"
                >
                  Already have an account? Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}