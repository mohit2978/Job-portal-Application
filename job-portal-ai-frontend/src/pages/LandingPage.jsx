import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles, ArrowRight, UserCircle, Search, Send,
  FileText, Target, Zap, BarChart3, Users,
} from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  { icon: UserCircle, title: "Create your profile",        desc: "Build an AI-optimized resume in minutes with our smart builder." },
  { icon: Search,     title: "Discover relevant jobs",     desc: "Get matched with opportunities that fit your skills and experience." },
  { icon: Send,       title: "Apply & track applications", desc: "Apply with one click and track all your applications in one place." },
]

const FEATURES = [
  { icon: FileText,  title: "AI Resume Builder",    desc: "Create ATS-friendly resumes optimized for applicant tracking systems with AI assistance." },
  { icon: Target,    title: "Smart Job Matching",   desc: "Get personalized job recommendations based on your skills, experience, and preferences." },
  { icon: Zap,       title: "One-Click Apply",      desc: "Apply to multiple jobs instantly with pre-filled information and saved preferences." },
  { icon: BarChart3, title: "Application Tracking", desc: "Monitor all your applications in one dashboard with real-time status updates." },
  { icon: Users,     title: "Recruiter Insights",   desc: "Understand what recruiters are looking for with AI-powered industry insights." },
]

const STATS = [
  { value: "10,000+", label: "Active Jobs" },
  { value: "5,000+",  label: "Registered Candidates" },
  { value: "2x",      label: "Faster Hiring" },
]

const FOOTER_LINKS = ["About", "Contact", "Privacy Policy", "Terms"]

// ── Internal components ───────────────────────────────────────────────────────

function Navbar() {
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

function Hero() {
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

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">How It Works</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Get started in three simple steps</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {STEPS.map((step, i) => (
            <Card key={i} className="relative overflow-hidden">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </div>
              <CardContent className="pt-8 pb-6 px-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Key Features</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to streamline your job search</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {FEATURES.map((f, i) => (
            <Card key={i} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6 pb-6 px-6">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{s.value}</div>
              <div className="text-sm text-slate-600 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Your Career, Powered by AI
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers and employers already using our platform to achieve their goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-base">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="text-base">Explore Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            © 2026 <span className="font-semibold text-slate-900">JobPortal.AI</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.map(link => (
              <a key={link} href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
