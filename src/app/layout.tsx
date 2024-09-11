"use client"

import { FavoritesProvider } from "../app/context/FavoritesContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  )
}
