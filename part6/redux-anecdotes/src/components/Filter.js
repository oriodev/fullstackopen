import { useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

export const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const change = event.target.value
    dispatch(filterAnecdotes(change))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
