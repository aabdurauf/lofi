import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicStateType {
  currentIndex: number
}

const initialState: MusicStateType = {
  currentIndex: 0
}

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state, action: PayloadAction<number>) => {
      state.currentIndex = (state.currentIndex + 1) % action.payload;
    },
    prevTrack: (state, action: PayloadAction<number>) => {
      state.currentIndex = state.currentIndex === 0 ? action.payload - 1 : state.currentIndex - 1;
    }
  }
})

export const musicActions = musicSlice.actions