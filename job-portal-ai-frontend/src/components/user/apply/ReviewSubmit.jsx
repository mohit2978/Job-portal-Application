import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

/**
 * ReviewSubmit Component
 * Displays a compilation of all inputs gathered in previous steps of the application wizard,
 * allowing the candidate to verify their selected resume, cover letter, and additional details before final submission.
 */
export default function ReviewSubmit({ resume, resumes, coverLetter, expectedSalary, availableFrom, job }) {
  const selectedResumeTitle = resumes.find((r) => r.id.toString() === resume)?.title ?? `Resume #${resume}`
  const location = [job?.city, job?.state, job?.country].filter(Boolean).join(", ")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Your Application</h2>
        <p className="text-slate-600">Please review all information before submitting</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Position</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center justify-between">
              <span className="text-slate-600">Job Title:</span>
              <span className="font-medium text-slate-900">{job?.title}</span>
            </p>
            {location && (
              <p className="flex items-center justify-between">
                <span className="text-slate-600">Location:</span>
                <span className="font-medium text-slate-900 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {location}
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Resume</h3>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-900">{selectedResumeTitle}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Cover Letter</h3>
          <div className="p-4 bg-slate-50 rounded-lg max-h-48 overflow-y-auto">
            <p className="text-sm text-slate-700 whitespace-pre-line">
              {coverLetter || "No cover letter provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Additional Details</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center justify-between">
              <span className="text-slate-600">Expected Salary:</span>
              <span className="font-medium text-slate-900">
                {expectedSalary ? `₹ ${Number(expectedSalary).toLocaleString("en-IN")}` : "Not specified"}
              </span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-slate-600">Available From:</span>
              <span className="font-medium text-slate-900">
                {availableFrom
                  ? availableFrom.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                  : "Immediately"}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
