import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import heroesReducer from "./heroesSlice"

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
