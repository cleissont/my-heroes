// heroesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Hero {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

type HeroesState = Hero[]

const initialState: HeroesState = []

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<Hero[]>) => {
      return action.payload
    },
  },
})

export const { setHeroes } = heroesSlice.actions
export default heroesSlice.reducer
