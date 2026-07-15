import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"

import LandingPage from "./pages/LandingPage"
import UserLayout from "./components/user/layout/UserLayout"
import JobsPage from "./pages/user/Jobs"
import JobDetails from "./pages/user/JobDetails"
import ApplyJob from "./pages/user/ApplyJob"

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<UserLayout />}>
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/apply" element={<ApplyJob />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
