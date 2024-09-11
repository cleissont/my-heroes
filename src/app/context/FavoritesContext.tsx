import React, { createContext, useState, useEffect, useContext } from "react"

interface Hero {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface FavoritesContextProps {
  favorites: Hero[]
  setFavorites: (heroes: Hero[]) => void
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Hero[]>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites")
      return storedFavorites ? JSON.parse(storedFavorites) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de um FavoritesProvider"
    )
  }
  return context
}
