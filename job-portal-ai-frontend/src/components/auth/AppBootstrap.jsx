import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentUser } from "@/store/user/userThunk"

/**
 * AppBootstrap Component
 * Initializer component that boots up the application. It checks for a local accessToken,
 * fetches the profile of the current authenticated user if a token exists, and delays
 * application rendering until user authentication status is resolved.
 */
export default function AppBootstrap({ children }) {
  const dispatch = useDispatch()
  const { authStatus } = useSelector((state) => state.auth)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken")
      if (token) await dispatch(fetchCurrentUser())
      setIsInitialized(true)
    }
    if (!isInitialized) initializeAuth()
  }, [dispatch, isInitialized])

  if (!isInitialized || authStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand mx-auto mb-4"></div>
          <p className="text-lg font-medium text-slate-900 mb-2">Loading Job Portal</p>
          <p className="text-sm text-slate-600">Please wait...</p>
        </div>
      </div>
    )
  }

  return children
}
