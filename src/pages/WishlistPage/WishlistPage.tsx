import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import FilmCard from '../../components/film/FilmCard/FilmCard'
import './WishlistPage.scss'

const WishlistPage: React.FC = () => {
  const { state, clearWishlist } = useWishlist()
  const { items } = state

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist()
    }
  }

  if (items.length === 0) {
    return (
      <main className="wishlist-page wishlist-page--empty">
        <div className="container">
          <div className="wishlist-page__empty-state">
            <div className="wishlist-page__empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h1>Your Wishlist is Empty</h1>
            <p>
              Start exploring movies and add them to your wishlist to keep track 
              of films you want to watch.
            </p>
            <Link to="/" className="btn btn--primary">
              Discover Movies
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const groupedByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const categoryTitles = {
    popular: 'Popular Movies',
    top_rated: 'Top Rated Movies',
    upcoming: 'Upcoming Movies'
  }

  return (
    <main className="wishlist-page">
      <div className="container">
        <div className="wishlist-page__header">
          <div className="wishlist-page__title-section">
            <h1 className="wishlist-page__title">My Wishlist</h1>
            <p className="wishlist-page__subtitle">
              {items.length} {items.length === 1 ? 'movie' : 'movies'} in your wishlist
            </p>
          </div>
          
          <button 
            onClick={handleClearWishlist}
            className="wishlist-page__clear-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>

        <div className="wishlist-page__content">
          {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
            <section key={category} className="wishlist-page__category">
              <h2 className={`wishlist-page__category-title wishlist-page__category-title--${category}`}>
                {categoryTitles[category as keyof typeof categoryTitles]} 
                <span className="wishlist-page__category-count">
                  ({categoryItems.length})
                </span>
              </h2>
              
              <div className="wishlist-page__grid">
                {categoryItems
                  .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
                  .map((item) => (
                    <div key={item.film.id} className="wishlist-page__item">
                      <FilmCard 
                        film={item.film} 
                        category={item.category as any} 
                      />
                      <div className="wishlist-page__item-meta">
                        <span className="wishlist-page__added-date">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export default WishlistPage