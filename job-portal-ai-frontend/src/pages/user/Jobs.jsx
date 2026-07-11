import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Briefcase, TrendingUp, X, ChevronLeft, ChevronRight,
  Wand2, SlidersHorizontal, Search, MapPin, Clock, Users,
} from "lucide-react"

const MOCK_JOBS = [
  {
    id: 1, title: "Senior React Developer", companyName: "TechCorp",
    city: "Bangalore", state: "Karnataka", jobType: "FULL_TIME",
    workMode: "REMOTE", experienceLevel: "SENIOR",
    minSalary: 1500000, maxSalary: 2500000,
    applicationCount: 34, openings: 2,
    applicationDeadline: "2026-08-15",
    skills: [{ name: "React" }, { name: "TypeScript" }, { name: "Redux" }],
    createdAt: "2026-07-01T10:00:00",
  },
  {
    id: 2, title: "Backend Java Engineer", companyName: "Infosys",
    city: "Pune", state: "Maharashtra", jobType: "FULL_TIME",
    workMode: "HYBRID", experienceLevel: "MID",
    minSalary: 800000, maxSalary: 1400000,
    applicationCount: 12, openings: 5,
    applicationDeadline: "2026-08-20",
    skills: [{ name: "Java" }, { name: "Spring Boot" }, { name: "Kafka" }],
    createdAt: "2026-07-03T10:00:00",
  },
  {
    id: 3, title: "Frontend Developer Intern", companyName: "Startup XYZ",
    city: "Mumbai", state: "Maharashtra", jobType: "INTERNSHIP",
    workMode: "ON_SITE", experienceLevel: "ENTRY",
    minSalary: 200000, maxSalary: 400000,
    applicationCount: 78, openings: 1,
    applicationDeadline: "2026-07-30",
    skills: [{ name: "React" }, { name: "CSS" }],
    createdAt: "2026-07-05T10:00:00",
  },
  {
    id: 4, title: "DevOps Engineer", companyName: "CloudBase",
    city: "Hyderabad", state: "Telangana", jobType: "FULL_TIME",
    workMode: "REMOTE", experienceLevel: "SENIOR",
    minSalary: 1800000, maxSalary: 2800000,
    applicationCount: 9, openings: 3,
    applicationDeadline: "2026-09-01",
    skills: [{ name: "Docker" }, { name: "Kubernetes" }, { name: "AWS" }],
    createdAt: "2026-07-06T10:00:00",
  },
  {
    id: 5, title: "Data Analyst", companyName: "Analytics Co",
    city: "Chennai", state: "Tamil Nadu", jobType: "CONTRACT",
    workMode: "HYBRID", experienceLevel: "MID",
    minSalary: 700000, maxSalary: 1100000,
    applicationCount: 21, openings: 2,
    applicationDeadline: "2026-08-10",
    skills: [{ name: "Python" }, { name: "SQL" }, { name: "Power BI" }],
    createdAt: "2026-07-07T10:00:00",
  },
  {
    id: 6, title: "Full Stack Developer", companyName: "WebWorks",
    city: "Delhi", state: "Delhi", jobType: "FULL_TIME",
    workMode: "ON_SITE", experienceLevel: "MID",
    minSalary: 900000, maxSalary: 1600000,
    applicationCount: 45, openings: 4,
    applicationDeadline: "2026-08-25",
    skills: [{ name: "Node.js" }, { name: "React" }, { name: "MongoDB" }],
    createdAt: "2026-07-08T10:00:00",
  },
]

const JOBS_PER_PAGE = 4
const JOB_TYPES  = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]
const WORK_MODES = ["REMOTE", "HYBRID", "ON_SITE"]
const EXP_LEVELS = ["ENTRY", "MID", "SENIOR"]

const SORT_OPTIONS = [
  { value: "newest",       label: "Newest first" },
  { value: "salary-high",  label: "Salary: high → low" },
  { value: "salary-low",   label: "Salary: low → high" },
  { value: "most-applied", label: "Most applied" },
]

const DEFAULT_FILTERS = {
  jobTypes: [], workModes: [], expLevels: [],
  minSalary: 0, maxSalary: 9999999,
}

