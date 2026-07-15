import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"

import AppBootstrap from "./components/auth/AppBootstrap"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import UserLayout from "./components/user/layout/UserLayout"
import JobsPage from "./pages/user/Jobs"
import JobDetails from "./pages/user/JobDetails"
import ApplyJob from "./pages/user/ApplyJob"
import Profile from "./pages/user/Profile"

function App() {
  return (
    <Router>
      <AppBootstrap>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/jobs/:id/apply" element={<ApplyJob />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppBootstrap>
    </Router>
  )
}

export default App
