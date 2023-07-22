import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'

interface MovieModal {
  showModal: boolean
  dataMovie: object
  hideModal: () => void
  setShowMovie: (payload: {}) => void
}

const useMovieModal = create<MovieModal>()(
  persist(
    (set) => ({
      showModal: false,
      dataMovie: {},

      hideModal: () => {
        set(
          produce((state) => {
            state.showModal = false
          })
        )
      },

      setShowMovie: (payload) => {
        set(
          produce((state) => {
            state.showModal = true
            state.dataMovie = payload
          })
        )
      },
    }),
    {
      name: 'movie-detail',
      getStorage: () => localStorage,
    }
  )
)

interface SearchMovie {
  showSearch: boolean,
  searching: string,
  setSearching: (payload: string) => void
  setShowSearch: (payload: string) => void
}

const useSearchMovie = create<SearchMovie>()((set) => ({
  showSearch: false,
  searching: '',

  setSearching: (payload) => {
    set(
      produce((state) => {
        state.search = payload
      })
    )
  },

  setShowSearch: (payload) => {
    set(
      produce((state) => {
        state.showSearch = payload
      })
    )
  },
}))

// create selector
export const MovieModalSelector = createTrackedSelector(useMovieModal)
export const MovieSearchSelector = createTrackedSelector(useSearchMovie)
