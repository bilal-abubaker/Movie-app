import { useState, useEffect } from 'react'
import { tmdbApi } from '../services/tmdbApi'
import { FilmDetails } from '@/types/films'

interface UseFilmDetailsReturn {
  filmDetails: FilmDetails | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export const useFilmDetails = (filmId: number | null): UseFilmDetailsReturn => {
  const [filmDetails, setFilmDetails] = useState<FilmDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFilmDetails = async (id: number) => {
    try {
      setError(null)
      const data = await tmdbApi.getFilmDetails(id)
      setFilmDetails(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch film details')
      setFilmDetails(null)
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    if (filmId) {
      fetchFilmDetails(filmId)
    }
  }

  useEffect(() => {
    if (filmId) {
      fetchFilmDetails(filmId)
    } else {
      setFilmDetails(null)
      setError(null)
      setIsLoading(false)
    }
  }, [filmId])

  return {
    filmDetails,
    isLoading,
    error,
    refetch
  }
}