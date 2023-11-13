import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  options: any
}

const initialState: CounterState = {
  options: null,
}

export const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<any>) => {
      state.options = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOptions } = videoPlayerSlice.actions

export default videoPlayerSlice.reducer