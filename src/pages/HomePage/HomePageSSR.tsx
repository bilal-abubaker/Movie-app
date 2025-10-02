import FilmCarousel from '../../components/film/FilmCarousel/FilmCarousel'
import { FILM_CATEGORIES } from '../../utils/constants'
import { Film } from '@/types/films'
import './HomePage.scss'

interface HomePageSSRProps {
  popularFilms?: Film[]
  topRatedFilms?: Film[]
  upcomingFilms?: Film[]
}

const HomePageSSR: React.FC<HomePageSSRProps> = ({ 
  popularFilms = [], 
  topRatedFilms = [], 
  upcomingFilms = [] 
}) => {
  return (
    <main className="home-page">


      <FilmCarousel
        title={FILM_CATEGORIES.popular.title}
        films={popularFilms}
        category="popular"
        isLoading={false}
      />

      <FilmCarousel
        title={FILM_CATEGORIES.top_rated.title}
        films={topRatedFilms}
        category="top_rated"
        isLoading={false}
      />

      <FilmCarousel
        title={FILM_CATEGORIES.upcoming.title}
        films={upcomingFilms}
        category="upcoming"
        isLoading={false}
      />
    </main>
  )
}

export default HomePageSSR