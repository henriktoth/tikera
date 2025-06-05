import { createSlice } from '@reduxjs/toolkit'

export const weekSlice = createSlice({
  name: 'week',
  initialState: {
    value: 23,
  },
  reducers: {
    increaseWeek: (state) => {
      state.value = state.value + 1
    },
    decreaseWeek: (state) => {
      state.value = state.value - 1
    },
  }
})

export const { increaseWeek, decreaseWeek } = weekSlice.actions

export default weekSlice.reducer