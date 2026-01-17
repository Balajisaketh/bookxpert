function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="order-2 sm:order-1">
          © {new Date().getFullYear()} BookXpert. All rights reserved.
        </p>
        <div className="order-1 flex items-center gap-4 sm:order-2">
          <a href="#features" className="hover:text-slate-200">
            Product
          </a>
          <a href="#cta" className="hover:text-slate-200">
            Pricing
          </a>
          <a href="#top" className="hover:text-slate-200">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

