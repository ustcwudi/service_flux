import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface MessageState {
  value?: { type?: 'success' | 'info' | 'warning' | 'error'; content?: string }
}

const initialState: MessageState = {
  value: undefined,
}

export const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    alert: (state, action: PayloadAction<{ type?: 'success' | 'info' | 'warning' | 'error'; content?: string } | undefined>) => {
      state.value = action.payload
    },
  },
})

export const { alert } = slice.actions

export const selectMessage = (state: RootState) => state.message.value

export default slice.reducer
