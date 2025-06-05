import { configureStore } from '@reduxjs/toolkit'
import weekReducer from './weekSlice.js'
import { moviesApi } from './moviesApi.js'

export default configureStore({
  reducer: {
    week: weekReducer,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware)
})