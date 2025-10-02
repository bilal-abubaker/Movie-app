import { Film, FilmCategory, WishlistItem } from '@/types/films';
import  { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: { film: Film; category: FilmCategory } }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: { filmId: number } }
  | { type: 'LOAD_FROM_STORAGE'; payload: { items: WishlistItem[] } }
  | { type: 'CLEAR_WISHLIST' }

interface WishlistContextType {
  state: WishlistState
  addToWishlist: (film: Film, category: FilmCategory) => void
  removeFromWishlist: (filmId: number) => void
  clearWishlist: () => void
  isInWishlist: (filmId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => item.film.id === action.payload.film.id)
      if (existingItem) {
        return state
      }
      
      const newItem: WishlistItem = {
        film: action.payload.film,
        category: action.payload.category,
        addedAt: new Date().toISOString()
      }
      
      return {
        ...state,
        items: [...state.items, newItem]
      }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.film.id !== action.payload.filmId)
      }

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        items: action.payload.items
      }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      }

    default:
      return state
  }
}

const initialState: WishlistState = {
  items: []
}

interface WishlistProviderProps {
  children: ReactNode
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  useEffect(() => {

    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('movie-wishlist')
        if (savedWishlist) {
          const items: WishlistItem[] = JSON.parse(savedWishlist)
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: { items } })
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('movie-wishlist', JSON.stringify(state.items))
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error)
      }
    }
  }, [state.items])

  const addToWishlist = (film: Film, category: FilmCategory) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: { film, category } })
  }

  const removeFromWishlist = (filmId: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { filmId } })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const isInWishlist = (filmId: number): boolean => {
    return state.items.some(item => item.film.id === filmId)
  }

  const contextValue: WishlistContextType = {
    state,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  }

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}