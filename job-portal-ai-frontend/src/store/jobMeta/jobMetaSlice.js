import { createSlice } from "@reduxjs/toolkit"
import {
  fetchCategories, createCategory, updateCategory, deleteCategory,
  fetchSkills,     createSkill,    updateSkill,    deleteSkill,
  fetchTags,       createTag,      updateTag,      deleteTag,
} from "./jobMetaThunk"

function replaceById(list, updated) {
  return list.map((item) => (item.id === updated.id ? updated : item))
}

const jobMetaSlice = createSlice({
  name: "jobMeta",
  initialState: {
    categories: [],
    skills: [],
    tags: [],
    isLoadingCategories: false,
    isLoadingSkills: false,
    isLoadingTags: false,
    isActionLoading: false,
    error: null,
    actionError: null,
  },
  reducers: {
    clearErrors(state) { state.error = null; state.actionError = null },
  },
  extraReducers: (builder) => {

    // ── Categories ────────────────────────────────────────────────────────────
    builder
      .addCase(fetchCategories.pending,   (s) => { s.isLoadingCategories = true; s.error = null })
      .addCase(fetchCategories.fulfilled, (s, { payload }) => { s.isLoadingCategories = false; s.categories = payload })
      .addCase(fetchCategories.rejected,  (s, { payload }) => { s.isLoadingCategories = false; s.error = payload })

      .addCase(createCategory.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(createCategory.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.categories.unshift(payload) })
      .addCase(createCategory.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

      .addCase(updateCategory.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(updateCategory.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.categories = replaceById(s.categories, payload) })
      .addCase(updateCategory.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

      .addCase(deleteCategory.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(deleteCategory.fulfilled, (s, { payload: id }) => { s.isActionLoading = false; s.categories = s.categories.filter((c) => c.id !== id) })
      .addCase(deleteCategory.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    // ── Skills ────────────────────────────────────────────────────────────────
    builder
      .addCase(fetchSkills.pending,   (s) => { s.isLoadingSkills = true; s.error = null })
      .addCase(fetchSkills.fulfilled, (s, { payload }) => { s.isLoadingSkills = false; s.skills = payload })
      .addCase(fetchSkills.rejected,  (s, { payload }) => { s.isLoadingSkills = false; s.error = payload })

      .addCase(createSkill.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(createSkill.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.skills.unshift(payload) })
      .addCase(createSkill.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

      .addCase(updateSkill.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(updateSkill.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.skills = replaceById(s.skills, payload) })
      .addCase(updateSkill.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

      .addCase(deleteSkill.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(deleteSkill.fulfilled, (s, { payload: id }) => { s.isActionLoading = false; s.skills = s.skills.filter((sk) => sk.id !== id) })
      .addCase(deleteSkill.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

    // ── Tags ──────────────────────────────────────────────────────────────────
    builder
      .addCase(fetchTags.pending,   (s) => { s.isLoadingTags = true; s.error = null })
      .addCase(fetchTags.fulfilled, (s, { payload }) => { s.isLoadingTags = false; s.tags = payload })
      .addCase(fetchTags.rejected,  (s, { payload }) => { s.isLoadingTags = false; s.error = payload })

      .addCase(createTag.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(createTag.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.tags.unshift(payload) })
      .addCase(createTag.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

      .addCase(updateTag.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(updateTag.fulfilled, (s, { payload }) => { s.isActionLoading = false; s.tags = replaceById(s.tags, payload) })
      .addCase(updateTag.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })

      .addCase(deleteTag.pending,   (s) => { s.isActionLoading = true; s.actionError = null })
      .addCase(deleteTag.fulfilled, (s, { payload: id }) => { s.isActionLoading = false; s.tags = s.tags.filter((t) => t.id !== id) })
      .addCase(deleteTag.rejected,  (s, { payload }) => { s.isActionLoading = false; s.actionError = payload })
  },
})

export const { clearErrors } = jobMetaSlice.actions
export default jobMetaSlice.reducer
