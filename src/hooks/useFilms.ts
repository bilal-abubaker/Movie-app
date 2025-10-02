import { useState, useEffect } from 'react'
import { tmdbApi } from '../services/tmdbApi'
import { Film, FilmCategory } from '@/types/films'

interface UseFilmsReturn {
  films: Film[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useFilms = (category: FilmCategory): UseFilmsReturn => {
  const [films, setFilms] = useState<Film[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFilms = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await tmdbApi.getFilmsByCategory(category)
      setFilms(data.slice(0, 20))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch films')
      setFilms([])
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    fetchFilms()
  }

  useEffect(() => {
    fetchFilms()
  }, [category])

  return {
    films,
    isLoading,
    error,
    refetch
  }
}