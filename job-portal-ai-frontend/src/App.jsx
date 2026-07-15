import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"

import AppBootstrap from "./components/auth/AppBootstrap"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import UserLayout from "./components/user/layout/UserLayout"
import JobsPage from "./pages/user/Jobs"
import JobDetails from "./pages/user/JobDetails"
import ApplyJob from "./pages/user/ApplyJob"
import Profile from "./pages/user/Profile"
import Applications from "./pages/user/Applications"
import SavedJobs from "./pages/user/SavedJobs"
import Resumes from "./pages/user/Resumes"
import ResumeEdit from "./pages/user/ResumeEdit"
import ResumeView from "./pages/user/ResumeView"
import Settings from "./pages/user/Settings"
import AIMatch from "./pages/user/AIMatch"
import AITools from "./pages/user/AITools"

import DashboardLayout from "./components/employer/layout/DashboardLayout"
import EmployerDashboard from "./pages/employer/Dashboard"
import EmployerJobs from "./pages/employer/Jobs"
import CreateJob from "./pages/employer/CreateJob"
import EditJob from "./pages/employer/EditJob"
import EmployerApplications from "./pages/employer/Applications"
import CompanyProfile from "./pages/employer/CompanyProfile"
import EmployerSettings from "./pages/employer/Settings"

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
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/jobs/:id/apply" element={<ApplyJob />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/resumes/:id/edit" element={<ResumeEdit />} />
              <Route path="/resumes/:id/view" element={<ResumeView />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ai-match" element={<AIMatch />} />
              <Route path="/ai-tools" element={<AITools />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/employer/dashboard"    element={<EmployerDashboard />} />
              <Route path="/employer/jobs"         element={<EmployerJobs />} />
              <Route path="/employer/jobs/create"  element={<CreateJob />} />
              <Route path="/employer/jobs/:id/edit" element={<EditJob />} />
              <Route path="/employer/applications" element={<EmployerApplications />} />
              <Route path="/employer/company"      element={<CompanyProfile />} />
              <Route path="/employer/settings"     element={<EmployerSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppBootstrap>
    </Router>
  )
}

export default App
