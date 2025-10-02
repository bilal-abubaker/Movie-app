import { Link } from 'react-router-dom'
import { tmdbApi } from '../../../services/tmdbApi'
import { useWishlist } from '../../../context/WishlistContext'
import './FilmCard.scss'
import { CATEGORY_THEMES } from '@/utils/constants'
import { Film, FilmCategory } from '@/types/films'

interface FilmCardProps {
  film: Film
  category: FilmCategory
}

const FilmCard: React.FC<FilmCardProps> = ({ film, category }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(film.id)
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (inWishlist) {
      removeFromWishlist(film.id)
    } else {
      addToWishlist(film, category)
    }
  }

  const formatRating = (rating: number): string => {
    return rating.toFixed(1)
  }

  const formatYear = (dateString: string): string => {
    return new Date(dateString).getFullYear().toString()
  }

  return (
    <div className={`film-card film-card--${category}`}>
      <Link to={`/film/${film.id}?category=${category}`} className="film-card__link">
        <div className="film-card__image-container">
          <img
            src={tmdbApi.getImageUrl(film.poster_path)}
            alt={film.title}
            className="film-card__image"
            loading="lazy"
          />
          {/* <div className="film-card__overlay">
            <button
              onClick={handleWishlistToggle}
              className={`film-card__wishlist-btn ${inWishlist ? 'active' : ''}`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
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
            </button>
          </div> */}
        </div>
        
        <div className="film-card__content">
          <h3 className="film-card__title">{film.title}</h3>
          
          <div className="film-card__meta">
            {film.release_date && (
              <span className="film-card__year">{formatYear(film.release_date)}</span>
            )}
            {film.vote_average > 0 && (
              <div className="film-card__rating">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>{formatRating(film.vote_average)}</span>
              </div>
            )}
          </div>
          
          <p className="film-card__overview">{film.overview}</p>
        </div>
      </Link>
    </div>
  )
}

export default FilmCard