import { createSlice } from "@reduxjs/toolkit"
import {
  loginUser, registerUser, fetchCurrentUser,
  updateProfile, forgotPassword, resetPassword,
} from "./userThunk"

const initialState = {
  user: null,
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: false,
  authStatus: "idle",
  isLoading: false,
  profileSaving: false,
  profileError: null,
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.authStatus = "unauthenticated"
      state.error = null
      localStorage.removeItem("accessToken")
    },
    resetError: (state) => { state.error = null },
    resetForgotPasswordSuccess: (state) => { state.forgotPasswordSuccess = false },
    resetResetPasswordSuccess: (state) => { state.resetPasswordSuccess = false },
  },
  extraReducers: (builder) => {

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.authStatus = "loading"
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.authStatus = "authenticated"
        state.user = action.payload.user
        state.token = action.payload.jwt
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.authStatus = "unauthenticated"
        state.error = action.payload
      })

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.authStatus = "loading"
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.authStatus = "authenticated"
        state.user = action.payload.user
        state.token = action.payload.jwt
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.authStatus = "unauthenticated"
        state.error = action.payload
      })

    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
        state.authStatus = "loading"
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.authStatus = "authenticated"
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.authStatus = "unauthenticated"
        state.user = null
        state.token = null
        localStorage.removeItem("accessToken")
      })

    builder
      .addCase(updateProfile.pending, (state) => {
        state.profileSaving = true
        state.profileError = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileSaving = false
        state.user = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileSaving = false
        state.profileError = action.payload
      })

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.forgotPasswordSuccess = false
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false
        state.forgotPasswordSuccess = true
        state.error = null
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.forgotPasswordSuccess = false
      })

    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.resetPasswordSuccess = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
        state.resetPasswordSuccess = true
        state.error = null
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.resetPasswordSuccess = false
      })
  },
})

export const { logout, resetError, resetForgotPasswordSuccess, resetResetPasswordSuccess } = authSlice.actions
export default authSlice.reducer
