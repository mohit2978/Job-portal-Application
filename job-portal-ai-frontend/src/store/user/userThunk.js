import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api"

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials)
      if (response.data.jwt) localStorage.setItem("accessToken", response.data.jwt)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed. Please try again.")
    }
  }
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", userData)
      if (response.data.jwt) localStorage.setItem("accessToken", response.data.jwt)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed. Please try again.")
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile")
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user profile.")
    }
  }
)

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const { data: res } = await api.put("/api/users/profile", data)
      return res
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update profile")
    }
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/forgot-password", { email })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset link.")
    }
  }
)

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-password", { token, password })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to reset password.")
    }
  }
)
