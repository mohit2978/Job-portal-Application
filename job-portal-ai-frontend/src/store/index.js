import { configureStore } from "@reduxjs/toolkit"
import authReducer         from "./user/userAuth"
import applicationReducer  from "./application/applicationSlice"
import savedJobReducer     from "./savedJob/savedJobSlice"
import resumeReducer       from "./resume/resumeSlice"
import aiReducer           from "./ai/aiSlice"
import companyReducer      from "./company/companySlice"
import jobReducer          from "./job/jobSlice"
import jobMetaReducer      from "./jobMeta/jobMetaSlice"
import subscriptionReducer from "./subscription/subscriptionSlice"
import adminUserReducer    from "./adminUser/adminUserSlice"

const store = configureStore({
  reducer: {
    auth:         authReducer,
    application:  applicationReducer,
    savedJob:     savedJobReducer,
    resume:       resumeReducer,
    ai:           aiReducer,
    company:      companyReducer,
    job:          jobReducer,
    jobMeta:      jobMetaReducer,
    subscription: subscriptionReducer,
    adminUser:    adminUserReducer,
  }
})

export default store
