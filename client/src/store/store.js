import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import { moviesApi } from './moviesApi.js'

export default configureStore({
  reducer: {
    user: userReducer,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
})