import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

export default function RoleBasedRoute({ allowedRoles }) {
  const location = useLocation()
  const { user, isAuthenticated, authStatus } = useSelector((state) => state.auth)

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

  if (!isAuthenticated || authStatus === "unauthenticated" || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userRole = user.role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={getRoleBasedRedirect(userRole)} replace />
  }

  return <Outlet />
}

function getRoleBasedRedirect(role) {
  switch (role) {
    case "ROLE_JOB_SEEKER":
    case "ROLE_USER":
      return "/jobs"
    case "ROLE_EMPLOYER":
      return "/employer/dashboard"
    case "ROLE_ADMIN":
      return "/admin/dashboard"
    default:
      return "/login"
  }
}