function label(v) {
  return v.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function fmtSalary(val) {
  if (!val) return null
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(val)
}

function sortJobs(jobs, sortBy) {
  const arr = [...jobs]
  if (sortBy === "salary-high")  return arr.sort((a, b) => (b.maxSalary ?? 0) - (a.maxSalary ?? 0))
  if (sortBy === "salary-low")   return arr.sort((a, b) => (a.minSalary ?? 0) - (b.minSalary ?? 0))
  if (sortBy === "most-applied") return arr.sort((a, b) => (b.applicationCount ?? 0) - (a.applicationCount ?? 0))
  return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

function JobCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function JobCard({ job }) {
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

function JobFilters({ filters, setFilters, onReset }) {
  function toggle(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }))
  }

  return (
    <Card className="sticky top-4">
      <CardContent className="p-4 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Filters</h3>
          <button onClick={onReset} className="text-xs text-blue-500 hover:underline">Reset</button>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Job Type</p>
          {JOB_TYPES.map(v => (
            <label key={v} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={filters.jobTypes.includes(v)}
                onChange={() => toggle("jobTypes", v)} className="rounded" />
              <span className="text-sm text-slate-700">{label(v)}</span>
            </label>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Work Mode</p>
          {WORK_MODES.map(v => (
            <label key={v} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={filters.workModes.includes(v)}
                onChange={() => toggle("workModes", v)} className="rounded" />
              <span className="text-sm text-slate-700">{label(v)}</span>
            </label>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Experience</p>
          {EXP_LEVELS.map(v => (
            <label key={v} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={filters.expLevels.includes(v)}
                onChange={() => toggle("expLevels", v)} className="rounded" />
              <span className="text-sm text-slate-700">{label(v)}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Jobs() {
  const jobs      = MOCK_JOBS
  const isLoading = false
  const error     = null

  const [aiQuery, setAiQuery]         = useState("")
  const [keyword, setKeyword]         = useState("")
  const [filters, setFilters]         = useState(DEFAULT_FILTERS)
  const [sortBy, setSortBy]           = useState("newest")
  const [page, setPage]               = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const filteredSorted = useMemo(() => {
    let result = jobs.filter(job => {
      if (filters.jobTypes.length  > 0 && !filters.jobTypes.includes(job.jobType))          return false
      if (filters.workModes.length > 0 && !filters.workModes.includes(job.workMode))         return false
      if (filters.expLevels.length > 0 && !filters.expLevels.includes(job.experienceLevel)) return false
      if (filters.minSalary > 0 && job.maxSalary != null && job.maxSalary < filters.minSalary) return false
      if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase()) &&
          !job.companyName.toLowerCase().includes(keyword.toLowerCase())) return false
      return true
    })
    return sortJobs(result, sortBy)
  }, [jobs, filters, sortBy, keyword])

  const totalPages    = Math.max(1, Math.ceil(filteredSorted.length / JOBS_PER_PAGE))
  const paginatedJobs = filteredSorted.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE)
  const activeFilterCount = filters.jobTypes.length + filters.workModes.length + filters.expLevels.length

  function handleReset() {
    setFilters(DEFAULT_FILTERS)
    setKeyword("")
    setSortBy("newest")
    setPage(1)
    setAiQuery("")
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-blue-100 mb-8 text-sm">
            Discover thousands of jobs matched to your skills
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-4 space-y-3">
            <div className="relative">
              <Wand2 className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <textarea
                rows={2}
                placeholder={'Describe your ideal job...\ne.g. "remote senior React developer, full-time, above 15 LPA"'}
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">AI search — coming soon</p>
              <Button disabled className="rounded-xl px-6">
                <Wand2 className="h-4 w-4 mr-1.5" />
                Search with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {isLoading ? "Loading..." : `${filteredSorted.length} jobs found`}
              </p>
            </div>
            {activeFilterCount > 0 && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer" onClick={handleReset}>
                <X className="h-3 w-3 mr-1" />
                {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={keyword}
                onChange={e => { setKeyword(e.target.value); setPage(1) }}
                className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-slate-400" />
              <Select value={sortBy} onValueChange={v => { setSortBy(v); setPage(1) }}>
                <SelectTrigger className="w-44 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4 mr-1.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <JobFilters
              filters={filters}
              setFilters={f => { setFilters(f); setPage(1) }}
              onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1) }}
            />
          </div>

          <div className="lg:col-span-3 space-y-3">

            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <p className="text-red-700 font-medium mb-2">Failed to load jobs</p>
                  <Button variant="outline" size="sm">Try again</Button>
                </CardContent>
              </Card>
            )}

            {isLoading && Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)}

            {!isLoading && !error && filteredSorted.length === 0 && (
              <Card>
                <CardContent className="p-14 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">No jobs found</h3>
                  <p className="text-sm text-slate-500 mb-5">Try clearing some filters</p>
                  <Button onClick={handleReset} variant="outline">
                    <X className="h-4 w-4 mr-1.5" />
                    Reset everything
                  </Button>
                </CardContent>
              </Card>
            )}

            {!isLoading && paginatedJobs.map(job => <JobCard key={job.id} job={job} />)}

            {!isLoading && filteredSorted.length > JOBS_PER_PAGE && (
              <div className="flex items-center justify-center gap-1 pt-4">
                <Button variant="outline" size="sm" disabled={page === 1}
                  onClick={() => setPage(p => p - 1)} className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Button key={p} variant={page === p ? "default" : "outline"}
                    size="sm" onClick={() => setPage(p)} className="h-8 w-8 p-0">
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="sm" disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)} className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="text-xs text-slate-400 ml-2">Page {page} of {totalPages}</span>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
