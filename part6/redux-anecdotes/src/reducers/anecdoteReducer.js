import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // vote
    vote(state, action) {
      const id = action.payload

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

export const { vote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer