import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  token: null,
  isAuth: false
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email
      state.token = action.payload.token
      state.isAuth = action.payload.isAuth
    },
    logout(state) {
      state.email = null
      state.token = null
      state.isAuth = false
    }
  }
})

export const {login, logout} = slice.actions
export default slice.reducer