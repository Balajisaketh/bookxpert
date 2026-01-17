const features = [
  {
    title: "Invoice in seconds",
    body: "Create branded invoices, automate reminders, and accept online payments in one place.",
    tag: "Billing"
  },
  {
    title: "Real-time dashboards",
    body: "Understand cash flow, runway, and profitability with visual, real-time insights.",
    tag: "Analytics"
  },
  {
    title: "GST-ready reports",
    body: "Export compliant reports for your CA with a single click at the end of each month.",
    tag: "Compliance"
  },
  {
    title: "Team-friendly access",
    body: "Invite your finance team with granular permissions and full audit trails.",
    tag: "Collaboration"
  }
]

function FeatureGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="space-y-8"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="features-heading"
            className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl"
          >
            Everything you need, one clean interface.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            No more spreadsheets with broken formulas. Manage revenue, expenses, taxes, and
            approvals with a workspace that feels as polished as your brand.
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Designed for founders, operators, and finance teams that care about craft.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="group glass-panel flex flex-col justify-between p-5 transition-transform hover:-translate-y-1"
          >
            <div className="space-y-3">
              <span className="badge-pill inline-flex bg-primary-500/15 text-[0.7rem] font-medium uppercase tracking-wide text-primary-200">
                {feature.tag}
              </span>
              <h3 className="text-base font-semibold text-slate-50">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-300">{feature.body}</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <p>Keyboard first navigation and screen-reader friendly labels.</p>
              <span className="text-primary-300 group-hover:text-primary-200">
                Learn more →
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeatureGrid

