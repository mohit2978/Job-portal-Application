import { useState } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import api from "@/store/api"

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword]   = useState("")
  const [confirm, setConfirm]     = useState("")
  const [showPw, setShowPw]       = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone]           = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return }
    if (password !== confirm)  { toast.error("Passwords do not match"); return }
    if (!token) { toast.error("Invalid or missing reset token"); return }

    setIsLoading(true)
    try {
      await api.post("/api/auth/reset-password", { token, newPassword: password })
      setDone(true)
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to reset password. The link may have expired."
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-8">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Password Reset!</h2>
            <p className="text-slate-600 text-sm mb-6">
              Your password has been updated successfully. You can now log in with your new password.
            </p>
            <Button className="w-full bg-brand hover:bg-brand/90" onClick={() => navigate("/login")}>
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="h-12 w-12 rounded-xl bg-brand flex items-center justify-center mx-auto mb-4">
            <KeyRound className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>
            Create a strong new password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!token ? (
            <div className="text-center py-6">
              <p className="text-red-600 text-sm mb-4">Invalid or missing reset link. Please request a new one.</p>
              <Button variant="outline" asChild>
                <Link to="/forgot-password">Request New Link</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your new password"
                  required
                />
              </div>

              {password && confirm && password !== confirm && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}

              <Button
                type="submit"
                disabled={isLoading || !password || !confirm}
                className="w-full bg-brand hover:bg-brand/90"
              >
                {isLoading ? "Resetting…" : "Reset Password"}
              </Button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-slate-500 hover:text-brand">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
