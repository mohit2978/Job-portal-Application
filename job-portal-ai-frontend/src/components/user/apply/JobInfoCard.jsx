import { Building2, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function JobInfoCard({ job }) {
  const location = [job?.city, job?.state, job?.country].filter(Boolean).join(", ")

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
            <Building2 className="h-7 w-7 text-slate-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-0.5">Apply for {job?.title}</h1>
            <div className="flex items-center gap-2 flex-wrap text-slate-600 text-sm">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
