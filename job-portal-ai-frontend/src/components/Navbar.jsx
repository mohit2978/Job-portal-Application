import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-slate-900">
          JobPortal<span className="text-blue-600">.AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">How it works</a>
          <a href="#features"     className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
          <Link to="/jobs"        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Jobs</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="text-sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
