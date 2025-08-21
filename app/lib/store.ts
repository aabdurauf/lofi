import { configureStore } from "@reduxjs/toolkit"
import { bgImgSlice } from "./features/bgImgSlice"
import { musicSlice } from "./features/musicSlice"
import { todosSlice } from "./features/todosSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      bgImgIndex: bgImgSlice.reducer,
      musicIndex: musicSlice.reducer,
      todos: todosSlice.reducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]