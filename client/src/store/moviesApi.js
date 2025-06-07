import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const BASE_URL = import.meta.env.VITE_API_URL;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getMovies: build.query({
      query: () => `/movies`,
    }),
    register: build.mutation({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: build.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user,
      }),
    
  }),
  })
})


export const { useGetMoviesQuery, useRegisterMutation, useLoginMutation } = moviesApi