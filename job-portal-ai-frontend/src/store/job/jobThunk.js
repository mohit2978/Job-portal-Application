import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const clean = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== null && v !== undefined && v !== "")
      )
      const { data } = await api.get("/api/jobs", { params: clean })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch jobs")
    }
  }
)

export const fetchMyJobs = createAsyncThunk(
  "job/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/jobs/my")
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch jobs")
    }
  }
)

export const fetchJobById = createAsyncThunk(
  "job/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/jobs/${id}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch job")
    }
  }
)

export const createJob = createAsyncThunk(
  "job/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/jobs", payload)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create job")
    }
  }
)

export const updateJob = createAsyncThunk(
  "job/update",
  async ({ id, ...payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/jobs/${id}`, payload)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update job")
    }
  }
)

export const publishJob = createAsyncThunk(
  "job/publish",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/jobs/${id}/publish`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to publish job")
    }
  }
)

export const closeJob = createAsyncThunk(
  "job/close",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/jobs/${id}/close`)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to close job")
    }
  }
)

export const fetchAllJobsAdmin = createAsyncThunk(
  "job/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/jobs/admin")
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch jobs")
    }
  }
)

export const deleteJob = createAsyncThunk(
  "job/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/jobs/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete job")
    }
  }
)
