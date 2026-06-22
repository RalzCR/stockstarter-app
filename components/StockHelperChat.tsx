"use client";

import { useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const exampleQuestions = [
  "What should I research before buying a stock?",
  "Explain P/E ratio in simple terms.",
  "What are bullish and bearish points for Apple?",
  "How do I think about risk if I already own a stock?",
];

export default function StockHelperChat() {
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [upgradeRequired, setUpgradeRequired] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m StockHelper AI. Ask me about stocks, investing terms, research checklists, risk factors or how to think through an investment decision. I cannot tell you to buy or sell, but I can help you research properly.",
    },
  ]);

  const canSend = useMemo(() => {
    return question.trim().length > 0 && !isSending;
  }, [question, isSending]);

  async function sendQuestion(customQuestion?: string) {
    const finalQuestion = (customQuestion || question).trim();

    if (!finalQuestion) {
      return;
    }

    setIsSending(true);
    setErrorMessage("");
    setUpgradeRequired(false);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        content: finalQuestion,
      },
    ]);

    setQuestion("");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setErrorMessage("Please sign in to use StockHelper AI.");
        setIsSending(false);
        return;
      }

      const response = await fetch("/api/stockhelper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          question: finalQuestion,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "StockHelper AI could not answer.");
        setUpgradeRequired(Boolean(result.upgradeRequired));
        setIsSending(false);
        return;
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: result.answer,
        },
      ]);
    } catch {
      setErrorMessage("StockHelper AI could not answer right now.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-green-300">
          Plus & Premium
        </p>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          StockHelper AI
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-gray-300">
          Ask beginner-friendly questions about stocks, research, valuation,
          risk and investing terms. StockHelper helps you think through a
          decision without giving direct buy or sell instructions.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
        <p className="font-semibold text-yellow-200">
          Educational research assistant only
        </p>

        <p className="mt-2 text-sm leading-relaxed text-yellow-100/80">
          StockHelper does not provide personalised financial advice,
          investment recommendations or guaranteed predictions. Always do your
          own research before making financial decisions.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {exampleQuestions.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => sendQuestion(example)}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 text-left text-sm font-semibold text-gray-200 hover:bg-white/10"
          >
            {example}
          </button>
        ))}
      </div>

      <div className="mb-6 max-h-[520px] space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-black/30 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-2xl p-4 ${
              message.role === "user"
                ? "ml-auto max-w-3xl bg-green-400 text-black"
                : "mr-auto max-w-4xl border border-white/10 bg-white/5 text-gray-200"
            }`}
          >
            <p className="whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
          </div>
        ))}

        {isSending && (
          <div className="mr-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-4 text-gray-300">
            StockHelper is thinking...
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-100">
          <p className="font-semibold">{errorMessage}</p>

          {upgradeRequired && (
            <a
              href="/pricing"
              className="mt-4 inline-flex rounded-full bg-red-300 px-5 py-2 font-bold text-black hover:bg-red-200"
            >
              View Plans
            </a>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 md:flex-row">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about a stock, risk factor, investing term or research checklist..."
          className="min-h-28 flex-1 resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none placeholder:text-gray-500 focus:border-green-400/60"
          maxLength={1500}
        />

        <button
          type="button"
          disabled={!canSend}
          onClick={() => sendQuestion()}
          className="rounded-2xl bg-green-400 px-8 py-4 font-bold text-black hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50 md:self-stretch"
        >
          {isSending ? "Asking..." : "Ask"}
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Keep questions under 1,500 characters. For current prices or live market
        movement, check the StockStarter dashboard alongside official sources.
      </p>
    </section>
  );
}