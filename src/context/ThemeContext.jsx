import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}
})

export function ThemeProvider({ children }) {
  const [theme] = useState("dark")

  useEffect(() => {
    const root = document.documentElement
    root.classList.add("dark")
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
