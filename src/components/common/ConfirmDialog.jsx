import Button from "./Button.jsx"

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Yes",
  cancelLabel = "No",
  tone = "danger",
  onConfirm,
  onCancel
}) {
  if (!open) {
    return null
  }

  const toneStyles =
    tone === "danger"
      ? {
          accent: "from-rose-500/70 via-rose-400/40 to-transparent",
          chip: "bg-rose-500/20 text-rose-100 border-rose-500/40"
        }
      : {
          accent: "from-primary-500/70 via-primary-400/40 to-transparent",
          chip: "bg-primary-500/20 text-primary-100 border-primary-500/40"
        }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md sm:max-w-lg">
        <div className={`pointer-events-none absolute inset-x-8 -top-10 h-10 bg-gradient-to-b ${toneStyles.accent} opacity-60 blur-2xl`} />
        <div className="glass-panel relative grid gap-6 border border-slate-800/80 px-6 py-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:px-7 sm:py-6">
          <button
            type="button"
            onClick={onCancel}
            className="absolute right-4 top-4 text-xs text-slate-500 transition hover:text-slate-200"
          >
            ✕
          </button>
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-wide ${toneStyles.chip}`}>
                Confirm action
              </span>
            </div>
            <h2 className="text-base font-semibold tracking-tight text-slate-50 sm:text-lg">
              {title}
            </h2>
            {description && (
              <p className="text-sm leading-relaxed text-slate-200">
                {description}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-slate-800/80 pt-4 text-xs text-slate-200 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-slate-50">
                This change cannot be easily undone.
              </p>
              <p>
                Choose{" "}
                <span className="font-semibold text-slate-50">{confirmLabel}</span> if you are sure,
                or <span className="font-semibold text-slate-50">{cancelLabel}</span> to keep things
                as they are.
              </p>
            </div>
            <div className="flex flex-nowrap items-center justify-end gap-3 pt-1 sm:pt-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="min-w-[90px] whitespace-nowrap px-4"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className={`min-w-[90px] whitespace-nowrap px-4 ${
                  tone === "danger"
                    ? "bg-rose-500 text-slate-950 hover:bg-rose-400"
                    : ""
                }`}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
