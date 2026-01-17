function Button({ variant = "primary", size = "md", className = "", children, ...rest }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
  const variants = {
    primary:
      "bg-primary-500 text-slate-950 hover:bg-primary-400 focus-visible:ring-primary-300",
    secondary:
      "bg-slate-900/60 text-slate-50 hover:bg-slate-800/80 border border-slate-700/70 focus-visible:ring-slate-700",
    ghost:
      "bg-transparent text-slate-50 hover:bg-slate-900/60 focus-visible:ring-slate-700"
  }
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base"
  }
  const classes = [baseStyles, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button

