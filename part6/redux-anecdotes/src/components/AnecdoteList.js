import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {

    if ( filter === '' ) {
      return anecdotes
    }
    
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    })

  const handleVote = (anecdote) => {

    dispatch(vote(anecdote))

    dispatch(setNotification('vote increased', 5))

  
  }


  return (
    <div>
      {anecdotes.toSorted((a, b) => parseFloat(b.votes) - parseFloat(a.votes))
                .map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={e => handleVote(anecdote)}>vote</button>
                  </div>
                </div>
      )}
    </div>
  )
}