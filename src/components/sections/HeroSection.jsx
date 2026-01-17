import Button from "../common/Button.jsx"

function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] md:items-center"
    >
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-slate-900/60 px-3 py-1 text-xs font-medium text-primary-200 shadow-soft">
          <span className="badge-pill bg-primary-500/10 text-primary-200">
            New
          </span>
          <span>Close your books in minutes, not days</span>
        </div>
        <div className="space-y-4">
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
          >
            Beautiful bookkeeping for modern small businesses.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            BookXpert keeps your invoices, expenses, and insights in one elegant dashboard.
            Stay compliant, understand your cash flow, and make decisions with confidence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg">Start free trial</Button>
          <Button variant="secondary" size="lg">
            Book a demo
          </Button>
          <p className="text-xs text-slate-400">
            No credit card required. Cancel anytime.
          </p>
        </div>
        <dl className="mt-4 flex flex-wrap gap-6 text-xs text-slate-400 sm:text-sm">
          <div>
            <dt className="font-semibold text-slate-200">2k+</dt>
            <dd>businesses stay on top of their books</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-200">4.9</dt>
            <dd>average rating from finance teams</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-200">24/7</dt>
            <dd>support from real bookkeepers</dd>
          </div>
        </dl>
      </div>
      <div className="glass-panel relative mx-auto w-full max-w-md p-5 sm:p-6">
        <div className="absolute inset-x-8 -top-10 -z-10 h-24 rounded-full bg-primary-500/30 blur-3xl" />
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              This month
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-50">₹ 8,42,190</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
            +18.2% vs last month
          </span>
        </div>
        <div className="mt-6 space-y-4 text-xs text-slate-200">
          <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-3 py-3">
            <div>
              <p className="text-[0.78rem] text-slate-400">Receivables</p>
              <p className="text-sm font-semibold text-slate-50">₹ 2,10,530</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-[0.78rem] text-emerald-300">On track</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
              <p className="text-[0.78rem] text-slate-400">Pending invoices</p>
              <p className="mt-1 text-sm font-semibold text-slate-50">12 clients</p>
              <p className="mt-1 text-[0.78rem] text-slate-400">Avg age 9 days</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
              <p className="text-[0.78rem] text-slate-400">Compliance</p>
              <p className="mt-1 text-sm font-semibold text-slate-50">100% up to date</p>
              <p className="mt-1 text-[0.78rem] text-emerald-300">All filings submitted</p>
            </div>
          </div>
          <form className="mt-2 space-y-3">
            <label className="flex flex-col gap-1 text-xs">
              <span className="text-slate-300">Invite your accountant</span>
              <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/80 px-3 py-1.5">
                <input
                  type="email"
                  required
                  placeholder="name@firm.com"
                  className="w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary-500 px-3 py-1 text-[0.7rem] font-medium text-slate-950 hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Send
                </button>
              </div>
            </label>
            <p className="text-[0.7rem] text-slate-500">
              We send a secure invite with read-only access to your books.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
