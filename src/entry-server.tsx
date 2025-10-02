import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import Header from './components/common/Header/Header'
import HomePageSSR from './pages/HomePage/HomePageSSR'
import FilmDetailsPage from './pages/FilmDetailsPage/FilmDetailsPage'
import WishlistPage from './pages/WishlistPage/WishlistPage'

import './styles/globals.scss'
import { Film } from './types/films'

interface PageData {
  popularFilms?: Film[]
  topRatedFilms?: Film[]
  upcomingFilms?: Film[]
}

export function render(url: string, pageData: PageData = {}) {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <WishlistProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePageSSR 
                  popularFilms={pageData.popularFilms}
                  topRatedFilms={pageData.topRatedFilms}
                  upcomingFilms={pageData.upcomingFilms}
                />
              } 
            />
            <Route path="/film/:filmId" element={<FilmDetailsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </div>
      </WishlistProvider>
    </StaticRouter>
  )
  return html
}