import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 w-fit rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-600">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Job Matching</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Get Hired Faster with AI
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl">
            Build job-ready resumes, discover relevant jobs, and apply smarter — all in one platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <Button size="lg" className="text-base">Get Started Free</Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="text-base">Browse Jobs</Button>
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 pt-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-full max-w-lg aspect-square rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-200 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-slate-500 font-medium">AI-Powered Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
