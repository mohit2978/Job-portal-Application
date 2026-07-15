import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Briefcase, Users, CheckCircle, TrendingUp,
  Plus, Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatsCard from "@/components/employer/dashboard/StatsCard"
import ActiveJobsList from "@/components/employer/dashboard/ActiveJobsList"
import RecentApplicationsTable from "@/components/employer/dashboard/RecentApplicationsTable"
import { fetchMyJobs } from "@/store/job/jobThunk"
import { fetchCompanyApplications } from "@/store/application/applicationThunk"

const AI_INSIGHTS = [
  "Based on your job descriptions, candidates with React + TypeScript skills have 2× higher acceptance rates.",
  "3 of your recent applicants match the profile of your last 5 successful hires.",
  "Adding salary ranges to job postings increases applicant quality by ~40%.",
]

const QUICK_ACTIONS = [
  { label: "Post a New Job",          to: "/employer/jobs/create",   icon: Plus,       className: "bg-brand text-white hover:bg-brand/90" },
  { label: "View All Applications",   to: "/employer/applications",  icon: Users,      className: "bg-slate-900 text-white hover:bg-slate-800" },
  { label: "Update Company Profile",  to: "/employer/company",       icon: TrendingUp, className: "border border-slate-300 text-slate-700 hover:bg-slate-50" },
]

export default function EmployerDashboard() {
  const dispatch = useDispatch()

  const { myJobs, jobsLoading }     = useSelector((s) => s.job)
  const { applications, isLoading } = useSelector((s) => s.application)

  useEffect(() => {
    dispatch(fetchMyJobs())
    dispatch(fetchCompanyApplications({ filters: {} }))
  }, [dispatch])

  const totalJobs   = myJobs.length
  const activeJobs  = myJobs.filter((j) => j.status === "OPEN").length
  const totalApps   = applications.length
  const shortlisted = applications.filter((a) => a.status === "SHORTLISTED").length
  const loading     = jobsLoading || isLoading

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Here's what's happening with your hiring today.</p>
        </div>
        <Link to="/employer/jobs/create">
          <Button className="gap-2 bg-brand hover:bg-brand/90">
            <Plus className="h-4 w-4" /> Post a Job
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Jobs"   value={totalJobs}   icon={Briefcase}   loading={loading} />
        <StatsCard title="Active Jobs"  value={activeJobs}  icon={TrendingUp}  loading={loading} />
        <StatsCard title="Applications" value={totalApps}   icon={Users}       loading={loading} />
        <StatsCard title="Shortlisted"  value={shortlisted} icon={CheckCircle} loading={loading} />
      </div>

      {/* AI Insights */}
      <Card className="border-brand/20 bg-gradient-to-br from-brand/5 to-violet-50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4 text-brand" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {AI_INSIGHTS.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentApplicationsTable />
        </div>
        <div>
          <ActiveJobsList />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.to} to={action.to}>
                  <Button className={`gap-2 ${action.className}`} variant="outline">
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
