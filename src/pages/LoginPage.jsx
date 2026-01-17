import { useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import Button from "../components/common/Button.jsx"

function LoginPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4">
      <div className="glass-panel login-panel w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-500 via-primary-400 to-accent-400 shadow-soft">
            <span className="text-xl font-semibold text-slate-950">B</span>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-slate-50">Sign in to BookXpert</h1>
            <p className="mt-1 text-xs text-slate-400">
              Use the demo account to access the dashboard.
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              Email: <span className="font-medium text-slate-300">admin@bookxpert.com</span>{" "}
              Password: <span className="font-medium text-slate-300">Password123</span>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-xs font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-xs font-medium text-rose-400" role="alert">
              {error}
            </p>
          )}
          <div className="pt-1">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
