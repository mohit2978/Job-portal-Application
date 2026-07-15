import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, FileText } from "lucide-react"

const STATUS_CONFIG = {
  PENDING:              { label: "Pending",            className: "bg-slate-100 text-slate-600"      },
  REVIEWING:            { label: "Reviewing",          className: "bg-blue-50 text-blue-700"         },
  SHORTLISTED:          { label: "Shortlisted",        className: "bg-purple-50 text-purple-700"     },
  INTERVIEW_SCHEDULED:  { label: "Interview",          className: "bg-indigo-50 text-indigo-700"     },
  HIRED:                { label: "Hired",              className: "bg-green-50 text-green-700"       },
  REJECTED:             { label: "Rejected",           className: "bg-red-50 text-red-600"           },
  WITHDRAWN:            { label: "Withdrawn",          className: "bg-slate-100 text-slate-500"      },
}

function fmtDate(d) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default function RecentApplicationsTable() {
  const { applications, isLoading } = useSelector((s) => s.application)

  const recent = [...applications]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 5)

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Recent Applications</CardTitle>
        <Link to="/employer/applications">
          <Button variant="ghost" size="sm" className="text-brand hover:text-brand/80">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <FileText className="h-8 w-8 mb-2 opacity-40" />
            <p className="text-sm font-medium">No applications yet</p>
            <p className="text-xs mt-0.5">Applications will appear here once candidates apply.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">Candidate</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Job</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Applied</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recent.map((app) => {
                  const cfg = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.PENDING
                  return (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-semibold text-xs shrink-0">
                            {(app.applicantName ?? app.candidateName ?? "?")[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {app.applicantName ?? app.candidateName ?? "Applicant"}
                            </p>
                            <p className="text-xs text-slate-400 truncate">{app.applicantEmail ?? ""}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <p className="text-slate-700 truncate max-w-[180px]">{app.jobTitle ?? "—"}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell text-slate-500 whitespace-nowrap">
                        {fmtDate(app.appliedAt)}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <Link
                          to="/employer/applications"
                          className="text-xs text-brand hover:underline font-medium whitespace-nowrap"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
