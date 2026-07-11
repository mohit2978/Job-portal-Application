import { Card, CardContent } from "@/components/ui/card"

const JOB_TYPES  = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]
const WORK_MODES = ["REMOTE", "HYBRID", "ON_SITE"]
const EXP_LEVELS = ["ENTRY", "MID", "SENIOR"]

function label(v) {
  return v.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

export default function JobFilters({ filters, setFilters, onReset }) {
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
