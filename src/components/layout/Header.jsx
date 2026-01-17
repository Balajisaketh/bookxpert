import Button from "../common/Button.jsx"

function Header() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-500 via-primary-400 to-accent-400 shadow-soft">
            <span className="text-xl font-semibold text-slate-950">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-slate-50">
              BookXpert
            </span>
            <span className="text-xs text-slate-400">
              Smart business bookkeeping
            </span>
          </div>
        </div>
      
      
      </nav>
    </header>
  )
}

export default Header
