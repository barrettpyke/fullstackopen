import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = {
          ...anecToChange,
          votes: anecToChange.votes + 1
      }
      return state
        .map(anecdote => 
          anecdote.id !== id ? anecdote : changedAnec)
        .sort(function(a, b) {
          return b.votes - a.votes
        })
    },
    addAnecdote(state, action) {
      const content = action.payload
        const newState = [ ...state ]
        return newState
          .concat(content)
          .sort(function(a, b) {
            return b.votes - a.votes
          })
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const anecdoteVote = (object) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(object)
    dispatch(addVote(votedAnecdote))
  }
}

export default anecdotesSlice.reducer