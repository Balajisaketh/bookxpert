import { useEffect, useMemo, useState } from "react"
import Header from "../components/layout/Header.jsx"
import Footer from "../components/layout/Footer.jsx"
import Button from "../components/common/Button.jsx"
import EmployeeForm from "../components/employees/EmployeeForm.jsx"
import ConfirmDialog from "../components/common/ConfirmDialog.jsx"

function DashboardPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState("create")
  const [formEmployee, setFormEmployee] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [printTarget, setPrintTarget] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

{/* <p>hy</p> */}


    async function loadEmployees() {
      try {
        setLoading(true)
        setError("")
        const response = await fetch("https://dummyjson.com/users?limit=20", {
          signal: controller.signal
        })
        if (!response.ok) {
          throw new Error("Unable to load employees")
        }
        const data = await response.json()
        const transformed = data.users.map((user, index) => {
          const genderLabel = user.gender === "male" ? "Male" : "Female"
          const avatarFolder = genderLabel === "Male" ? "men" : "women"
          const avatarIndex = user.id % 100 === 0 ? 1 : user.id % 100
          const avatarUrl = `https://randomuser.me/api/portraits/${avatarFolder}/${avatarIndex}.jpg`
          return {
            id: user.id,
            employeeId: `EMP-${String(user.id).padStart(4, "0")}`,
            fullName: `${user.firstName} ${user.lastName}`,
            gender: genderLabel,
            dob: user.birthDate,
            state: user.address?.state || "Remote",
            avatar: avatarUrl,
            active: index % 3 !== 0
          }
        })
        setEmployees(transformed)
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message || "Something went wrong while fetching employees")
        }
      } finally {
        setLoading(false)
      }
    }

    loadEmployees()

    return () => controller.abort()
  }, [])

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return employees.filter((employee) => {
      const matchesSearch = term
        ? employee.fullName.toLowerCase().includes(term) ||
          employee.employeeId.toLowerCase().includes(term) ||
          employee.state.toLowerCase().includes(term)
        : true
      const matchesGender =
        genderFilter === "all"
          ? true
          : employee.gender.toLowerCase() === genderFilter
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? employee.active
          : !employee.active
      return (
        matchesSearch &&
        matchesGender &&
        matchesStatus
      )
    })
  }, [employees, searchTerm, genderFilter, statusFilter])

  const totalEmployees = employees.length
  const activeEmployees = employees.filter((employee) => employee.active).length
  const inactiveEmployees = totalEmployees - activeEmployees

  const handleToggleActive = (id) => {
    setEmployees((previous) =>
      previous.map((employee) =>
        employee.id === id ? { ...employee, active: !employee.active } : employee
      )
    )
  }

  const handleDelete = (id) => {
    const employee = employees.find((item) => item.id === id)
    if (!employee) {
      return
    }
    setDeleteTarget(employee)
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) {
      return
    }
    setEmployees((previous) =>
      previous.filter((employeeItem) => employeeItem.id !== deleteTarget.id)
    )
    setDeleteTarget(null)
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
  }

  const handlePrint = (employee) => {
    setPrintTarget(employee)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setGenderFilter("all")
    setStatusFilter("all")
  }

  const handleConfirmPrint = () => {
    if (!printTarget) {
      return
    }
    window.print()
    setPrintTarget(null)
  }

  const handleCancelPrint = () => {
    setPrintTarget(null)
  }

  const handleOpenCreateForm = () => {
    setFormMode("create")
    setFormEmployee(null)
    setFormOpen(true)
  }

  const handleOpenEditForm = (employee) => {
    setFormMode("edit")
    setFormEmployee({
      id: employee.id,
      fullName: employee.fullName,
      gender: employee.gender,
      dob: employee.dob,
      state: employee.state,
      active: employee.active,
      avatarUrl: employee.avatar
    })
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setFormEmployee(null)
  }

  const handleFormSubmit = (values) => {
    if (formMode === "create") {
      const nextId =
        employees.length > 0
          ? Math.max(...employees.map((employee) => employee.id)) + 1
          : 1
      const newEmployee = {
        id: nextId,
        employeeId: `EMP-${String(nextId).padStart(4, "0")}`,
        fullName: values.fullName,
        gender: values.gender,
        dob: values.dob,
        state: values.state,
        avatar: values.avatarUrl,
        active: values.active
      }
      setEmployees((previous) => [...previous, newEmployee])
    } else if (formMode === "edit" && formEmployee) {
      setEmployees((previous) =>
        previous.map((employee) =>
          employee.id === formEmployee.id
            ? {
                ...employee,
                fullName: values.fullName,
                gender: values.gender,
                dob: values.dob,
                state: values.state,
                avatar: values.avatarUrl || employee.avatar,
                active: values.active
              }
            : employee
        )
      )
    }
    handleCloseForm()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
        <Header />
        <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-10 ">
          <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Employee Management
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Overview of your team with quick access to status, location, and actions.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="search"
                  placeholder="Search by name, ID, or state"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-offset-slate-950"
                />
                <span className="pointer-events-none absolute right-4 top-2.5 text-xs text-slate-500 dark:text-slate-50">
                  ⌘K
                </span>
              </div>
              <Button variant="primary" size="md" onClick={handleOpenCreateForm}>
                Add employee
              </Button>
            </div>
          </section>
          <section aria-label="Employee summary" className="grid gap-4 sm:grid-cols-3">
            <article className="glass-panel flex flex-col justify-between p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium uppercase tracking-wide text-slate-200">
                  Total employees
                </h2>
                <span className="badge-pill bg-primary-500/20 text-[0.7rem] font-medium text-primary-100">
                  Live sync
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-50">
                {totalEmployees}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Includes all active and inactive team members from the mock API.
              </p>
            </article>
            <article className="glass-panel flex flex-col justify-between p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium uppercase tracking-wide text-emerald-300">
                  Active
                </h2>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-emerald-300">
                {activeEmployees}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Actively engaged and available. Toggle statuses in the table below.
              </p>
            </article>
            <article className="glass-panel flex flex-col justify-between p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium uppercase tracking-wide text-rose-300">
                  Inactive
                </h2>
                <span className="h-2 w-2 rounded-full bg-rose-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-rose-200">
                {inactiveEmployees}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                On leave, alumni, or contractors no longer engaged.
              </p>
            </article>
          </section>
          <section
            aria-label="Employee list"
            className="glass-panel border border-slate-200/80 p-4 sm:p-6 dark:border-slate-800/80"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-50">
                  Employee directory
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  IDs, locations, and status in a recruiter-friendly view.
                </p>
              </div>
              <p className="text-[0.68rem] text-slate-400">
                Powered by dummyjson.com mock API
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] uppercase tracking-wide text-slate-200">
                  Gender
                </span>
                <select
                  value={genderFilter}
                  onChange={(event) => setGenderFilter(event.target.value)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50 dark:focus-visible:ring-offset-slate-950"
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] uppercase tracking-wide text-slate-200">
                  Status
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-50 dark:focus-visible:ring-offset-slate-950"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <p className="text-[0.68rem] text-slate-400">
                  Showing {filteredEmployees.length} of {employees.length}
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[0.7rem] font-medium text-primary-200 underline-offset-2 hover:text-primary-100 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            </div>
            {loading && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-primary-400" />
                <p className="text-xs text-slate-300">
                  Loading employees...
                </p>
              </div>
            )}
            {!loading && error && (
              <p className="mt-6 rounded-lg border border-rose-500/20 bg-rose-50 px-4 py-3 text-xs text-rose-700 dark:border-rose-500/40 dark:bg-rose-950/40 dark:text-rose-100">
                {error}
              </p>
            )}
            {!loading && !error && filteredEmployees.length === 0 && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 text-center dark:border-slate-800/80 dark:bg-slate-950/40">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-50">
                  <span className="text-sm">👀</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-50">
                    No employees found
                  </h3>
                  <p className="text-xs text-slate-300">
                    Try adjusting your search or filters to see more of your team.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-700/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-100 hover:border-primary-400 hover:text-primary-100"
                >
                  Clear search & filters
                </button>
              </div>
            )}
            {!loading && !error && filteredEmployees.length > 0 && (
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/80 text-[0.7rem] uppercase tracking-wide text-slate-300">
                      <th scope="col" className="px-3 py-2">
                        Employee ID
                      </th>
                      <th scope="col" className="px-3 py-2">
                        Profile
                      </th>
                      <th scope="col" className="px-3 py-2">
                        Full name
                      </th>
                      <th scope="col" className="px-3 py-2">
                        Gender
                      </th>
                      <th scope="col" className="px-3 py-2">
                        DOB
                      </th>
                      <th scope="col" className="px-3 py-2">
                        State
                      </th>
                      <th scope="col" className="px-3 py-2">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-2 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-b border-slate-700/80 last:border-b-0 hover:bg-slate-900/60 text-slate-200"
                      >
                        <td className="px-3 py-3 align-middle text-[0.78rem] font-mono">
                          {employee.employeeId}
                        </td>
                        <td className="px-3 py-3 align-middle">
                          <div className="flex items-center gap-2">
                            <img
                              src={employee.avatar}
                              alt={employee.fullName}
                              className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-300 dark:ring-slate-800"
                            />
                          </div>
                        </td>
                        <td className="px-3 py-3 align-middle text-sm">
                          {employee.fullName}
                        </td>
                        <td className="px-3 py-3 align-middle text-xs">
                          {employee.gender}
                        </td>
                        <td className="px-3 py-3 align-middle text-xs">
                          {employee.dob}
                        </td>
                        <td className="px-3 py-3 align-middle text-xs">
                          {employee.state}
                        </td>
                        <td className="px-3 py-3 align-middle">
                          <button
                            type="button"
                            onClick={() => handleToggleActive(employee.id)}
                            className={`flex items-center gap-2 rounded-full px-2 py-1 text-[0.68rem] font-medium transition ${
                              employee.active
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-300"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                employee.active ? "bg-emerald-400" : "bg-slate-500"
                              }`}
                            />
                            {employee.active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-3 py-3 align-middle text-right">
                          <div className="flex justify-end gap-2 text-[0.68rem]">
                            <button
                              type="button"
                              onClick={() => handleOpenEditForm(employee)}
                              className="rounded-full border border-slate-600 px-2 py-1 text-slate-200 hover:border-primary-400 hover:text-primary-100"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(employee.id)}
                              className="rounded-full border border-rose-300 px-2 py-1 text-rose-600 hover:border-rose-400 hover:text-rose-700 dark:border-rose-500/40 dark:text-rose-200 dark:hover:text-rose-200"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePrint(employee)}
                              className="rounded-full border border-slate-600 px-2 py-1 text-slate-200 hover:border-accent-300 hover:text-accent-100"
                            >
                              Print
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          {formOpen && (
            <EmployeeForm
              mode={formMode}
              initialValues={formEmployee || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseForm}
            />
          )}
          <ConfirmDialog
            open={Boolean(deleteTarget)}
            title="Remove employee"
            description={
              deleteTarget
                ? `Are you sure you want to remove ${deleteTarget.fullName} (${deleteTarget.employeeId}) from this dashboard?`
                : ""
            }
            confirmLabel="Yes, remove"
            cancelLabel="No, keep"
            tone="danger"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
          <ConfirmDialog
            open={Boolean(printTarget)}
            title="Print employee summary"
            description={
              printTarget
                ? `Employee ID ${printTarget.employeeId}. ${printTarget.fullName}, ${printTarget.gender}, DOB ${printTarget.dob}, ${printTarget.state}. Status ${printTarget.active ? "Active" : "Inactive"}.`
                : ""
            }
            confirmLabel="Send to printer"
            cancelLabel="Cancel"
            tone="default"
            onConfirm={handleConfirmPrint}
            onCancel={handleCancelPrint}
          />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardPage
