import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (email, password) => {
    if (email === "admin@bookxpert.com" && password === "Password123") {
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, message: "Invalid credentials" }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

