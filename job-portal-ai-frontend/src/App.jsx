import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Jobs from "./pages/user/Jobs"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"     element={<LandingPage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="*"     element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
