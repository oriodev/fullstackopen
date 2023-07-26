import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

export const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    // console.log(state.filter)
    if ( filter === '' ) {
      return anecdotes
    }
    
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.filter.toLowerCase()))

    })

  return (
    <div>
      {anecdotes.sort((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
                .map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={e => dispatch(vote(anecdote.id))}>vote</button>
                  </div>
                </div>
      )}
    </div>
  )
}