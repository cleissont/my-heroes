import { FavoritesProvider } from "./context/FavoritesContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  )
}

export default MyApp
