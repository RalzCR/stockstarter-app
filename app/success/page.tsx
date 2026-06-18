export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-3xl mx-auto text-center">
        <div className="rounded-3xl border border-green-400/20 bg-green-400/10 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">
            Payment successful
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Welcome to StockStarter
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Your subscription has been processed successfully. A confirmation
            email will be sent by Stripe to the email address used at checkout.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/premium"
              className="inline-flex rounded-full bg-green-400 px-7 py-3 font-bold text-black hover:bg-green-300"
            >
              Open Premium Dashboard
            </a>

            <a
              href="/account"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-7 py-3 font-bold text-white hover:bg-white/10"
            >
              View Account
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}