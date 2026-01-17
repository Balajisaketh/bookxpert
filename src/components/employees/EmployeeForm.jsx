import { useEffect, useState } from "react"
import Button from "../common/Button.jsx"

const STATES = [
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Remote"
]

const DEFAULT_VALUES = {
  fullName: "",
  gender: "",
  dob: "",
  state: "",
  active: true,
  avatarUrl: ""
}

function EmployeeForm({ mode, initialValues, onSubmit, onCancel }) {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [avatarPreview, setAvatarPreview] = useState("")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const merged = { ...DEFAULT_VALUES, ...(initialValues || {}) }
    setValues(merged)
    setAvatarPreview(merged.avatarUrl || "")
    setErrors({})
  }, [initialValues, mode])

  const handleChange = (field, value) => {
    setValues((previous) => ({
      ...previous,
      [field]: value
    }))
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const previewUrl = URL.createObjectURL(file)
    setAvatarPreview(previewUrl)
  }

  const validate = () => {
    const nextErrors = {}
    const name = values.fullName.trim()
    if (!name) {
      nextErrors.fullName = "Full name is required"
    } else if (name.length < 3) {
      nextErrors.fullName = "Full name must be at least 3 characters"
    }

    if (!values.gender) {
      nextErrors.gender = "Gender is required"
    }

    if (!values.dob) {
      nextErrors.dob = "Date of birth is required"
    } else {
      const today = new Date()
      const dobDate = new Date(values.dob)
      if (Number.isNaN(dobDate.getTime())) {
        nextErrors.dob = "Enter a valid date"
      } else if (dobDate > today) {
        nextErrors.dob = "Date of birth cannot be in the future"
      } else if (dobDate.getFullYear() < 1900) {
        nextErrors.dob = "Year must be 1900 or later"
      }
    }

    if (!values.state) {
      nextErrors.state = "State is required"
    }

    if (!avatarPreview && mode === "create") {
      nextErrors.avatar = "Profile image is required"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    const payload = {
      ...values,
      fullName: values.fullName.trim(),
      avatarUrl: avatarPreview || values.avatarUrl
    }
    onSubmit(payload)
  }

  const title = mode === "edit" ? "Edit employee" : "Add employee"
  const primaryLabel = mode === "edit" ? "Save changes" : "Create employee"

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur">
      <div className="glass-panel w-full max-w-xl border border-primary-500/25 p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="badge-pill inline-flex bg-primary-500/15 text-[0.7rem] font-medium uppercase tracking-wide text-primary-100">
              {mode === "edit" ? "Edit" : "Create"}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-50">{title}</h2>
            <p className="mt-1 text-xs text-slate-400">
              Capture the details recruiters care about before the offer letter.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1.1fr_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="employee-fullName"
                className="block text-xs font-medium text-slate-300"
              >
                Full name
              </label>
              <input
                id="employee-fullName"
                type="text"
                value={values.fullName}
                onChange={(event) => handleChange("fullName", event.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                placeholder="Jane Doe"
              />
              {errors.fullName && (
                <p className="text-[0.7rem] text-rose-300">{errors.fullName}</p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <span className="block text-xs font-medium text-slate-300">Gender</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange("gender", "Male")}
                    className={`flex-1 rounded-full border px-3 py-1.5 text-xs ${
                      values.gender === "Male"
                        ? "border-primary-400 bg-primary-500/20 text-primary-100"
                        : "border-slate-700/80 bg-slate-900/80 text-slate-300"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("gender", "Female")}
                    className={`flex-1 rounded-full border px-3 py-1.5 text-xs ${
                      values.gender === "Female"
                        ? "border-primary-400 bg-primary-500/20 text-primary-100"
                        : "border-slate-700/80 bg-slate-900/80 text-slate-300"
                    }`}
                  >
                    Female
                  </button>
                </div>
                {errors.gender && (
                  <p className="text-[0.7rem] text-rose-300">{errors.gender}</p>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="employee-dob"
                  className="block text-xs font-medium text-slate-300"
                >
                  Date of birth
                </label>
                <input
                  id="employee-dob"
                  type="date"
                  value={values.dob}
                  onChange={(event) => handleChange("dob", event.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                />
                {errors.dob && (
                  <p className="text-[0.7rem] text-rose-300">{errors.dob}</p>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="employee-state"
                className="block text-xs font-medium text-slate-300"
              >
                State
              </label>
              <select
                id="employee-state"
                value={values.state}
                onChange={(event) => handleChange("state", event.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <option value="">Select state</option>
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-[0.7rem] text-rose-300">{errors.state}</p>
              )}
            </div>
            <div className="space-y-1">
              <span className="block text-xs font-medium text-slate-300">
                Employment status
              </span>
              <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={values.active}
                  onChange={(event) => handleChange("active", event.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900/80 text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                />
                <span>{values.active ? "Active" : "Inactive"}</span>
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <span className="block text-xs font-medium text-slate-300">
                Profile image
              </span>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-slate-700/80 bg-slate-900/80">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt={values.fullName || "Employee avatar preview"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                      No image
                    </div>
                  )}
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-primary-100">
                  <span className="rounded-full border border-primary-400/60 bg-primary-500/10 px-3 py-1.5">
                    Choose file
                  </span>
                  <span className="text-[0.7rem] text-slate-400">
                    JPG or PNG, under 5 MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              {errors.avatar && (
                <p className="text-[0.7rem] text-rose-300">{errors.avatar}</p>
              )}
            </div>
            <p className="text-[0.68rem] text-slate-500">
              Preview updates instantly, but changes are only saved when you confirm below.
            </p>
            <div className="mt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="px-4"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" className="px-4">
                {primaryLabel}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm

