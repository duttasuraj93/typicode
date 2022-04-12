import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface AlbumState {
  userId: number
  id: number
  title: string
}

interface AlbumListState {
  albumList: AlbumState[]
  page: number,
  limit: number
}


const initialState: AlbumListState = {
  albumList: [],
  page: 1,
  limit: 5
}

export const albumsSlice = createSlice({
  name: 'ALBUMS',
  initialState: initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<[]>) => {
      state.albumList = [...state.albumList, ...action.payload]
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    removeAlbum: (state, action: PayloadAction<number | string>) => {
      let albums = state.albumList.filter(item => item.id != action.payload)
      state.albumList = albums
    },
    addAlbum: (state, action: PayloadAction<AlbumState>) => {
      state.albumList = [...state.albumList, action.payload]
    },
  },
})

export const { setAlbums, setPage, removeAlbum, addAlbum } = albumsSlice.actions

export const selectCount = (state: RootState) => state.albums

export default albumsSlice.reducer