import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, ArrowRight, MoreVertical } from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { closeJob } from "@/store/job/jobThunk"

const STATUS_CONFIG = {
  OPEN:   { label: "Open",   className: "bg-green-50 text-green-700 border-green-200"  },
  CLOSED: { label: "Closed", className: "bg-slate-100 text-slate-600 border-slate-200" },
  DRAFT:  { label: "Draft",  className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
}

function timeAgo(date) {
  if (!date) return "—"
  const days = Math.floor((Date.now() - new Date(date)) / 86_400_000)
  if (days === 0) return "Today"
  if (days === 1) return "1 day ago"
  if (days < 7)  return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} wk ago`
  return `${Math.floor(days / 30)} mo ago`
}

export default function ActiveJobsList() {
  const dispatch = useDispatch()
  const { myJobs }       = useSelector((s) => s.job)
  const { applications } = useSelector((s) => s.application)

  const activeJobs = myJobs.filter((j) => j.status === "OPEN").slice(0, 4)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Jobs</CardTitle>
        <Link to="/employer/jobs">
          <Button variant="ghost" size="sm">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {activeJobs.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No active jobs</p>
            <Link to="/employer/jobs/create">
              <Button variant="link" className="mt-2">Create your first job</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {activeJobs.map((job) => {
              const cfg = STATUS_CONFIG[job.status] ?? STATUS_CONFIG.DRAFT
              const appCount = applications.filter((a) => a.jobId === job.id).length
              return (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className="font-semibold text-slate-900 truncate">{job.title}</h4>
                      <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.className}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {[job.city, job.country].filter(Boolean).join(", ") || "Remote"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {timeAgo(job.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {appCount} application{appCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/employer/jobs/${job.id}/edit`}>Edit Job</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/employer/applications?jobId=${job.id}`}>View Applications</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => dispatch(closeJob(job.id))}
                      >
                        Close Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
