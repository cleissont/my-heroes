import axios from "axios"
import md5 from "md5"

const publicKey = "629091476a78e55b024323f345ba5899"
const privateKey = "788cc7b1c2b45758577e3a10187124180ae54ba0"
const ts = new Date().getTime()
const hash = md5(ts + privateKey + publicKey)

export const fetchHeroes = async () => {
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  )
  return response.data.data.results
}

export const fetchHeroById = async (id: number) => {
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  )
  return response.data.data.results[0]
}

export const fetchComicsByHeroId = async (id: number) => {
  const response = await axios.get(
    `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  )
  return response.data.data.results
}
