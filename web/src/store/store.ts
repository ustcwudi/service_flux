import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import messageReducer from './messageSlice'
import loadingReducer from './loadingSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    loading: loadingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
