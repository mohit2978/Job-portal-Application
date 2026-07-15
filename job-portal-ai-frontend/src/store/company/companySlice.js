import { createSlice } from "@reduxjs/toolkit"
import {
  fetchMyCompany, createCompany, updateCompany,
  addLocation, updateLocation, removeLocation, setHeadquarter,
  fetchAllCompanies, fetchCompanyById,
  verifyCompany, deactivateCompany, deleteCompany,
} from "./companyThunk"

function replaceLocation(state, updatedLoc) {
  if (!state.myCompany) return
  state.myCompany.locations = (state.myCompany.locations || []).map((l) =>
    l.id === updatedLoc.id ? updatedLoc : l
  )
}

const companySlice = createSlice({
  name: "company",
  initialState: {
    myCompany: null,
    isMyCompanyLoading: false,
    companies: [],
    currentCompany: null,
    isLoading: false,
    isActionLoading: false,
    error: null,
    actionError: null,
  },
  reducers: {
    clearCurrentCompany(state) { state.currentCompany = null },
    clearErrors(state) { state.error = null; state.actionError = null },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchMyCompany.pending,   (s) => { s.isMyCompanyLoading = true; s.error = null })
      .addCase(fetchMyCompany.fulfilled, (s, { payload }) => { s.isMyCompanyLoading = false; s.myCompany = payload })
      .addCase(fetchMyCompany.rejected,  (s, { payload }) => { s.isMyCompanyLoading = false; s.error = payload })

    builder
      .addCase(createCompany.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(createCompany.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.myCompany = payload })
      .addCase(createCompany.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(updateCompany.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(updateCompany.fulfilled, (s, { payload }) => {
        s.isActionLoading = false
        s.myCompany = payload
        const idx = s.companies.findIndex((c) => c.id === payload.id)
        if (idx !== -1) s.companies[idx] = payload
      })
      .addCase(updateCompany.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(addLocation.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(addLocation.fulfilled, (s, { payload }) => {
        s.isActionLoading = false
        if (s.myCompany) s.myCompany.locations = [...(s.myCompany.locations || []), payload]
      })
      .addCase(addLocation.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(updateLocation.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(updateLocation.fulfilled, (s, { payload }) => { s.isActionLoading = false; replaceLocation(s, payload) })
      .addCase(updateLocation.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(removeLocation.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(removeLocation.fulfilled, (s, { payload: locId }) => {
        s.isActionLoading = false
        if (s.myCompany) s.myCompany.locations = (s.myCompany.locations || []).filter((l) => l.id !== locId)
      })
      .addCase(removeLocation.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(setHeadquarter.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(setHeadquarter.fulfilled, (s, { payload }) => {
        s.isActionLoading = false
        if (s.myCompany) {
          s.myCompany.locations = (s.myCompany.locations || []).map((l) => ({
            ...l,
            isHeadquarter: l.id === payload.id ? payload.isHeadquarter : false,
          }))
        }
      })
      .addCase(setHeadquarter.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(fetchAllCompanies.pending,   (s) => { s.isLoading = true; s.error = null })
      .addCase(fetchAllCompanies.fulfilled, (s, { payload }) => { s.isLoading = false; s.companies = payload })
      .addCase(fetchAllCompanies.rejected,  (s, { payload }) => { s.isLoading = false; s.error = payload })

    builder
      .addCase(fetchCompanyById.pending,   (s) => { s.isLoading = true; s.error = null })
      .addCase(fetchCompanyById.fulfilled, (s, { payload }) => { s.isLoading = false; s.currentCompany = payload })
      .addCase(fetchCompanyById.rejected,  (s, { payload }) => { s.isLoading = false; s.error = payload })

    builder
      .addCase(verifyCompany.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(verifyCompany.fulfilled, (s, { payload }) => {
        s.isActionLoading = false
        const idx = s.companies.findIndex((c) => c.id === payload.id)
        if (idx !== -1) s.companies[idx] = payload
        if (s.currentCompany?.id === payload.id) s.currentCompany = payload
      })
      .addCase(verifyCompany.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(deactivateCompany.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(deactivateCompany.fulfilled, (s, { payload }) => {
        s.isActionLoading = false
        const idx = s.companies.findIndex((c) => c.id === payload.id)
        if (idx !== -1) s.companies[idx] = payload
        if (s.currentCompany?.id === payload.id) s.currentCompany = payload
      })
      .addCase(deactivateCompany.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    builder
      .addCase(deleteCompany.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(deleteCompany.fulfilled, (s, { payload: deletedId }) => {
        s.isActionLoading = false
        s.companies = s.companies.filter((c) => c.id !== deletedId)
        if (s.currentCompany?.id === deletedId) s.currentCompany = null
      })
      .addCase(deleteCompany.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })
  },
})

export const { clearCurrentCompany, clearErrors } = companySlice.actions
export default companySlice.reducer
