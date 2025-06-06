import { configureStore } from '@reduxjs/toolkit'
import weekReducer from './weekSlice.js'
import userReducer from './userSlice.js'
import { moviesApi } from './moviesApi.js'

export default configureStore({
  reducer: {
    user: userReducer,
    week: weekReducer,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware)
})