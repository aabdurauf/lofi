import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BgImgStateType {
  currentIndex: number
}

const initialState: BgImgStateType = {
  currentIndex: 3
}

export const bgImgSlice = createSlice({
  name: "bgImg",
  initialState,
  reducers: {
    changeBg: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    }
  }
})

export const bgImgActions = bgImgSlice.actions