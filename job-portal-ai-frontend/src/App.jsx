import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Jobs from "./pages/user/Jobs"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </Router>
  )
}

export default App
