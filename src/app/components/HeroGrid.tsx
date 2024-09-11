"use client"

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store"
import { setHeroes } from "../heroesSlice"
import { fetchHeroes } from "../services/marvelAPI"

const HeroGrid: React.FC = () => {
  const dispatch = useDispatch()
  const heroes = useSelector((state: RootState) => state.heroes)

  useEffect(() => {
    const loadHeroes = async () => {
      const heroData = await fetchHeroes()
      dispatch(setHeroes(heroData))
    }

    loadHeroes()
  }, [dispatch])

  return (
    <div className='hero-grid'>
      {heroes.map((hero) => (
        <div key={hero.id}>
          <img
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={hero.name}
          />
          <h3>{hero.name}</h3>
        </div>
      ))}
    </div>
  )
}

export default HeroGrid
