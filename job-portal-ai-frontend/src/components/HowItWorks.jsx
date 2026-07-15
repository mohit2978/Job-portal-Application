import { Card, CardContent } from "@/components/ui/card"
import { UserCircle, Search, Send } from "lucide-react"

const STEPS = [
  { icon: UserCircle, title: "Create your profile",        desc: "Build an AI-optimized resume in minutes with our smart builder." },
  { icon: Search,     title: "Discover relevant jobs",     desc: "Get matched with opportunities that fit your skills and experience." },
  { icon: Send,       title: "Apply & track applications", desc: "Apply with one click and track all your applications in one place." },
]

/**
 * HowItWorks Component
 * Outlines the main steps for candidates using the platform (Create profile, Discover jobs, Apply & track).
 */
export default function HowItWorks() {
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
