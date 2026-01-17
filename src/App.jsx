import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx"
import Login1 from "./pages/login1.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login1" element={<Login1 />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
