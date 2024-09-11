"use client"

import { useRouter } from "next/navigation"
import React from "react"
import { useFavorites } from "../context/FavoritesContext"
import "../components/HeroCard"

interface Hero {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface HeroCardProps {
  hero: Hero
}

const HeroCard: React.FC<HeroCardProps> = ({ hero }) => {
  const { favorites, setFavorites } = useFavorites()
  const router = useRouter()

  const isFavorite = favorites.some((favHero: Hero) => favHero.id === hero.id)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFavorite) {
      setFavorites(favorites.filter((favHero: Hero) => favHero.id !== hero.id))
    } else {
      setFavorites([...favorites, hero])
    }
  }

  const handleCardClick = () => {
    router.push(`/hero/${hero.id}`)
  }

  return (
    <div className='hero-card' onClick={handleCardClick}>
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className='hero-image'
      />
      <div className='hero-info'>
        <div className='hero-header'>
          <h3 className='hero-name'>{hero.name}</h3>
          <button onClick={toggleFavorite} className='favorite-button'>
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
        <p className='hero-description'>
          {hero.description
            ? hero.description
            : "Nenhuma descrição disponível."}
        </p>
      </div>
    </div>
  )
}

export default HeroCard
