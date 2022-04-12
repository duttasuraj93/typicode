import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

let initialState: string | null = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

export const themeSlice = createSlice({
  name: 'THEME',
  initialState: initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => action.payload,
  },
})

export const { setTheme } = themeSlice.actions

export const selectCount = (state: RootState) => state.theme

export default themeSlice.reducer