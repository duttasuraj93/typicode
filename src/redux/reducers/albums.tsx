import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface AlbumState {
  userId: number
  id: number
  title: string
}

interface AlbumListState {
  albumList: AlbumState[]
  page: number,
  status: string,
  error: any
}


const initialState: AlbumListState = {
  albumList: [],
  page: 1,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
}

interface PageState {
  page: number,
}

export const getAlbums = createAsyncThunk<AlbumState[], PageState>(
  'ALBUMS/getAlbums',
  async (info) => {
    const { page } = info
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?_limit=5&_page=${page}`
    );
    const data = await response.json();
    return data;
  }
)

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
    updateAlbum: (state, action: PayloadAction<AlbumState>) => {
      const index = state.albumList.findIndex(x => x.id === action.payload.id);
      state.albumList[index].title = action.payload.title

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbums.pending,
        (state, { payload }) => {
          state.status = 'loading'
        })
      .addCase(getAlbums.rejected,
        (state, { payload }) => {
          state.status = "failed";
        })
      .addCase(getAlbums.fulfilled,
        (state, { payload }) => {
          state.albumList.push(...payload);
          state.page = state.page + 1
          state.status = "succeeded";
        })
      ;
  }
})

export const { setAlbums, setPage, removeAlbum, addAlbum, updateAlbum } = albumsSlice.actions

export const albumStatus = (state: RootState) => state.albums.status
export const albumPage = (state: RootState) => state.albums.page

export default albumsSlice.reducer