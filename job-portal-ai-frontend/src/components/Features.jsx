import { Card, CardContent } from "@/components/ui/card"
import { FileText, Target, Zap, BarChart3, Users } from "lucide-react"

const FEATURES = [
  { icon: FileText,  title: "AI Resume Builder",    desc: "Create ATS-friendly resumes optimized for applicant tracking systems with AI assistance." },
  { icon: Target,    title: "Smart Job Matching",   desc: "Get personalized job recommendations based on your skills, experience, and preferences." },
  { icon: Zap,       title: "One-Click Apply",      desc: "Apply to multiple jobs instantly with pre-filled information and saved preferences." },
  { icon: BarChart3, title: "Application Tracking", desc: "Monitor all your applications in one dashboard with real-time status updates." },
  { icon: Users,     title: "Recruiter Insights",   desc: "Understand what recruiters are looking for with AI-powered industry insights." },
]

/**
 * Features Component
 * Displays a grid of key platform features (e.g. AI Resume Builder, Smart Job Matching, One-Click Apply)
 * to highlight the system's value proposition to visitors.
 */
export default function Features() {
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
