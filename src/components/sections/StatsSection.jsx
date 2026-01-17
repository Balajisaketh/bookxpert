const stats = [
  {
    label: "Average monthly time saved",
    value: "18h",
    detail: "per founder or finance lead every month"
  },
  {
    label: "Faster invoice collection",
    value: "2.4x",
    detail: "reduction in average days sales outstanding"
  },
  {
    label: "Support satisfaction score",
    value: "97%",
    detail: "teams who love our human-first finance experts"
  }
]

function StatsSection() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="glass-panel border border-slate-800/80 px-6 py-7 sm:px-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md space-y-2">
          <h2
            id="stats-heading"
            className="text-2xl font-semibold tracking-tight text-slate-50"
          >
            Make the finance team everyone enjoys working with.
          </h2>
          <p className="text-sm text-slate-300">
            BookXpert removes the busywork from bookkeeping so your team can focus on
            strategic decisions, not manual reconciliations.
          </p>
        </div>
        <dl className="grid flex-1 gap-6 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {item.label}
              </dt>
              <dd className="text-2xl font-semibold text-primary-200">
                {item.value}
              </dd>
              <dd className="text-xs text-slate-400">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default StatsSection

