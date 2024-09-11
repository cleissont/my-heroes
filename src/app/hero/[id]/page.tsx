"use client"

import React, { useEffect, useState } from "react"
import { fetchHeroById, fetchComicsByHeroId } from "../../services/marvelAPI"
import Footer from "@/app/components/Footer"
import "../../styles/HeroProfile.css"

const HeroProfile = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [hero, setHero] = useState(null)
  const [comics, setComics] = useState([])

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
      <div className='hero-title'>
        <h3>Descubra Todos os quadrinhos deste personagem</h3>
      </div>
      <div className='hero-details'>
        <img
          src={hero.thumbnail.path + "." + hero.thumbnail.extension}
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
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt={comic.title}
              />
              <div className='comic-info'>
                <h4>{comic.title}</h4>
                <div>
                  <p>{comic.dates[0].date.split("T")[0]}</p>
                  <p>{comic.pageCount} páginas</p>
                </div>

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
