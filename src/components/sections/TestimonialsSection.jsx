const testimonials = [
  {
    name: "Ananya Rao",
    role: "Founder, Morning Brew Cafe",
    quote:
      "BookXpert turned our chaotic spreadsheets into a single, reliable source of truth. I finally understand our margins without calling my accountant every week."
  },
  {
    name: "Rahul Mehta",
    role: "COO, PixelCraft Studio",
    quote:
      "The dashboards are as thoughtful as the design. Our leadership meetings start with BookXpert open on the big screen every Monday."
  }
]

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="space-y-6"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="testimonials-heading"
            className="text-2xl font-semibold tracking-tight text-slate-50"
          >
            Teams that care about craft choose BookXpert.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            From cafes and clinics to SaaS startups, BookXpert keeps finances transparent,
            calm, and collaborative.
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Names and businesses are representative of real customer stories.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="glass-panel flex flex-col justify-between p-5 text-sm"
          >
            <blockquote className="text-slate-200">
              <span className="text-xl text-primary-300">“</span>
              {t.quote}
              <span className="text-xl text-primary-300">”</span>
            </blockquote>
            <figcaption className="mt-4">
              <p className="text-sm font-medium text-slate-50">{t.name}</p>
              <p className="text-xs text-slate-400">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection

