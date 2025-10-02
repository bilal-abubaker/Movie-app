import FilmCarousel from '../../components/film/FilmCarousel/FilmCarousel'
import { useFilms } from '../../hooks/useFilms'
import './HomePage.scss'
import { FILM_CATEGORIES } from '@/utils/constants'

const HomePage: React.FC = () => {
  const popularFilms = useFilms('popular')
  const topRatedFilms = useFilms('top_rated')
  const upcomingFilms = useFilms('upcoming')

  return (
    <main className="home-page">


      <FilmCarousel
        title={FILM_CATEGORIES.popular.title}
        films={popularFilms.films}
        category="popular"
        isLoading={popularFilms.isLoading}
        error={popularFilms.error}
      />

      <FilmCarousel
        title={FILM_CATEGORIES.top_rated.title}
        films={topRatedFilms.films}
        category="top_rated"
        isLoading={topRatedFilms.isLoading}
        error={topRatedFilms.error}
      />

      <FilmCarousel
        title={FILM_CATEGORIES.upcoming.title}
        films={upcomingFilms.films}
        category="upcoming"
        isLoading={upcomingFilms.isLoading}
        error={upcomingFilms.error}
      />
    </main>
  )
}

export default HomePage