"use client"

import React, { useEffect, useState } from "react"
import { fetchHeroes } from "../app/services/marvelAPI"
import HeroCard from "../app/components/HeroCard"
import Footer from "../app/components/Footer"
import "../app/styles/HomePage.css"
import { useFavorites } from "../app/context/FavoritesContext"

// Define the Hero type
interface Hero {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

const PAGE_SIZE = 8

const HomePage = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]) // Typed state for heroes
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]) // Typed state for filtered heroes
  const [showFavorites, setShowFavorites] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { favorites } = useFavorites() // Assuming favorites is an array of hero IDs (number[])

  useEffect(() => {
    fetchHeroes().then((data) => setHeroes(data))
  }, [])

  useEffect(() => {
    let heroesToFilter = heroes

    if (showFavorites) {
      // Filter heroes based on whether their ID exists in the favorites array
      heroesToFilter = heroes.filter((hero) => favorites.includes(hero.id))
    }

    setFilteredHeroes(
      heroesToFilter.filter((hero) =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, heroes, showFavorites, favorites])

  const toggleShowFavorites = () => {
    setShowFavorites((prevState) => !prevState)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredHeroes.length / PAGE_SIZE)
  const paginatedHeroes = filteredHeroes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const renderPageButtons = () => {
    const buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <div className='homepage'>
      <header className='homepage-header'>
        <h1 className='homepage-h1'>Explore o Universo e Crie Sua Equipe</h1>
        <p>
          Os melhores personagens já feitos em quadrinhos. Fique viciado em uma
          generosa porção de heróis e vilões!
        </p>
      </header>

      <div className='search-bar-container'>
        <div className='search-bar-wrapper'>
          <div className='search-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1.2rem'
              viewBox='0 0 24 24'
              width='1.2rem'
              fill='#f5b5b5'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M15.5 14h-.79l-.28-.27a6.518 6.518 0 001.48-5.34C14.82 5.59 12.42 3.51 9.5 3.5A6.5 6.5 0 003 9.5c0 3.59 2.91 6.5 6.5 6.5 1.61 0 3.09-.59 4.27-1.56l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
            </svg>
          </div>
          <input
            type='text'
            placeholder='Procure por heróis'
            className='search-bar'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='favorites-button-wrapper'>
          <button className='favorites-button' onClick={toggleShowFavorites}>
            {showFavorites ? "Mostrar Todos" : "❤️ Somente favoritos"}
          </button>
        </div>
      </div>

      <div className='hero-grid'>
        {paginatedHeroes.length > 0 ? (
          paginatedHeroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)
        ) : (
          <p>
            {showFavorites
              ? "Nenhum favorito encontrado."
              : "Nenhum herói encontrado."}
          </p>
        )}
      </div>

      <div className='pagination'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        {renderPageButtons()}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
