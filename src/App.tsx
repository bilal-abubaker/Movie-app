import { Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import Header from './components/common/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import FilmDetailsPage from './pages/FilmDetailsPage/FilmDetailsPage'
import WishlistPage from './pages/WishlistPage/WishlistPage'
import './styles/globals.scss'

const App: React.FC = () => {
  return (
    <WishlistProvider>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:filmId" element={<FilmDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </div>
    </WishlistProvider>
  )
}

export default App