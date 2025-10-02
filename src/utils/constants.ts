import { FilmCategory } from "@/types/films";

export const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzM2OTJiZDExMmJiODBmMmIwMDgzOTQ5NjhhYzI4MiIsIm5iZiI6MTc1ODg3OTY4My44MjksInN1YiI6IjY4ZDY1ZmMzZmJiNDJhM2M5MDY5NzI3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Qh8JxVQu5tQ4X0g1jfmwFiR1mDojAImMXu1qTSHcYE'
export const TMDB_BASE_URL =  'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE_URL ='https://image.tmdb.org/t/p/w500'

export const FILM_CATEGORIES: Record<FilmCategory, { title: string; endpoint: string }> = {
  popular: {
    title: 'Popular Movies',
    endpoint: 'movie/popular'
  },
  top_rated: {
    title: 'Top Rated Movies', 
    endpoint: 'movie/top_rated'
  },
  upcoming: {
    title: 'Upcoming Movies',
    endpoint: 'movie/upcoming'
  }
}


//As stated in the document that create different styles for each category thats why it is here 

export const CATEGORY_THEMES: Record<FilmCategory, {
  fontFamily: string
  primaryColor: string
  secondaryColor: string
  buttonText: string
  buttonClass: string
}> = {
  popular: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    buttonText: 'Add to Favorites',
    buttonClass: 'popular-button'
  },
  top_rated: {
    fontFamily: 'Playfair Display, serif',
    primaryColor: '#f59e0b',
    secondaryColor: '#d97706',
    buttonText: 'Add to Collection',
    buttonClass: 'top-rated-button'
  },
  upcoming: {
    fontFamily: 'Orbitron, monospace',
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    buttonText: 'Add to Watchlist',
    buttonClass: 'upcoming-button'
  }
}