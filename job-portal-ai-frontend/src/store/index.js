import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./user/userAuth"
import applicationReducer from "./application/applicationSlice"
import savedJobReducer from "./savedJob/savedJobSlice"
import resumeReducer from "./resume/resumeSlice"
import aiReducer from "./ai/aiSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    savedJob: savedJobReducer,
    resume: resumeReducer,
    ai: aiReducer,
  }
})

export default store
