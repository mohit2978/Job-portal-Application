import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, authStatus } = useSelector((state) => state.auth)

  if (authStatus === "loading" || authStatus === "idle") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
