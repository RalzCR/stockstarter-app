export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-5xl mx-auto">
        <a href="/" className="text-green-400 hover:text-green-300">
          ← Back to StockStarter
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">
            Legal
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-400 mb-8">
            Last updated: June 2026
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            This Privacy Policy explains how StockStarter collects, uses, stores
            and protects personal information when you use our website, join the
            waitlist, interact with market tools, or use future premium features.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-bold mb-4">
                Contents
              </h2>

              <div className="space-y-3 text-sm text-gray-400">
                <a href="#who-we-are" className="block hover:text-white">Who we are</a>
                <a href="#data-we-collect" className="block hover:text-white">Data we collect</a>
                <a href="#how-we-use-data" className="block hover:text-white">How we use data</a>
                <a href="#third-parties" className="block hover:text-white">Third-party services</a>
                <a href="#payments" className="block hover:text-white">Payments</a>
                <a href="#market-data" className="block hover:text-white">Market data</a>
                <a href="#retention" className="block hover:text-white">Data retention</a>
                <a href="#rights" className="block hover:text-white">Your rights</a>
                <a href="#security" className="block hover:text-white">Security</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8 text-gray-300 leading-relaxed">
            <section id="who-we-are" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                1. Who we are
              </h2>

              <p>
                StockStarter is a beginner-friendly market dashboard that provides
                live stock and crypto charts, market news, watchlists, educational
                market summaries and planned premium software tools.
              </p>

              <p className="mt-4">
                StockStarter is designed as an educational software platform. It
                does not provide financial advice, investment recommendations,
                brokerage services, portfolio management or trading execution.
              </p>
            </section>

            <section id="data-we-collect" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                2. Information we collect
              </h2>

              <p>
                We collect limited information needed to operate and improve the
                platform. This may include:
              </p>

              <ul className="mt-4 space-y-3">
                <li>• Email addresses submitted through the waitlist form.</li>
                <li>• Information linked to future subscription or premium access.</li>
                <li>• Basic technical data such as browser, device, page visits and usage patterns.</li>
                <li>• Support or contact messages you send to us.</li>
                <li>• Payment status information from Stripe if payments are enabled.</li>
              </ul>

              <p className="mt-4">
                We do not ask you to upload investment account details, brokerage
                login details, bank passwords, crypto wallet seed phrases or private
                keys.
              </p>
            </section>

            <section id="how-we-use-data" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                3. How we use your information
              </h2>

              <p>
                We may use your information to:
              </p>

              <ul className="mt-4 space-y-3">
                <li>• Add you to the StockStarter waitlist.</li>
                <li>• Send product updates, launch news and feature announcements.</li>
                <li>• Operate market dashboard features.</li>
                <li>• Improve website performance and user experience.</li>
                <li>• Provide support and respond to questions.</li>
                <li>• Manage premium subscriptions if paid plans are enabled.</li>
                <li>• Detect misuse, abuse or technical issues.</li>
              </ul>

              <p className="mt-4">
                We do not sell your personal information.
              </p>
            </section>

            <section id="third-parties" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                4. Third-party services
              </h2>

              <p>
                StockStarter may use trusted third-party services to operate the
                website and provide product features. These may include:
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-bold text-white mb-2">Vercel</h3>
                  <p className="text-sm text-gray-400">
                    Hosting and deployment of the website.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-bold text-white mb-2">Supabase</h3>
                  <p className="text-sm text-gray-400">
                    Database storage for waitlist and future account features.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-bold text-white mb-2">Stripe</h3>
                  <p className="text-sm text-gray-400">
                    Payment processing and subscription management if premium plans are enabled.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <h3 className="font-bold text-white mb-2">Finnhub / TradingView</h3>
                  <p className="text-sm text-gray-400">
                    Market data, charts and financial news features.
                  </p>
                </div>
              </div>
            </section>

            <section id="payments" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                5. Payments and subscriptions
              </h2>

              <p>
                If paid subscriptions are enabled, payments may be processed by
                Stripe. We do not directly store full card numbers or payment card
                security codes on StockStarter servers.
              </p>

              <p className="mt-4">
                Stripe may collect and process payment information according to its
                own legal and privacy terms. Payment-related data we receive may
                include subscription status, customer ID, billing email and payment
                confirmation events.
              </p>
            </section>

            <section id="market-data" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                6. Market data and financial information
              </h2>

              <p>
                StockStarter displays market data, charts, price movements, crypto
                data and news from external providers. This information may be
                delayed, incomplete, inaccurate or unavailable.
              </p>

              <p className="mt-4">
                Nothing on StockStarter should be treated as financial advice,
                investment advice, a recommendation to buy or sell, or a guarantee
                of future performance. Always do your own research before making
                financial decisions.
              </p>
            </section>

            <section id="retention" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                7. How long we keep information
              </h2>

              <p>
                We keep personal information only for as long as needed for the
                purposes described in this policy, unless a longer retention period
                is required for legal, accounting, fraud prevention or business
                record purposes.
              </p>

              <p className="mt-4">
                Waitlist emails may be kept until you unsubscribe, request deletion,
                or until the waitlist is no longer needed.
              </p>
            </section>

            <section id="rights" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                8. Your privacy rights
              </h2>

              <p>
                Depending on where you live, you may have rights over your personal
                information. These may include the right to access, correct, delete,
                restrict or object to certain uses of your data.
              </p>

              <p className="mt-4">
                You may also have the right to withdraw consent where we rely on
                consent, and the right to complain to your local data protection
                authority if you are unhappy with how your data is handled.
              </p>
            </section>

            <section id="security" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                9. Security
              </h2>

              <p>
                We use reasonable technical and organisational measures to protect
                information handled by StockStarter. However, no website, database
                or online service can be guaranteed to be completely secure.
              </p>

              <p className="mt-4">
                You should never send us passwords, private keys, seed phrases,
                bank login details or confidential financial account credentials.
              </p>
            </section>

            <section id="children" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                10. Children
              </h2>

              <p>
                StockStarter is not intended for children. We do not knowingly
                collect personal information from children. If we become aware that
                we have collected information from a child, we will take appropriate
                steps to remove it.
              </p>
            </section>

            <section id="changes" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                11. Changes to this policy
              </h2>

              <p>
                We may update this Privacy Policy as StockStarter develops, new
                features are added, or legal requirements change. The updated version
                will be posted on this page with a new “Last updated” date.
              </p>
            </section>

            <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                12. Contact
              </h2>

              <p>
                If you have questions about this Privacy Policy or want to make a
                privacy request, contact StockStarter through the support details
                provided on the website.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}