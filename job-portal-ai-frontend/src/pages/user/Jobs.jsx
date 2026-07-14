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
  Wand2, SlidersHorizontal, Search, Sparkles,
} from "lucide-react"
import JobCard from "@/components/user/jobs/JobCard"
import JobFilters from "@/components/user/jobs/JobFilters"
import rawJobs from "@/data/jobs.json"
import SKILLS from "@/data/jobSkills.json"

// Add id (1-based) and resolve skillIds → skill objects to match backend shape
const JOBS = rawJobs.map((job, i) => ({
  ...job,
  id: i + 1,
  skills: (job.skillIds ?? []).map(id => SKILLS[id - 1]).filter(Boolean),
}))

const JOBS_PER_PAGE = 4

const SORT_OPTIONS = [
  { value: "newest",      label: "Newest first" },
  { value: "salary-high", label: "Salary: high → low" },
  { value: "salary-low",  label: "Salary: low → high" },
  { value: "openings",    label: "Most openings" },
]

const DEFAULT_FILTERS = {
  jobTypes: [], workModes: [], expLevels: [],
  minSalary: 0, maxSalary: 200000,
}

function sortJobs(jobs, sortBy) {
  const arr = [...jobs]
  if (sortBy === "salary-high") return arr.sort((a, b) => (b.maxSalary ?? 0) - (a.maxSalary ?? 0))
  if (sortBy === "salary-low")  return arr.sort((a, b) => (a.minSalary ?? 0) - (b.minSalary ?? 0))
  if (sortBy === "openings")    return arr.sort((a, b) => (b.openings ?? 0) - (a.openings ?? 0))
  return arr.sort((a, b) => new Date(b.applicationDeadline) - new Date(a.applicationDeadline))
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

export default function Jobs() {
  const jobs      = JOBS
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
      if (filters.maxSalary < 200000 && job.minSalary != null && job.minSalary > filters.maxSalary) return false
      if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase()) &&
          ![job.city, job.state, job.country].filter(Boolean).join(" ").toLowerCase().includes(keyword.toLowerCase())) return false
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
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered Job Search
          </div>
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

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Controls row: job count + search input + sort dropdown + mobile filter button ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

          {/* Left: job count + active filter badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {isLoading ? "Loading..." : `${filteredSorted.length} jobs found`}
              </p>
            </div>
            {/* Active filter count badge — click to reset all */}
            {activeFilterCount > 0 && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer" onClick={handleReset}>
                <X className="h-3 w-3 mr-1" />
                {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          {/* Right: keyword search + sort dropdown + mobile filters toggle */}
          <div className="flex items-center gap-2">

            {/* Keyword search input */}
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

            {/* Sort dropdown */}
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

            {/* Mobile: show/hide filters button (hidden on lg+) */}
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

        {/* ── Main grid: sidebar filters (col 1) + job list (col 2-4) ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar filters — hidden on mobile unless showFilters=true */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <JobFilters
              filters={filters}
              setFilters={f => { setFilters(f); setPage(1) }}
              onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1) }}
            />
          </div>

          {/* Job list column */}
          <div className="lg:col-span-3 space-y-3">

            {/* Error state */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6 text-center">
                  <p className="text-red-700 font-medium mb-2">Failed to load jobs</p>
                  <Button variant="outline" size="sm">Try again</Button>
                </CardContent>
              </Card>
            )}

            {/* Loading state — skeleton cards */}
            {isLoading && Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)}

            {/* Empty state — no jobs match filters */}
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

            {/* Job cards — current page slice */}
            {!isLoading && paginatedJobs.map(job => <JobCard key={job.id} job={job} filters={filters} />)}

            {/* Pagination */}
            {!isLoading && filteredSorted.length > JOBS_PER_PAGE && (
              <div className="flex items-center justify-center gap-1 pt-4">
                {/* Prev button */}
                <Button variant="outline" size="sm" disabled={page === 1}
                  onClick={() => setPage(p => p - 1)} className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page number buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Button key={p} variant={page === p ? "default" : "outline"}
                    size="sm" onClick={() => setPage(p)} className="h-8 w-8 p-0">
                    {p}
                  </Button>
                ))}

                {/* Next button */}
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
