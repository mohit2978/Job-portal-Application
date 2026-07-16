import { createSlice } from "@reduxjs/toolkit"
import { fetchAllUsers, suspendUser, activateUser, deleteUser, changeUserRole } from "./adminUserThunk"

function replaceUser(users, updated) {
  return users.map(u => u.id === updated.id ? updated : u)
}

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: {
    users: [],
    isLoading: false,
    isActionLoading: false,
    error: null,
    actionError: null,
  },
  reducers: {
    clearErrors(state) {
      state.error = null
      state.actionError = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending,   s => { s.isLoading = true; s.error = null })
      .addCase(fetchAllUsers.fulfilled, (s, { payload }) => { s.isLoading = false; s.users = payload })
      .addCase(fetchAllUsers.rejected,  (s, { payload }) => { s.isLoading = false; s.error = payload })

    builder
      .addCase(suspendUser.pending,   s => { s.isActionLoading = true; s.actionError = null })
      .addCase(suspendUser.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.users = replaceUser(s.users, payload) })
      .addCase(suspendUser.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(activateUser.pending,   s => { s.isActionLoading = true; s.actionError = null })
      .addCase(activateUser.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.users = replaceUser(s.users, payload) })
      .addCase(activateUser.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(deleteUser.pending,   s => { s.isActionLoading = true; s.actionError = null })
      .addCase(deleteUser.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.users = replaceUser(s.users, payload) })
      .addCase(deleteUser.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(changeUserRole.pending,   s => { s.isActionLoading = true; s.actionError = null })
      .addCase(changeUserRole.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.users = replaceUser(s.users, payload) })
      .addCase(changeUserRole.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })
  },
})

export const { clearErrors } = adminUserSlice.actions
export default adminUserSlice.reducer
