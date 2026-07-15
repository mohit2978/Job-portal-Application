import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { SlidersHorizontal, X } from "lucide-react"

const JOB_TYPES  = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]
const WORK_MODES = ["REMOTE", "HYBRID", "ON_SITE"]
const EXP_LEVELS = ["ENTRY_LEVEL", "JUNIOR", "MID_LEVEL", "SENIOR_LEVEL", "LEAD", "EXECUTIVE"]

function label(v) {
  return v.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function fmtSalary(n) {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`
  return `$${n}`
}

/**
 * JobFilters Component
 * Renders a sticky filter sidebar that permits applicants to filter job listings by job type,
 * work mode, experience level, and a dynamic salary range slider. Supports batch-resetting.
 */
export default function JobFilters({ filters, setFilters, onReset }) {
  const { jobTypes, workModes, expLevels, minSalary, maxSalary } = filters

  const activeCount =
    jobTypes.length + workModes.length + expLevels.length +
    (minSalary > 0 ? 1 : 0) + (maxSalary < 200000 ? 1 : 0)

  function toggle(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }))
  }

  return (
    <Card className="sticky top-20 border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <CardTitle className="text-base">Filters</CardTitle>
          </div>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset} className="h-7 text-xs text-slate-500 hover:text-red-600">
              <X className="h-3.5 w-3.5 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Active filter name badges */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              ...jobTypes.map(v  => ({ key: "jobTypes",  value: v })),
              ...workModes.map(v => ({ key: "workModes", value: v })),
              ...expLevels.map(v => ({ key: "expLevels", value: v })),
            ].map(({ key, value }) => (
              <Badge key={`${key}-${value}`} className="bg-green-100 text-green-700 gap-1 pr-1 text-xs font-medium">
                {label(value)}
                <button onClick={() => toggle(key, value)} className="rounded-full hover:bg-green-200 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-5 pt-0">

        {/* Job Type */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">Job Type</p>
          <div className="space-y-2">
            {JOB_TYPES.map(v => (
              <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={jobTypes.includes(v)}
                  onChange={() => toggle("jobTypes", v)} className="rounded accent-green-500" />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">{label(v)}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Work Mode */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">Work Mode</p>
          <div className="space-y-2">
            {WORK_MODES.map(v => (
              <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={workModes.includes(v)}
                  onChange={() => toggle("workModes", v)} className="rounded accent-green-500" />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">{label(v)}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2.5">Experience Level</p>
          <div className="space-y-2">
            {EXP_LEVELS.map(v => (
              <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={expLevels.includes(v)}
                  onChange={() => toggle("expLevels", v)} className="rounded accent-green-500" />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">{label(v)}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Salary Range */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Salary Range</p>
            <span className="text-xs text-green-600 font-medium">
              {fmtSalary(minSalary)} – {fmtSalary(maxSalary)}
            </span>
          </div>
          <Slider
            min={0}
            max={200000}
            step={10000}
            value={[minSalary, maxSalary]}
            onValueChange={([min, max]) => setFilters(f => ({ ...f, minSalary: min, maxSalary: max }))}
            className="w-full [&_[data-slot=slider-range]]:bg-green-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1.5">
            <span>$0</span>
            <span>$200k+</span>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
