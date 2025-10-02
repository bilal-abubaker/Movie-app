import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWishlist } from '../../../context/WishlistContext'
import './Header.scss'

const Header: React.FC = () => {
  const location = useLocation()
  const { state } = useWishlist()
  const wishlistCount = state.items.length

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <h1>🎬 Movie Browser</h1>
          </Link>
          
          <nav className="header__nav">
            <Link 
              to="/" 
              className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/wishlist" 
              className={`header__nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="header__wishlist-count">{wishlistCount}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header