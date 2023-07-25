import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

export const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state)

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