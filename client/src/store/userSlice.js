import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    password: '',
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      const { name, email, password } = action.payload
      state.name = name
      state.email = email
      state.password = password
      state.isLoggedIn = true
    },
    clearUser: (state) => {
      state.name = ''
      state.email = ''
      state.password = ''
      state.isLoggedIn = false
    }
  }
})

export const { setUser, clearUser} = userSlice.actions

export default userSlice.reducer