import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, BriefcaseBusiness, Brain, FileText, TrendingUp, Building2, Users } from "lucide-react"

const STATS = [
  { dot: "bg-emerald-400", text: "100K+ Jobs" },
  { dot: "bg-blue-400",    text: "50K+ Companies" },
  { dot: "bg-violet-400",  text: "AI-Powered" },
]

const FEATURES = [
  { icon: Brain,            title: "AI Job Matching",    desc: "Smart recommendations based on your skills and experience" },
  { icon: FileText,         title: "Resume Builder",     desc: "Professional templates reviewed by industry experts" },
  { icon: TrendingUp,       title: "Career Insights",    desc: "Real-time market trends and salary benchmarks" },
]

const FLOATING_CARDS = [
  { icon: Building2, label: "Google",    sub: "Senior Engineer · Remote",   color: "bg-blue-500" },
  { icon: BriefcaseBusiness, label: "New Match!", sub: "94% fit · Applied 2m ago", color: "bg-emerald-500" },
  { icon: Users,     label: "500+ views", sub: "Your profile this week",    color: "bg-violet-500" },
]

/**
 * AuthLayout Component
 * Shared layout component used for authentication pages (Login, Register, Forgot Password, Reset Password).
 * Displays a premium left panel featuring platform features and highlights,
 * and a right panel hosting the auth form card.
 */
export default function AuthLayout({ title, description, children, footerText, footerLink, footerLinkText }) {
  return (
    <div className="min-h-screen flex">

      {/* Left panel — gradient + decorative UI, hidden on mobile */}
      <div
        className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden shrink-0 flex-col justify-between p-12"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e3a5f 100%)" }}
      >
        {/* Background decoration blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        {/* Grid dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Top — brand */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5">
            <div className="bg-white/10 border border-white/20 rounded-xl p-2">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">HIREKRO</span>
          </div>
        </div>

        {/* Middle — headline + feature cards */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your next career move<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #818cf8, #38bdf8)" }}>
                starts here.
              </span>
            </h2>
            <p className="text-white/60 mt-3 text-sm leading-relaxed max-w-xs">
              AI-powered job matching, smart resume builder, and real-time career insights — all in one place.
            </p>
          </div>

          {/* Feature cards */}
          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="bg-white/10 rounded-lg p-2 shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-indigo-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — floating activity cards + stats */}
        <div className="relative z-10 space-y-5">
          {/* Floating notification cards */}
          <div className="space-y-2">
            {FLOATING_CARDS.map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-lg px-4 py-2.5 backdrop-blur-sm">
                <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0`}>
                  <Icon className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-[10px] text-white/50">{sub}</p>
                </div>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-5 pt-2 border-t border-white/10">
            {STATS.map(({ dot, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                <span className="text-xs text-white/60 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 relative overflow-hidden bg-linear-to-br from-slate-50 via-brand/5 to-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand/20 rounded-lg blur-xl group-hover:bg-brand/30 transition-all" />
                  <div className="relative bg-brand p-2 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                  HIRE<span className="text-brand">KRO</span>
                </h1>
              </Link>
              <p className="text-sm text-slate-600 mt-2">AI-Powered Career Platform</p>
            </div>

            {/* Auth Card */}
            <Card className="border-slate-200/60 shadow-xl bg-white/80">
              <CardHeader className="space-y-2 pb-4">
                <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                {description && (
                  <CardDescription className="text-center text-base">{description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-2">{children}</CardContent>
            </Card>

            {/* Footer link */}
            {footerText && (
              <p className="text-center text-sm text-slate-600 mt-6">
                {footerText}{" "}
                <Link to={footerLink} className="font-semibold text-brand hover:text-brand/80 transition-colors underline-offset-4 hover:underline">
                  {footerLinkText}
                </Link>
              </p>
            )}

            {/* Mobile trust indicators */}
            <div className="flex lg:hidden items-center justify-center gap-6 mt-8 text-xs text-slate-500">
              {[
                { dot: "bg-green-500",  text: "Secure" },
                { dot: "bg-blue-500",   text: "Fast" },
                { dot: "bg-purple-500", text: "Private" },
              ].map(({ dot, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
