import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { User } from '../pages/main/base/user'

const initialState: User = {}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = undefined
    },
  },
})

export const { login, logout } = slice.actions

export const selectUser = (state: RootState) => state.user.value

export default slice.reducer
