import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getAnecdotes, updateVote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const newVoteMutation = useMutation(
    updateVote,
    {
    onSuccess: () => {      
      queryClient.invalidateQueries('anecdotes')    
      },
    }
  )

  const handleVote = (anecdote) => {
    const updatedAnecdote = { 
      ...anecdote,
      votes: anecdote.votes + 1
    }

    newVoteMutation.mutate(updatedAnecdote)  
 

  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )

  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError) {
    return <div>there's an error bitch</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
