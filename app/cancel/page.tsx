export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-3xl mx-auto text-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            Checkout cancelled
          </p>

          <h1 className="text-5xl font-bold mb-6">
            No payment was taken
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            The checkout session was cancelled before payment was completed.
          </p>

          <a
            href="/pricing"
            className="inline-flex rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300"
          >
            Return to Pricing
          </a>
        </div>
      </section>
    </main>
  );
}