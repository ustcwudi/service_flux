import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface MessageState {
  value?: string
}

const initialState: MessageState = {
  value: undefined,
}

export const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<string | undefined>) => {
      state.value = action.payload
    },
  },
})

export const { load } = slice.actions

export const selectLoading = (state: RootState) => state.loading.value

export default slice.reducer
