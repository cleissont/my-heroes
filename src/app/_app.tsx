import { FavoritesProvider } from "./context/FavoritesContext"
import { AppProps } from "next/app"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  )
}

export default MyApp
