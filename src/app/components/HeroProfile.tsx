"use client"

import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { fetchHeroById, fetchComicsByHeroId } from "../services/marvelAPI"
import Footer from "../components/Footer"
import "../../styles/HeroProfile.css"

// Define the Hero type
interface Hero {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface Comic {
  id: number
  title: string
  pageCount: number
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  dates: {
    date: string
  }[]
}

const HeroProfile: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [hero, setHero] = useState<Hero | null>(null) // Typed state for hero
  const [comics, setComics] = useState<Comic[]>([]) // Typed state for comics

  useEffect(() => {
    if (id) {
      fetchHeroById(id).then((data) => setHero(data))
      fetchComicsByHeroId(id).then((data) => setComics(data.slice(0, 5)))
    }
  }, [id])

  if (!hero) {
    return <div>Carregando...</div>
  }

  const heroBackgroundImage = `${hero.thumbnail.path}.${hero.thumbnail.extension}`

  return (
    <div
      className='hero-profile'
      style={{
        backgroundImage: `url(${heroBackgroundImage})`,
      }}
    >
      <h3>Quadrinhos</h3>
      <div className='hero-details'>
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
        />
        <div>
          <h2>{hero.name}</h2>
          <p>{hero.description || "Nenhuma descrição disponível."}</p>
        </div>
      </div>

      <div className='hero-comics'>
        <div className='comics-grid'>
          {comics.map((comic) => (
            <div key={comic.id} className='comic-card'>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <div className='comic-info'>
                <h4>{comic.title}</h4>
                <p>{comic.dates[0].date.split("T")[0]}</p>
                <p>{comic.pageCount} páginas</p>
                <p>{comic.description?.slice(0, 200) || "Sem descrição."}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HeroProfile
