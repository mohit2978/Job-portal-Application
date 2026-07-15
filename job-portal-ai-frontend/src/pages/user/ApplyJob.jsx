import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import rawJobs from "@/data/jobs.json"
import SKILLS from "@/data/jobSkills.json"
import TAGS from "@/data/jobTags.json"

import ApplySteps from "@/components/user/apply/ApplySteps"
import SelectResume from "@/components/user/apply/SelectResume"
import CoverLetterEditor from "@/components/user/apply/CoverLetterEditor"
import AdditionalDetails from "@/components/user/apply/QuestionForm"
import ReviewSubmit from "@/components/user/apply/ReviewSubmit"
import SuccessScreen from "@/components/user/apply/SuccessScreen"
import JobInfoCard from "@/components/user/apply/JobInfoCard"

const JOBS = rawJobs.map((job, i) => ({
  ...job,
  id: i + 1,
  skills: (job.skillIds ?? []).map(id => SKILLS[id - 1]).filter(Boolean),
  tags: (job.tagIds ?? []).map(id => TAGS[id - 1]).filter(Boolean),
}))

const MOCK_RESUMES = [
  { id: 1, title: "Full Stack Developer Resume", template: "PROFESSIONAL", isDefault: true },
  { id: 2, title: "Backend Engineer Resume", template: "MODERN", isDefault: false },
  { id: 3, title: "Frontend Developer Resume", template: "MINIMAL", isDefault: false },
]

export default function ApplyJob() {
  const { id } = useParams()
  const navigate = useNavigate()

  const job = JOBS.find(j => j.id === Number(id))

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedResume, setSelectedResume] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [expectedSalary, setExpectedSalary] = useState("")
  const [availableFrom, setAvailableFrom] = useState(null)

  const handleNext = () => {
    if (currentStep === 1 && !selectedResume) {
      toast.error("Please select a resume")
      return
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = () => {
    setCurrentStep(5)
    toast.success("Application submitted successfully!")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <SelectResume selectedResume={selectedResume} setSelectedResume={setSelectedResume} resumes={MOCK_RESUMES} />
      case 2: return <CoverLetterEditor coverLetter={coverLetter} setCoverLetter={setCoverLetter} />
      case 3: return <AdditionalDetails expectedSalary={expectedSalary} setExpectedSalary={setExpectedSalary} availableFrom={availableFrom} setAvailableFrom={setAvailableFrom} />
      case 4: return <ReviewSubmit resume={selectedResume} resumes={MOCK_RESUMES} coverLetter={coverLetter} expectedSalary={expectedSalary} availableFrom={availableFrom} job={job} />
      case 5: return <SuccessScreen job={job} />
      default: return null
    }
  }

  if (currentStep === 5) {
    return <div className="min-h-screen bg-slate-50 py-12">{renderStep()}</div>
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-slate-500">
        Job not found.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={() => navigate(`/jobs/${id}`)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Job
      </Button>

      <JobInfoCard job={job} />

      <ApplySteps currentStep={currentStep} />

      <div className="my-8">{renderStep()}</div>

      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Submit Application
          </Button>
        )}
      </div>
    </div>
  )
}
