export function getRoleBasedRedirect(role) {
  switch (role) {
    case "ROLE_JOB_SEEKER": return "/jobs"
    case "ROLE_EMPLOYER":   return "/employer/dashboard"
    case "ROLE_ADMIN":      return "/admin/dashboard"
    default:                return "/login"
  }
}
