"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("General enquiry");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  async function submitMessage() {
    setLoading(true);
    setStatusMessage("");
    setStatusType("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.message || "Message could not be sent.");
        setStatusType("error");
        return;
      }

      setStatusMessage(data.message);
      setStatusType("success");
      setName("");
      setEmail("");
      setCategory("General enquiry");
      setMessage("");
    } catch {
      setStatusMessage("Message could not be sent. Please try again.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-6xl mx-auto">
        <a href="/" className="text-green-400 hover:text-green-300">
          ← Back to StockStarter
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">
            Support
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact StockStarter
          </h1>

          <p className="max-w-3xl text-xl text-gray-300 leading-relaxed">
            Get support with your account, billing, subscriptions, privacy requests,
            product feedback or partnership enquiries.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-3xl font-bold mb-6">
              Send a message
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Contact reason
                </label>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
                >
                  <option>General enquiry</option>
                  <option>Account support</option>
                  <option>Billing and subscriptions</option>
                  <option>Privacy request</option>
                  <option>Product feedback</option>
                  <option>Partnership enquiry</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write your message"
                  rows={7}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-green-400/60"
                />
              </div>

              <button
                onClick={submitMessage}
                disabled={loading}
                className="rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {statusMessage && (
                <p
                  className={`text-sm ${
                    statusType === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-green-400 mb-3">
                Support areas
              </p>

              <h2 className="text-2xl font-bold mb-4">
                What we can help with
              </h2>

              <ul className="space-y-3 text-gray-300">
                <li>• Account and access questions</li>
                <li>• Billing and subscription support</li>
                <li>• Privacy and data requests</li>
                <li>• Product feedback</li>
                <li>• Partnership enquiries</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400 mb-3">
                Important
              </p>

              <h2 className="text-2xl font-bold mb-4">
                Financial information
              </h2>

              <p className="text-gray-300 leading-relaxed">
                StockStarter provides educational market information only. We do not
                provide financial advice, investment recommendations, trading signals,
                brokerage services or portfolio management.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-purple-400 mb-3">
                Security
              </p>

              <h2 className="text-2xl font-bold mb-4">
                Do not send sensitive details
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Do not include passwords, bank login details, card numbers, crypto
                private keys, wallet seed phrases or confidential account credentials
                in contact messages.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}