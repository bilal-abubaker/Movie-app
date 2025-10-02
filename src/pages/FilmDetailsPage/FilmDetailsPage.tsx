import React from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useFilmDetails } from '../../hooks/useFilmDetails'
import { useWishlist } from '../../context/WishlistContext'
import { tmdbApi } from '../../services/tmdbApi'
import Loading from '../../components/common/Loading/Loading'
import './FilmDetailsPage.scss'
import { CATEGORY_THEMES } from '@/utils/constants'
import { FilmCategory } from '@/types/films'

const FilmDetailsPage: React.FC = () => {
  const { filmId } = useParams<{ filmId: string }>()
  const [searchParams] = useSearchParams()
  const category = (searchParams.get('category') as FilmCategory) || 'popular'
  
  const { filmDetails, isLoading, error } = useFilmDetails(
    filmId ? parseInt(filmId) : null
  )
 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const theme = CATEGORY_THEMES[category]
  const inWishlist = filmDetails ? isInWishlist(filmDetails.id) : false

  const handleWishlistToggle = () => {
    if (!filmDetails) return
    
    if (inWishlist) {
      removeFromWishlist(filmDetails.id)
    } else {
      addToWishlist(filmDetails, category)
    }
  }

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatRating = (rating: number): string => {
    return rating.toFixed(1)
  }

  if (isLoading) {
    return (
      <div className="film-details-page film-details-page--loading">
        <Loading size="large" text="Loading film details..." />
      </div>
    )
  }

  if (error || !filmDetails) {
    return (
      <div className="film-details-page film-details-page--error">
        <div className="container">
          <div className="film-details-page__error">
            <h1>Film Not Found</h1>
            <p>{error || 'The requested film could not be found.'}</p>
            <Link to="/" className="btn btn--primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className={`film-details-page film-details-page--${category}`}>
      <div className="film-details-page__hero">
        <div 
          className="film-details-page__backdrop"
          style={{
            backgroundImage: filmDetails.backdrop_path 
              ? `url(${tmdbApi.getImageUrl(filmDetails.backdrop_path, 'w1280')})` 
              : 'none'
          }}
        />
        <div className="film-details-page__hero-overlay">
          <div className="container">
            <div className="film-details-page__hero-content">
              <div className="film-details-page__poster-container">
                <img
                  src={tmdbApi.getImageUrl(filmDetails.poster_path, 'w500')}
                  alt={filmDetails.title}
                  className="film-details-page__poster"
                />
              </div>

              <div className="film-details-page__info">
                <div className="film-details-page__breadcrumb">
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <span>{filmDetails.title}</span>
                </div>

                <h1 className="film-details-page__title">
                  {filmDetails.title}
                </h1>

                {filmDetails.tagline && (
                  <p className="film-details-page__tagline">
                    "{filmDetails.tagline}"
                  </p>
                )}

                <div className="film-details-page__meta">
                  <div className="film-details-page__meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>{formatRating(filmDetails.vote_average)} ({filmDetails.vote_count.toLocaleString()} votes)</span>
                  </div>

                  {filmDetails.release_date && (
                    <div className="film-details-page__meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                      </svg>
                      <span>{formatDate(filmDetails.release_date)}</span>
                    </div>
                  )}

                  {filmDetails.runtime > 0 && (
                    <div className="film-details-page__meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span>{formatRuntime(filmDetails.runtime)}</span>
                    </div>
                  )}
                </div>

                {filmDetails.genres.length > 0 && (
                  <div className="film-details-page__genres">
                    {filmDetails.genres.map((genre) => (
                      <span key={genre.id} className="film-details-page__genre">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleWishlistToggle}
                  className={`film-details-page__wishlist-btn ${theme.buttonClass} ${inWishlist ? 'active' : ''}`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={inWishlist ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {inWishlist ? 'Remove from Wishlist' : theme.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="film-details-page__content">
        <div className="container">
          <div className="film-details-page__details">
            <section className="film-details-page__section">
              <h2>Overview</h2>
              <p className="film-details-page__overview">
                {filmDetails.overview || 'No overview available.'}
              </p>
            </section>

            <section className="film-details-page__section">
              <h2>Details</h2>
              <div className="film-details-page__details-grid">
                {filmDetails.budget > 0 && (
                  <div className="film-details-page__detail-item">
                    <strong>Budget:</strong>
                    <span>{formatCurrency(filmDetails.budget)}</span>
                  </div>
                )}

                {filmDetails.revenue > 0 && (
                  <div className="film-details-page__detail-item">
                    <strong>Revenue:</strong>
                    <span>{formatCurrency(filmDetails.revenue)}</span>
                  </div>
                )}

                <div className="film-details-page__detail-item">
                  <strong>Status:</strong>
                  <span>{filmDetails.status}</span>
                </div>

                <div className="film-details-page__detail-item">
                  <strong>Original Language:</strong>
                  <span>{filmDetails.original_language.toUpperCase()}</span>
                </div>

                {filmDetails.production_companies.length > 0 && (
                  <div className="film-details-page__detail-item">
                    <strong>Production Companies:</strong>
                    <span>
                      {filmDetails.production_companies
                        .map((company) => company.name)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FilmDetailsPage