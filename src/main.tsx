import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import Header from './components/common/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import HomePageSSR from './pages/HomePage/HomePageSSR'
import FilmDetailsPage from './pages/FilmDetailsPage/FilmDetailsPage'
import WishlistPage from './pages/WishlistPage/WishlistPage'

const container = document.getElementById('root')!

const ssrData = (window as any).__SSR_DATA__

const AppContent = () => (
  <BrowserRouter>
    <WishlistProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              ssrData ? (
                <HomePageSSR 
                  popularFilms={ssrData.popularFilms}
                  topRatedFilms={ssrData.topRatedFilms}
                  upcomingFilms={ssrData.upcomingFilms}
                />
              ) : (
                <HomePage />
              )
            } 
          />
          <Route path="/film/:filmId" element={<FilmDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </div>
    </WishlistProvider>
  </BrowserRouter>
)

if (container.innerHTML) {
  console.log("Server Side renderinggggg")
  ReactDOM.hydrateRoot(container, <AppContent />)
} 