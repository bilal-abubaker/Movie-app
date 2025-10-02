import { Film, FilmCategory, FilmDetails, TMDBResponse } from '@/types/films'
import { FILM_CATEGORIES, TMDB_API_KEY, TMDB_BASE_URL } from '@/utils/constants'

class TMDBApi {
  private baseUrl = TMDB_BASE_URL
  private apiKey = TMDB_API_KEY

  private async request<T>(endpoint: string): Promise<T> {
    if (!this.apiKey) {
      throw new Error('TMDB API key is not configured')
    }

    const url = `${this.baseUrl}/${endpoint}?api_key=${this.apiKey}`
    
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }

  async getFilmsByCategory(category: FilmCategory): Promise<Film[]> {
    const categoryConfig = FILM_CATEGORIES[category]
    if (!categoryConfig) {
      throw new Error(`Invalid category: ${category}`)
    }

    const response = await this.request<TMDBResponse<Film>>(categoryConfig.endpoint)
    return response.results
  }

  async getFilmDetails(id: number): Promise<FilmDetails> {
    return await this.request<FilmDetails>(`movie/${id}`)
  }

  async searchFilms(query: string): Promise<Film[]> {
    const response = await this.request<TMDBResponse<Film>>(`search/movie?query=${encodeURIComponent(query)}`)
    return response.results
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${path}`
  }
}

export const tmdbApi = new TMDBApi()