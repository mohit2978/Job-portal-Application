import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock } from "lucide-react"

function label(v) {
  if (!v) return ""
  return v.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function salaryLabel(job) {
  if (job?.salaryDisclosed === false) return "Salary negotiable"
  if (!job?.minSalary) return null

  const fmt = val => new Intl.NumberFormat("en-US", {
    style: "currency", currency: job?.currency ?? "USD", maximumFractionDigits: 0,
  }).format(val)

  const range = `${fmt(job.minSalary)} – ${fmt(job.maxSalary)}`
  return job?.salaryPeriod === "HOURLY" ? `${range}/hr` : range
}

/**
 * JobCard Component
 * Displays a summarized card for a single job listing, including the title, location,
 * classification tags (job type, work mode, experience level), salary details, application deadline, and key skills required.
 */
export default function JobCard({ job, filters = {} }) {
  const { jobTypes = [], workModes = [], expLevels = [] } = filters

  const location = [job?.city, job?.state, job?.country].filter(Boolean).join(", ")
  const salary   = salaryLabel(job)

  return (
    <Link to={`/jobs/${job?.id}`} className="block group">
    <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Briefcase className="h-6 w-6 text-slate-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{job?.title}</h3>

              {/* Location row */}
              {location && (
                <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" />{location}
                </p>
              )}

              {/* Type / mode / level badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {job?.jobType && (
                  <Badge className={`text-xs ${jobTypes.includes(job.jobType) ? "bg-green-100 text-green-700 border-green-200" : "bg-secondary text-secondary-foreground"}`}>
                    {label(job.jobType)}
                  </Badge>
                )}
                {job?.workMode && (
                  <Badge className={`text-xs ${workModes.includes(job.workMode) ? "bg-green-100 text-green-700 border-green-200" : "bg-transparent border border-input text-foreground"}`}>
                    {label(job.workMode)}
                  </Badge>
                )}
                {job?.experienceLevel && (
                  <Badge className={`text-xs ${expLevels.includes(job.experienceLevel) ? "bg-green-100 text-green-700 border-green-200" : "bg-transparent border border-input text-foreground"}`}>
                    {label(job.experienceLevel)}
                  </Badge>
                )}
              </div>

              {/* Salary + openings + deadline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                {salary && (
                  <span className="text-green-600 font-medium">{salary}</span>
                )}
                {job?.openings && (
                  <span>{job.openings} opening{job.openings > 1 ? "s" : ""}</span>
                )}
                {job?.applicationDeadline && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Deadline: {job.applicationDeadline}
                  </span>
                )}
              </div>

              {/* Skill tags */}
              {job?.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {job.skills.slice(0, 4).map(s => (
                    <span key={s.name} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                      {s.name}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="text-xs text-slate-400">+{job.skills.length - 4} more</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <Button size="sm" className="shrink-0" onClick={e => e.preventDefault()}>Apply</Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
