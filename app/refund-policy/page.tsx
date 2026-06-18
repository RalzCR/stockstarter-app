export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-5xl mx-auto">
        <a href="/" className="text-green-400 hover:text-green-300">
          ← Back to StockStarter
        </a>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400 mb-4">
            Billing
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Refund Policy
          </h1>

          <p className="text-gray-400 mb-8">
            Last updated: June 2026
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            This Refund Policy explains how StockStarter handles subscription
            payments, cancellations, billing issues and refund requests for paid
            software features.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-bold mb-4">
                Contents
              </h2>

              <div className="space-y-3 text-sm text-gray-400">
                <a href="#subscriptions" className="block hover:text-white">Subscriptions</a>
                <a href="#billing" className="block hover:text-white">Billing</a>
                <a href="#cancellations" className="block hover:text-white">Cancellations</a>
                <a href="#refunds" className="block hover:text-white">Refunds</a>
                <a href="#incorrect-charges" className="block hover:text-white">Incorrect charges</a>
                <a href="#failed-payments" className="block hover:text-white">Failed payments</a>
                <a href="#access" className="block hover:text-white">Access after cancellation</a>
                <a href="#chargebacks" className="block hover:text-white">Chargebacks</a>
                <a href="#request" className="block hover:text-white">Request a refund</a>
                <a href="#changes" className="block hover:text-white">Changes</a>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8 text-gray-300 leading-relaxed">
            <section id="subscriptions" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                1. Subscription-based service
              </h2>

              <p>
                StockStarter provides subscription-based access to premium software
                features. These may include enhanced market dashboards, saved
                watchlists, market insights, alerts, educational tools and other
                platform features.
              </p>

              <p className="mt-4">
                Subscription details, pricing, billing period and included features
                are shown before purchase at checkout or on the relevant pricing page.
              </p>
            </section>

            <section id="billing" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                2. Billing and renewals
              </h2>

              <p>
                Subscription payments are processed securely through Stripe. By
                subscribing to a paid StockStarter plan, you authorise the selected
                payment method to be charged according to the subscription plan chosen.
              </p>

              <p className="mt-4">
                Subscriptions renew automatically unless cancelled before the next
                billing date. The renewal amount and billing frequency depend on the
                plan selected at checkout.
              </p>

              <p className="mt-4">
                StockStarter does not directly store full payment card numbers or card
                security codes on its own servers.
              </p>
            </section>

            <section id="cancellations" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                3. Cancellations
              </h2>

              <p>
                Customers may cancel a subscription to stop future renewals. Cancelling
                a subscription prevents future billing but does not automatically
                refund payments already made.
              </p>

              <p className="mt-4">
                After cancellation, access to paid features may continue until the end
                of the current paid billing period unless stated otherwise.
              </p>
            </section>

            <section id="refunds" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                4. Refunds
              </h2>

              <p>
                Refund requests are reviewed on a case-by-case basis. StockStarter may
                issue a refund where there has been a billing error, duplicate charge,
                technical issue preventing access, or another valid reason accepted by
                StockStarter.
              </p>

              <p className="mt-4">
                Refunds are generally not provided for subscription periods that have
                already been used, changes of mind after using paid features, or failure
                to cancel before a renewal date.
              </p>

              <p className="mt-4">
                If a refund is approved, it will normally be returned to the original
                payment method used at checkout. Processing times may depend on Stripe,
                the card provider and the customer’s bank.
              </p>
            </section>

            <section id="incorrect-charges" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                5. Duplicate or incorrect charges
              </h2>

              <p>
                If you believe you have been charged incorrectly, charged twice, or
                billed after cancelling, contact StockStarter with the billing email
                used at checkout and a description of the issue.
              </p>

              <p className="mt-4">
                Verified duplicate or incorrect charges will be investigated and, where
                appropriate, refunded or corrected.
              </p>
            </section>

            <section id="failed-payments" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                6. Failed payments
              </h2>

              <p>
                If a subscription payment fails, Stripe may retry the payment or request
                that the payment method is updated. Access to paid features may be paused,
                restricted or cancelled if payment cannot be completed.
              </p>

              <p className="mt-4">
                Customers are responsible for keeping payment details accurate and up to
                date.
              </p>
            </section>

            <section id="access" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                7. Access after cancellation
              </h2>

              <p>
                When a subscription is cancelled, paid access may remain active until
                the end of the current billing period. After the billing period ends,
                the account may return to free access or lose access to paid features.
              </p>

              <p className="mt-4">
                Cancelling a subscription does not delete the customer’s account or
                automatically remove data saved through the platform.
              </p>
            </section>

            <section id="chargebacks" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                8. Chargebacks and payment disputes
              </h2>

              <p>
                Customers are encouraged to contact StockStarter first if there is a
                billing problem. We will review the issue and help resolve valid payment
                concerns.
              </p>

              <p className="mt-4">
                If a chargeback or payment dispute is opened, access to paid features
                may be paused while the dispute is reviewed.
              </p>
            </section>

            <section id="request" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                9. How to request a refund
              </h2>

              <p>
                To request a refund or report a billing issue, contact StockStarter
                through the contact page and include:
              </p>

              <ul className="mt-4 space-y-3">
                <li>• The email address used at checkout.</li>
                <li>• The date of the payment.</li>
                <li>• A short explanation of the issue.</li>
                <li>• Any relevant payment confirmation or receipt details.</li>
              </ul>

              <a
                href="/contact"
                className="mt-6 inline-flex rounded-full bg-green-400 px-6 py-3 font-bold text-black hover:bg-green-300"
              >
                Contact StockStarter
              </a>
            </section>

            <section id="changes" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                10. Changes to this policy
              </h2>

              <p>
                StockStarter may update this Refund Policy from time to time. The
                latest version will be posted on this page with an updated date.
              </p>
            </section>

            <section id="contact" className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                11. Contact
              </h2>

              <p>
                Questions about billing, refunds or cancellations can be sent through
                the StockStarter contact page.
              </p>

              <a
                href="/contact"
                className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                Visit Contact Page
              </a>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}