import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // vote
    increaseVote(state, action) {

      const updatedAnecdote = action.payload
      const id = updatedAnecdote.id

      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    },

    // create anecdote
    createAnecdote(state, action) {
      console.log('payload:', action.payload)
      return state.concat(action.payload)
    },

    // append anecdote to list of anecdotes
    appendAnecdote(state, action) {      
      state.push(action.payload)    
    },

    // set all of the anecdotes
    setAnecdotes(state, action) {      
      return action.payload    
    }
  }
})

export const { increaseVote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const vote = content => {
  return async (dispatch) => {
    const updatedVote = await anecdoteService.updateVotes(content)
    dispatch(increaseVote(updatedVote))
  }
}

export default anecdoteSlice.reducer