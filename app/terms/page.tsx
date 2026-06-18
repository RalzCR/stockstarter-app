export default function TermsPage() {
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
            Terms of Use
          </h1>

          <p className="text-gray-400 mb-8">
            Last updated: June 2026
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            These Terms of Use explain the rules for using StockStarter, including
            our market dashboard, watchlist tools, market news, educational insights
            and subscription features.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-bold mb-4">
                Contents
              </h2>

              <div className="space-y-3 text-sm text-gray-400">
                <a href="#acceptance" className="block hover:text-white">Acceptance</a>
                <a href="#service" className="block hover:text-white">The service</a>
                <a href="#no-advice" className="block hover:text-white">No financial advice</a>
                <a href="#market-data" className="block hover:text-white">Market data</a>
                <a href="#accounts" className="block hover:text-white">Accounts</a>
                <a href="#subscriptions" className="block hover:text-white">Subscriptions</a>
                <a href="#acceptable-use" className="block hover:text-white">Acceptable use</a>
                <a href="#intellectual-property" className="block hover:text-white">Intellectual property</a>
                <a href="#availability" className="block hover:text-white">Availability</a>
                <a href="#liability" className="block hover:text-white">Liability</a>
                <a href="#changes" className="block hover:text-white">Changes</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8 text-gray-300 leading-relaxed">
            <section id="acceptance" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                1. Acceptance of these terms
              </h2>

              <p>
                By accessing or using StockStarter, you agree to these Terms of Use.
                If you do not agree to these terms, you should not use the website or
                its services.
              </p>

              <p className="mt-4">
                These terms apply to all visitors, waitlist members, subscribers and
                users of StockStarter.
              </p>
            </section>

            <section id="service" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                2. StockStarter service
              </h2>

              <p>
                StockStarter is a beginner-friendly market dashboard that provides
                access to market charts, stock and crypto price information, watchlist
                tools, market news and educational insights.
              </p>

              <p className="mt-4">
                The platform is designed to help users understand market information
                more clearly. StockStarter is not a broker, exchange, investment
                adviser, financial adviser, wealth manager or trading platform.
              </p>
            </section>

            <section id="no-advice" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                3. No financial advice
              </h2>

              <p>
                StockStarter provides educational and informational content only.
                Nothing on the website should be treated as financial advice,
                investment advice, tax advice, legal advice, trading advice or a
                recommendation to buy, sell or hold any asset.
              </p>

              <p className="mt-4">
                StockStarter does not make investment recommendations, provide
                personalised financial guidance, manage portfolios, execute trades,
                custody assets or guarantee investment outcomes.
              </p>

              <p className="mt-4">
                You are responsible for your own financial decisions. You should do
                your own research and consider speaking with a qualified professional
                before making investment decisions.
              </p>
            </section>

            <section id="market-data" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                4. Market data, news and charts
              </h2>

              <p>
                StockStarter displays market data, charts, crypto information and news
                from external providers. This information may be delayed, incomplete,
                inaccurate, unavailable or different from data shown on other platforms.
              </p>

              <p className="mt-4">
                Prices and market conditions can change rapidly. Past performance does
                not guarantee future results. You should not rely only on StockStarter
                when making financial decisions.
              </p>
            </section>

            <section id="accounts" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                5. Accounts and access
              </h2>

              <p>
                Some StockStarter features may require you to provide an email address,
                create an account or subscribe to a paid plan.
              </p>

              <p className="mt-4">
                You are responsible for keeping your login details secure and for all
                activity that takes place through your account. You must provide accurate
                information and must not create accounts using false or misleading details.
              </p>

              <p className="mt-4">
                We may suspend or restrict access if we believe an account is being
                misused, used unlawfully or used in a way that harms the platform or
                other users.
              </p>
            </section>

            <section id="subscriptions" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                6. Subscriptions and billing
              </h2>

              <p>
                StockStarter may offer paid subscription features. Subscription prices,
                billing periods and included features are shown at checkout or on the
                relevant pricing page.
              </p>

              <p className="mt-4">
                Payments are processed through Stripe. By purchasing a subscription,
                you authorise the payment method provided at checkout to be charged
                according to the selected plan.
              </p>

              <p className="mt-4">
                Subscription access may continue until cancelled, expired or otherwise
                ended under these terms. Cancellation and refund information is provided
                in the Refund Policy.
              </p>
            </section>

            <section id="acceptable-use" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                7. Acceptable use
              </h2>

              <p>
                You agree not to misuse StockStarter. This means you must not:
              </p>

              <ul className="mt-4 space-y-3">
                <li>• Use the platform for unlawful, fraudulent or harmful activity.</li>
                <li>• Attempt to damage, overload, scrape, reverse engineer or attack the website.</li>
                <li>• Try to access data, systems or accounts you are not authorised to access.</li>
                <li>• Copy or redistribute platform content in a way that infringes our rights or third-party rights.</li>
                <li>• Use StockStarter to provide unauthorised financial promotions or investment advice.</li>
                <li>• Upload or send malicious code, spam, abusive content or misleading information.</li>
              </ul>
            </section>

            <section id="intellectual-property" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                8. Intellectual property
              </h2>

              <p>
                StockStarter, including its design, branding, website layout, written
                content and software features, is protected by intellectual property
                rights.
              </p>

              <p className="mt-4">
                You may use the platform for personal, educational and informational
                purposes. You must not copy, sell, reproduce, distribute or exploit
                StockStarter content or software without permission.
              </p>
            </section>

            <section id="availability" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                9. Availability and changes to the service
              </h2>

              <p>
                We aim to keep StockStarter available and reliable, but we do not
                guarantee uninterrupted access. The website may be unavailable due to
                maintenance, provider issues, technical faults, security incidents or
                events outside our control.
              </p>

              <p className="mt-4">
                We may update, improve, restrict, replace or remove features as the
                platform develops.
              </p>
            </section>

            <section id="liability" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                10. Limitation of liability
              </h2>

              <p>
                StockStarter is provided for educational and informational purposes.
                We are not responsible for financial losses, trading losses, missed
                opportunities, data inaccuracies, third-party service failures or
                decisions made based on information shown on the platform.
              </p>

              <p className="mt-4">
                Nothing in these terms excludes or limits liability where it would be
                unlawful to do so.
              </p>
            </section>

            <section id="third-parties" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                11. Third-party services
              </h2>

              <p>
                StockStarter may link to or integrate with third-party services,
                including payment processors, hosting providers, database providers,
                charting providers, market data providers and news providers.
              </p>

              <p className="mt-4">
                We are not responsible for third-party websites, data, terms, policies
                or service availability.
              </p>
            </section>

            <section id="changes" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                12. Changes to these terms
              </h2>

              <p>
                We may update these Terms of Use from time to time. The latest version
                will be posted on this page with an updated date. Continued use of
                StockStarter means you accept the latest version.
              </p>
            </section>

            <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                13. Contact
              </h2>

              <p>
                Questions about these Terms of Use can be sent through the StockStarter
                contact page.
              </p>

              <a
                href="/contact"
                className="mt-6 inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
              >
                Contact StockStarter
              </a>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}