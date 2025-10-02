import  { useRef } from 'react'
import FilmCard from '../FilmCard/FilmCard'
import './FilmCarousel.scss'
import { Film, FilmCategory } from '@/types/films'

interface FilmCarouselProps {
  title: string
  films: Film[]
  category: FilmCategory
  isLoading?: boolean
  error?: any | string
}

const FilmCarousel: React.FC<FilmCarouselProps> = ({
  title,
  films,
  category,
  isLoading = false,
  error
}: FilmCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }
  if (error) {
    return (
      <section className="film-carousel">
        <div className="container">
          <h2 className={`film-carousel__title film-carousel__title--${category}`}>
            {title}
          </h2>
          <div className="film-carousel__error">
            <p>Failed to load {title.toLowerCase()}. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="film-carousel">
      <div className="container">
        <h2 className={`film-carousel__title film-carousel__title--${category}`}>
          {title}
        </h2>

        <div className="film-carousel__container">
          <button
            className="film-carousel__nav-btn film-carousel__nav-btn--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 18l-6-6 6-6v12z" />
            </svg>
          </button>

          <div 
            className="film-carousel__scroll-container"
            ref={scrollContainerRef}
          >
            {isLoading ? (
              <div className="film-carousel__loading">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="film-carousel__skeleton">
                    <div className="film-carousel__skeleton-image"></div>
                    <div className="film-carousel__skeleton-content">
                      <div className="film-carousel__skeleton-title"></div>
                      <div className="film-carousel__skeleton-meta"></div>
                      <div className="film-carousel__skeleton-text"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="film-carousel__list">
                {films.map((film) => (
                  <FilmCard 
                    key={film.id} 
                    film={film} 
                    category={category} 
                  />
                ))}
              </div>
            )}
          </div>

          <button
            className="film-carousel__nav-btn film-carousel__nav-btn--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 18l6-6-6-6v12z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FilmCarousel