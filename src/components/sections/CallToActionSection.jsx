import Button from "../common/Button.jsx"

function CallToActionSection() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="glass-panel border border-primary-500/25 px-6 py-7 sm:px-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md space-y-2">
          <h2
            id="cta-heading"
            className="text-2xl font-semibold tracking-tight text-slate-50"
          >
            Close your books beautifully this quarter.
          </h2>
          <p className="text-sm text-slate-300">
            Start a 14 day free trial and see how much calmer month-end can feel for your
            team. No contracts, no setup fees.
          </p>
        </div>
        <form className="flex w-full flex-col gap-3 text-sm text-slate-900 md:max-w-sm md:flex-row">
          <label className="flex-1">
            <span className="sr-only">Work email</span>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            />
          </label>
          <Button type="submit" size="md" className="whitespace-nowrap">
            Get started
          </Button>
        </form>
      </div>
    </section>
  )
}

export default CallToActionSection
