import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Hero {
  id: number
  name: string
  image: string
  isFavorite: boolean
}

interface HeroesState {
  allHeroes: Hero[]
  favorites: number[]
}

const initialState: HeroesState = {
  allHeroes: [],
  favorites: [],
}

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setHeroes(state, action: PayloadAction<Hero[]>) {
      state.allHeroes = action.payload
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const heroId = action.payload
      if (state.favorites.includes(heroId)) {
        state.favorites = state.favorites.filter((id) => id !== heroId)
      } else {
        state.favorites.push(heroId)
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites))
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      state.favorites = action.payload
    },
  },
})

export const { setHeroes, toggleFavorite, setFavorites } = heroesSlice.actions

export default heroesSlice.reducer
