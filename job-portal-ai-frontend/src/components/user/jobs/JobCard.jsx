import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Users } from "lucide-react"

function label(v) {
  return v.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function fmtSalary(val) {
  if (!val) return null
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(val)
}

export default function JobCard({ job }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Briefcase className="h-6 w-6 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{job.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{job.companyName}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge variant="secondary" className="text-xs">{label(job.jobType)}</Badge>
                <Badge variant="outline"   className="text-xs">{label(job.workMode)}</Badge>
                <Badge variant="outline"   className="text-xs">{label(job.experienceLevel)}</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.city}, {job.state}
                </span>
                {job.minSalary && (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    {fmtSalary(job.minSalary)} – {fmtSalary(job.maxSalary)}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {job.applicationCount} applied
                </span>
                {job.applicationDeadline && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Deadline: {job.applicationDeadline}
                  </span>
                )}
              </div>

              {job.skills?.length > 0 && (
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
          <Button size="sm" className="shrink-0">Apply</Button>
        </div>
      </CardContent>
    </Card>
  )
}
