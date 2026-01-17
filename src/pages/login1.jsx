import { useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import Button from "../components/common/Button.jsx"

function Login1() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (event) => {
    event.preventDefault()
    setError("")
    const result = login(email.trim(), password)
    if (result.success) {
      const redirectTo = location.state?.from?.pathname || "/dashboard"
      navigate(redirectTo, { replace: true })
    } else {
      setError(result.message || "Unable to log in")
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" />
        <div className="absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-12">
        <section className="flex flex-1 flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-500 via-primary-400 to-accent-400 shadow-soft">
              <span className="text-2xl font-semibold text-slate-950">B</span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-primary-200">
                BOOKXPERT
              </p>
              <p className="text-xs text-slate-400">Calm, crafted finance for modern teams</p>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Sign in to a dashboard that feels like a product launch.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Show your recruiters more than a form. BookXpert&apos;s login flows into a
              living finance cockpit with motion, clarity, and real business context.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass-panel flex flex-col gap-2 p-4">
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-primary-200">
                Time to insights
              </p>
              <p className="text-2xl font-semibold text-slate-50">3x faster</p>
              <p className="text-[0.7rem] text-slate-400">
                From raw invoices to clean, investor-ready reports.
              </p>
            </div>
            <div className="glass-panel flex flex-col gap-2 p-4">
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-emerald-200">
                Churn risk
              </p>
              <p className="text-2xl font-semibold text-emerald-300">↓ 42%</p>
              <p className="text-[0.7rem] text-slate-400">
                Teams stay when finance tools feel this considered.
              </p>
            </div>
            <div className="glass-panel flex flex-col gap-2 p-4">
              <p className="text-[0.7rem] font-medium uppercase tracking-wide text-accent-200">
                Experience score
              </p>
              <p className="text-2xl font-semibold text-accent-200">4.9</p>
              <p className="text-[0.7rem] text-slate-400">
                Average rating from founders and finance leads.
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-1 items-center justify-center">
          <div className="glass-panel w-full max-w-md border border-primary-500/25 p-6 shadow-soft sm:p-8">
            <div className="mb-6 space-y-2 text-center">
              <p className="badge-pill inline-flex bg-primary-500/20 text-[0.7rem] font-medium uppercase tracking-wide text-primary-100">
                Recruiter-ready
              </p>
              <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                Welcome back to your finance cockpit
              </h2>
              <p className="text-xs text-slate-400 sm:text-sm">
                Use the demo credentials to explore the dashboard as a hiring manager would.
              </p>
              <p className="text-[0.7rem] text-slate-500">
                Email: <span className="font-medium text-slate-300">admin@bookxpert.com</span>{" "}
                Password: <span className="font-medium text-slate-300">Password123</span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="login1-email"
                  className="block text-xs font-medium text-slate-300"
                >
                  Work email
                </label>
                <input
                  id="login1-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  placeholder="founder@company.com"
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="login1-password"
                  className="block text-xs font-medium text-slate-300"
                >
                  Password
                </label>
                <input
                  id="login1-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  placeholder="Enter your password"
                />
              </div>
              {error && (
                <p className="text-xs font-medium text-rose-400" role="alert">
                  {error}
                </p>
              )}
              <div className="flex items-center justify-between text-[0.7rem] text-slate-400">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900/80 text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
                <button
                  type="button"
                  className="text-[0.7rem] font-medium text-primary-200 hover:text-primary-100"
                >
                  Forgot password?
                </button>
              </div>
              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Enter dashboard
                </Button>
              </div>
            </form>
            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 text-[0.7rem] text-slate-400 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div>
                <p className="font-medium text-slate-200">
                  Designed to look stellar on a hiring manager&apos;s screen.
                </p>
                <p className="mt-1">
                  The layout scales from interview screenshots to live demos without losing
                  hierarchy.
                </p>
              </div>
              <div className="mt-2 flex flex-col gap-1 sm:mt-0">
                <p className="text-[0.68rem] uppercase tracking-wide text-slate-500">
                  Visual checklist
                </p>
                <p>• Responsive grid • Accessible focus states • Clear information density</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login1

