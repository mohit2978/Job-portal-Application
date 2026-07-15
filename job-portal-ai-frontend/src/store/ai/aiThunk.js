import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"

export const generateCoverLetter = createAsyncThunk(
  "ai/generateCoverLetter",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/application/cover-letter", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate cover letter")
    }
  }
)

export const scoreCandidate = createAsyncThunk(
  "ai/scoreCandidate",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/application/screening-score", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to score candidate")
    }
  }
)

export const generateInterviewQuestions = createAsyncThunk(
  "ai/generateInterviewQuestions",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/application/interview-questions", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate interview questions")
    }
  }
)

export const analyzeSkillsGap = createAsyncThunk(
  "ai/analyzeSkillsGap",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/application/skills-gap", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to analyze skills gap")
    }
  }
)

export const summarizeNotes = createAsyncThunk(
  "ai/summarizeNotes",
  async (notes, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/application/summarize-notes", notes)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to summarize notes")
    }
  }
)

export const generateResumeSummary = createAsyncThunk(
  "ai/generateResumeSummary",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/resume/summary", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate resume summary")
    }
  }
)

export const generateExperienceBullets = createAsyncThunk(
  "ai/generateExperienceBullets",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/resume/experience-bullets", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate bullet points")
    }
  }
)

export const parseResumeText = createAsyncThunk(
  "ai/parseResumeText",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/resume/parse", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to parse resume")
    }
  }
)

export const getResumeImprovements = createAsyncThunk(
  "ai/getResumeImprovements",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/resume/improvements", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to get improvement suggestions")
    }
  }
)

export const getCareerFeedback = createAsyncThunk(
  "ai/getCareerFeedback",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/resume/career-feedback", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to get career feedback")
    }
  }
)

export const generateJobDescription = createAsyncThunk(
  "ai/generateJobDescription",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/job/describe", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate job description")
    }
  }
)

export const generateJobRequirements = createAsyncThunk(
  "ai/generateJobRequirements",
  async ({ title, category }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/ai/job/requirements", { params: { title, category } })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate job requirements")
    }
  }
)

export const suggestSalary = createAsyncThunk(
  "ai/suggestSalary",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/job/salary-suggestion", payload)
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to suggest salary")
    }
  }
)

export const recommendJobSkills = createAsyncThunk(
  "ai/recommendJobSkills",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/ai/job/skills-recommendation", { params: { title, description } })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to recommend skills")
    }
  }
)

export const generateJobResponsibilities = createAsyncThunk(
  "ai/generateJobResponsibilities",
  async ({ title, category }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/ai/job/responsibilities", { params: { title, category } })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate responsibilities")
    }
  }
)

export const generateJobBenefits = createAsyncThunk(
  "ai/generateJobBenefits",
  async ({ title, category, jobType }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/ai/job/benefits", { params: { title, category, jobType } })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate benefits")
    }
  }
)

export const recommendJobTags = createAsyncThunk(
  "ai/recommendJobTags",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/ai/job/tags-recommendation", { params: { title, description } })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to recommend tags")
    }
  }
)

export const enhanceSearch = createAsyncThunk(
  "ai/enhanceSearch",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/ai/search/enhance", { query })
      return data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to enhance search")
    }
  }
)
