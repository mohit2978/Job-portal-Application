import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./user/userAuth"

const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})

export default store
